import { supabase } from '../../lib/supabase'

export async function POST({ request }: { request: Request }) {
  try {
    const { priceId, customerEmail, userId } = await request.json()

    // Create or retrieve Stripe customer
    const stripeModule = await import('stripe');
    const stripe = new stripeModule.default(process.env['STRIPE_SECRET_KEY'] as string);

    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        metadata: { userId }
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env['VITE_APP_URL']}/dashboard?success=true`,
      cancel_url: `${process.env['VITE_APP_URL']}/pricing?canceled=true`,
      metadata: {
        userId,
      },
    });

    // Update user profile with Stripe customer ID
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customer.id })
      .eq('id', userId);

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
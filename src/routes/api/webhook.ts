import { supabase } from '../../lib/supabase'

export async function POST({ request }: { request: Request }) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  const signature = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response(null, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object
        await handleCheckoutSessionCompleted(session)
        break
        
      case 'customer.subscription.updated':
        const subscription = event.data.object
        await handleSubscriptionUpdated(subscription)
        break
        
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object
        await handleSubscriptionDeleted(deletedSubscription)
        break
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return new Response(null, { status: 500 })
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const userId = session.metadata.userId
  const customerId = session.customer

  await supabase
    .from('profiles')
    .update({
      subscription_status: 'active',
      stripe_customer_id: customerId,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
}

async function handleSubscriptionUpdated(subscription: any) {
  const customerId = subscription.customer
  const status = subscription.status

  await supabase
    .from('profiles')
    .update({
      subscription_status: status,
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId)
}

async function handleSubscriptionDeleted(subscription: any) {
  const customerId = subscription.customer

  await supabase
    .from('profiles')
    .update({
      subscription_plan: 'free',
      subscription_status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId)
}
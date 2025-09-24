// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Upload, Zap,  Settings, Download,  Layers, Ruler,  Cpu} from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import Generate from './components/Generate';

// Import the TSX components for the main page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import { Pricing } from './components/Pricing';
import SocialProof from './components/SocialProof';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'generate' | 'content'>('home');
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [contentPageData, setContentPageData] = useState<{ title: string; content: React.ReactNode } | null>(null);

  useEffect(() => {
    if (currentView === 'home' && targetSectionId) {
      const section = document.getElementById(targetSectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setTargetSectionId(null);
      }
    }
  }, [currentView, targetSectionId]);

  const handleGenerateClick = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setCurrentView('generate');
  };

  const handleHomeClick = (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (e) e.preventDefault();
    setCurrentView('home');
  };
  
  const handleGetStarted = () => {
    if (user) {
      handleGenerateClick();
      setIsMobileMenuOpen(false);
      return;
    }
    setAuthMode('signup');
    setShowAuthModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleNavigate = (sectionId: string) => {
    const sectionMap: { [key: string]: { title: string; content: React.ReactNode } } = {
      'about': {
        title: "About Us",
        content: (
          <p className="text-gray-600 leading-relaxed text-center">
              At <span className="text-blue-500 font-semibold">ArchaI</span>, our mission is to transform the future of architectural design through the power of artificial intelligence.
              By combining advanced AI technology with intuitive design tools, we enable architects, interior designers, and students to bring their ideas to life with unmatched speed and efficiency. 
              Our commitment is to inspire creativity, drive innovation, and deliver a seamless experience that empowers every designer to achieve more.
          </p>
        ),
      },
    'careers': {
  title: "Careers",
  content: (
    <>
      <p className="text-gray-600 leading-relaxed text-center mb-4">
        At <span className="text-blue-500 font-semibold">ArchaI</span>, we’re always excited to connect with passionate and talented individuals who share our vision for transforming architectural design with AI. 
      </p>
      <p className="text-gray-600 leading-relaxed text-center font-semibold mb-2">
        🚀 Currently, there are no open positions.
      </p>
      <p className="text-gray-600 leading-relaxed text-center">
        Please check back later or follow us to stay updated on future opportunities. 
        We look forward to welcoming innovative minds to our team soon!
      </p>
    </>
  ),
},

  'contact': {
  title: "Contact Us",
  content: (
    <div className="max-w-xl mx-auto">
      <p className="text-gray-600 leading-relaxed text-center mb-6">
        We are here to help and would love to hear from you.  
        For general inquiries, support, or partnership opportunities, please email us at{" "}
        <a
          href="mailto:contact@archai.com"
          className="text-blue-600 hover:underline font-semibold"
        >
          contact@archai.com
        </a>.  
        We strive to respond to all inquiries within 48 business hours.
      </p>

      <form className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            rows={4}
            placeholder="Write your message here..."
            className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  ),
},

  'blog': {
  title: "Blog",
  content: (
    <div className="max-w-3xl mx-auto space-y-6">
      <p className="text-gray-600 leading-relaxed text-center">
        Welcome to the ArchaI blog, your source for the latest trends in AI and architecture. 
        Explore our articles on design innovation, read inspiring case studies of projects built 
        with our platform, and get expert insights from industry leaders. We regularly post tutorials 
        and news to keep you informed and inspired.
      </p>

      {/* Blog Posts Preview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            The Future of AI in Architecture
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Discover how AI is reshaping architectural design, from automated drafting to 
            generative creativity...
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Read more →
          </a>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Case Study: Smart City Designs
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Learn how ArchaI helped architects create sustainable and intelligent city models 
            with AI-driven tools...
          </p>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Read more →
          </a>
        </div>
      </div>
    </div>
  ),
},

  'docs': {
  title: "Documentation",
  content: (
    <div className="max-w-3xl mx-auto space-y-6">
      <p className="text-gray-600 leading-relaxed text-center">
        Our comprehensive documentation is your ultimate guide to mastering the ArchaI platform. 
        Whether you're a new user or a seasoned professional, you'll find everything you need to know.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">🚀 Getting Started</h3>
          <p className="text-gray-600 text-sm">
            Step-by-step guides to set up and explore the platform quickly.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">📘 User Manuals</h3>
          <p className="text-gray-600 text-sm">
            Detailed tutorials and walkthroughs to master every feature.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">💻 API Reference</h3>
          <p className="text-gray-600 text-sm">
            Complete API docs for developers to integrate seamlessly.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">✨ Best Practices</h3>
          <p className="text-gray-600 text-sm">
            Tips, tricks, and strategies to optimize your workflow.
          </p>
        </div>
      </div>
    </div>
  ),
},

  'help': {
  title: "Help Center",
  content: (
    <div className="max-w-3xl mx-auto space-y-6">
      <p className="text-gray-600 leading-relaxed text-center">
        Need assistance? Our Help Center is designed to provide quick and easy solutions. 
        Browse our extensive FAQ section for answers to common questions, watch tutorials 
        to learn new features, or connect with our support team for personalized help.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">📚 Knowledge Base</h3>
          <p className="text-gray-600 text-sm">
            Find answers to frequently asked questions and step-by-step guides.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">🎥 Video Guides</h3>
          <p className="text-gray-600 text-sm">
            Watch tutorials to explore and master platform features.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">💬 Live Chat</h3>
          <p className="text-gray-600 text-sm">
            Chat with our support team during business hours for instant help.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">📧 Email Support</h3>
          <p className="text-gray-600 text-sm">
            Reach out anytime at 
            <a href="mailto:support@archai.com" className="text-blue-600 hover:underline font-semibold"> support@archai.com</a>.
          </p>
        </div>
      </div>
    </div>
  ),
},

  'community': {
  title: "Community",
  content: (
    <div className="max-w-3xl mx-auto space-y-6">
      <p className="text-gray-600 leading-relaxed text-center">
        Join the ArchaI Community and connect with thousands of creative minds worldwide. 
        Share your projects, get feedback, discuss new features, and collaborate on 
        exciting new designs. Our community is a vibrant space for learning and inspiration.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">💬 Community Forum</h3>
          <p className="text-gray-600 text-sm">
            Ask questions, share projects, and engage in discussions with peers.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">🤝 Collaboration Groups</h3>
          <p className="text-gray-600 text-sm">
            Join groups on Slack/Discord to connect and collaborate in real time.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">📅 Events & Meetups</h3>
          <p className="text-gray-600 text-sm">
            Participate in online events, webinars, and community challenges.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition text-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">🌐 Social Media</h3>
          <p className="text-gray-600 text-sm">
            Stay updated and share your work on 
            <a href="#" className="text-blue-600 hover:underline font-semibold"> Twitter</a>, 
            <a href="#" className="text-blue-600 hover:underline font-semibold"> LinkedIn</a>, and 
            <a href="#" className="text-blue-600 hover:underline font-semibold"> Instagram</a>.
          </p>
        </div>
      </div>
    </div>
  ),
},

  'status': {
  title: "Service Status",
  content: (
    <div className="max-w-3xl mx-auto space-y-6">
      <p className="text-gray-600 leading-relaxed text-center">
        We are dedicated to providing a reliable and stable service. This page provides 
        real-time information on the status of all our systems. Our uptime record is 
        <span className="font-semibold text-green-600"> 99.9%</span>.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-semibold mt-2 text-gray-800">Core Platform</h3>
          <p className="text-sm text-green-600 font-medium">Operational</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-semibold mt-2 text-gray-800">API Services</h3>
          <p className="text-sm text-green-600 font-medium">Operational</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-semibold mt-2 text-gray-800">Authentication</h3>
          <p className="text-sm text-green-600 font-medium">Operational</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center">
          <span className="text-2xl">✅</span>
          <h3 className="text-lg font-semibold mt-2 text-gray-800">Website & Dashboard</h3>
          <p className="text-sm text-green-600 font-medium">Operational</p>
        </div>
      </div>
    </div>
  ),
},

  'privacy-policy': {
  title: "Privacy Policy",
  content: (
    <div className="max-w-3xl mx-auto space-y-6 text-gray-600">
      <p className="leading-relaxed text-center">
        Your privacy is of utmost importance to us. This policy explains how 
        <span className="font-semibold text-blue-700"> ArchaI </span> collects, uses, 
        and protects your personal information.
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">🔑 Key Principles</h3>
        <ul className="list-disc list-inside space-y-2 text-center">
          <li>We are transparent about our data practices.</li>
          <li>Your data is securely stored and protected.</li>
          <li>You have full control over your personal information.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">📌 Information We Collect</h3>
        <p>
          We only collect the data necessary to provide and improve our services, 
          such as account details, usage data, and customer support interactions.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">📌 How We Use Your Data</h3>
        <p>
          Your data helps us deliver better experiences, improve product features, 
          and provide customer support. We never sell your information to third parties.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">📌 Your Rights</h3>
        <p>
          You can access, update, or delete your personal data at any time. 
          If you have questions, contact our support team.
        </p>
      </div>
    </div>
  ),
},

  'terms-of-service': {
  title: "Terms of Service",
  content: (
    <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
      <p className="leading-relaxed">
        These Terms of Service (“Terms”) constitute a legally binding agreement between you 
        (“User”) and <span className="font-semibold text-blue-700">ArchaI</span> 
        (“Company”) governing your access to and use of our website, 
        products, and services (collectively, the “Services”). By accessing or using the Services, 
        you acknowledge that you have read, understood, and agree to be bound by these Terms.  
        If you do not agree, you must immediately discontinue use of the Services.
      </p>

      {/* Section 1 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">1. Eligibility</h3>
        <p>
          By using our Services, you represent that you are at least 12 years old or have reached 
          the age of majority in your jurisdiction, and that you have the legal capacity to enter 
          into these Terms.
        </p>
      </div>

      {/* Section 2 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">2. User Responsibilities</h3>
        <p>
          You agree not to misuse the Services or assist anyone else in doing so. Prohibited 
          conduct includes, but is not limited to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Violating any applicable laws or regulations.</li>
          <li>Infringing on the intellectual property rights of others.</li>
          <li>Distributing viruses, malware, or harmful code.</li>
          <li>Attempting to gain unauthorized access to our systems or accounts.</li>
        </ul>
      </div>

      {/* Section 3 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">3. Intellectual Property</h3>
        <p>
          All content, trademarks, service marks, and data provided through the Services are the 
          exclusive property of ArchaI or its licensors. You may not copy, modify, distribute, 
          or exploit any part of the Services without our prior written consent.
        </p>
      </div>

      {/* Section 4 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">4. Subscriptions and Payments</h3>
        <p>
          Certain features of the Services may require payment. By purchasing a subscription, 
          you agree to pay all applicable fees and taxes. Payments are non-refundable except 
          where required by law. We reserve the right to change pricing upon reasonable notice.
        </p>
      </div>

      {/* Section 5 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">5. Termination</h3>
        <p>
          We reserve the right to suspend or terminate your access to the Services at our sole 
          discretion, without notice, if you violate these Terms or engage in conduct that may 
          harm ArchaI, its users, or third parties.
        </p>
      </div>

      {/* Section 6 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">6. Limitation of Liability</h3>
        <p>
          To the maximum extent permitted by law, ArchaI shall not be liable for any indirect, 
          incidental, special, or consequential damages arising from or related to your use of 
          the Services, even if we have been advised of the possibility of such damages.
        </p>
      </div>

      {/* Section 7 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">7. Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of your 
          jurisdiction, without regard to its conflict of law provisions. Any disputes shall be 
          resolved exclusively in the competent courts of that jurisdiction.
        </p>
      </div>

      {/* Section 8 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">8. Dispute Resolution & Arbitration</h3>
        <p>
          In the event of any dispute, claim, or controversy arising out of or relating to these 
          Terms or the Services, the parties shall first attempt to resolve the matter through 
          good faith negotiations. If a resolution cannot be reached within thirty (30) days, the 
          dispute shall be submitted to binding arbitration in accordance with the rules of the 
          applicable arbitration authority. The arbitration shall be conducted in the English 
          language, and the decision of the arbitrator shall be final and binding on both parties. 
          Each party shall bear its own legal fees and costs unless otherwise determined by the arbitrator.
        </p>
      </div>
    </div>
  ),
},

    };

    const homeSections = ['features', 'pricing', 'gallery'];
    if (homeSections.includes(sectionId)) {
      setCurrentView('home');
      setTargetSectionId(sectionId);
    }
    else if (sectionMap[sectionId]) {
      setContentPageData(sectionMap[sectionId]);
      setCurrentView('content');
    }
    setIsMobileMenuOpen(false);
  }

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Generation",
      description:
        "Advanced neural networks create professional floor plans from your specifications in seconds.",
    },
    {
      icon: Upload,
      title: "File Upload Support",
      description:
        "Upload sketches, CAD files, PDFs, or hand-drawn plans. Our AI instantly converts them into professional architectural drawings.",
    },
    {
      icon: Layers,
      title: "2D & 3D Rendering",
      description:
        "Comprehensive architectural plans including detailed 2D floor plans, elevation views, and interactive 3D model.",
    },
    {
      icon: Ruler,
      title: "Precise Measurements",
      description:
        "All plans include accurate dimensions, measurements, and architectural specifications.",
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description:
        "Export your plans as PDF, DWG, PNG, or other professional formats.",
    },
    {
      icon: Cpu,
      title: "Smart Optimization",
      description:
        "AI optimizes space utilization, workflow, and building code compliance automatically.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }
  
  // Generic Content Page component
  const ContentPage = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-8">
      <div className="max-w-4xl w-full bg-slate-50 p-8 rounded-2xl shadow-lg border border-gray-200 text-center mt-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 font-logo leading-tight mb-6">
          {contentPageData?.title}
        </h1>
        <div className="text-lg md:text-xl text-gray-600 max-w-2xl font-logo mx-auto mb-8">
          {contentPageData?.content}
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleHomeClick={handleHomeClick}
        handleGenerateClick={handleGenerateClick}
        handleSignIn={handleSignIn}
        handleGetStarted={handleGetStarted}
        />

      <main className="flex-1 w-full h-full p-0 m-0">
        {currentView === 'generate' ? (
          <Generate
            onNavigate={handleNavigate}
          />
        ) : currentView === 'content' ? (
          <ContentPage />
        ) : (
          <>
            <Hero handleGenerateClick={handleGenerateClick} />
            <section id="gallery">
              <Gallery />
            </section>
            <div id="features">
              <Features features={features} />
            </div>
            <div id="pricing">
              <Pricing handleGetStarted={handleGetStarted} />
            </div>
            <SocialProof />
            <CTA handleGetStarted={handleGetStarted} />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}

export default App;

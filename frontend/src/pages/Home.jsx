import { Users, Gift, TrendingUp, ArrowRight } from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">ReferPro</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-indigo-600 transition"
            >
              Contact
            </a>
          </nav>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Turn Your Network Into
          <span className="text-indigo-600"> Revenue</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Easily manage referrals, track rewards, and grow your business through
          the power of word-of-mouth marketing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-lg">
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-indigo-600">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Why Choose ReferPro?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-indigo-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Easy Referral Tracking
            </h3>
            <p className="text-gray-600">
              Track every referral from start to finish with our intuitive
              dashboard. Never lose sight of your referral pipeline.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Automated Rewards
            </h3>
            <p className="text-gray-600">
              Set up custom reward structures and let our system automatically
              calculate and distribute rewards to your referrers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Analytics & Insights
            </h3>
            <p className="text-gray-600">
              Get detailed insights into your referral program's performance
              with real-time analytics and reporting.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of businesses using ReferPro to drive growth through
            referrals.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg">
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

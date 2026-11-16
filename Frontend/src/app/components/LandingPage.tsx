import { Activity, Brain, Shield, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
            <Activity className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to Ribbon Haven
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive cancer detection and health management platform powered by advanced AI technology
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI-Powered Detection</h3>
            <p className="text-gray-600 text-sm">
              Upload CT images and blood reports for instant cancer risk analysis using our trained machine learning models
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Comprehensive Tracking</h3>
            <p className="text-gray-600 text-sm">
              Monitor your health journey with detailed reports, family history analysis, and personalized care measures
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Meet Elix</h3>
            <p className="text-gray-600 text-sm">
              Chat with our AI health assistant for personalized guidance, answer questions, and receive health suggestions
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">How Ribbon Haven Works</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">1</span>
              <span>Upload your medical data including CT scans, blood reports, or other medical documents</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">2</span>
              <span>Our AI analyzes your data and generates comprehensive health reports with cancer risk assessment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">3</span>
              <span>Explore family history, receive personalized health measures, and track your progress over time</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm">4</span>
              <span>Stay connected with Elix, your AI health companion, available 24/7 for guidance and support</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Click the menu icon in the top-left corner to explore all features
          </p>
        </div>
      </div>
    </div>
  );
}

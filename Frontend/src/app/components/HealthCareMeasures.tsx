import { Apple, Dumbbell, Moon, Droplets, Pill, Shield } from 'lucide-react';

export default function HealthCareMeasures() {
  const recommendations = [
    {
      icon: Apple,
      title: 'Personalized Diet Plan',
      color: 'from-green-500 to-emerald-500',
      items: [
        'Increase cruciferous vegetables (broccoli, kale) - 3-4 servings daily',
        'Add omega-3 rich foods (salmon, walnuts) - 2-3x per week',
        'Limit processed meats and red meat consumption',
        'Include antioxidant-rich berries in your morning routine',
        'Stay hydrated: 8-10 glasses of water daily',
      ],
    },
    {
      icon: Dumbbell,
      title: 'Exercise Recommendations',
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Moderate cardio exercise: 150 minutes per week',
        'Strength training: 2-3 sessions per week',
        'Yoga or stretching: 20 minutes daily for stress relief',
        'Outdoor walking: 30 minutes daily for vitamin D',
      ],
    },
    {
      icon: Moon,
      title: 'Sleep & Rest',
      color: 'from-purple-500 to-indigo-500',
      items: [
        'Maintain consistent sleep schedule: 11 PM - 7 AM',
        'Avoid screens 1 hour before bedtime',
        'Create a cool, dark sleeping environment',
        'Practice relaxation techniques before sleep',
      ],
    },
    {
      icon: Shield,
      title: 'Preventive Measures',
      color: 'from-orange-500 to-red-500',
      items: [
        'Annual health screenings and mammography',
        'Regular dermatology check-ups',
        'Limit alcohol consumption to 1 drink per day',
        'Avoid smoking and second-hand smoke exposure',
        'Use sunscreen (SPF 30+) daily',
      ],
    },
    {
      icon: Pill,
      title: 'Supplements',
      color: 'from-pink-500 to-rose-500',
      items: [
        'Vitamin D3: 2000 IU daily',
        'Omega-3 Fish Oil: 1000mg daily',
        'Multivitamin with B-complex',
        'Calcium: 1000mg daily for bone health',
      ],
    },
    {
      icon: Droplets,
      title: 'Stress Management',
      color: 'from-teal-500 to-cyan-500',
      items: [
        'Meditation: 15 minutes daily',
        'Deep breathing exercises when stressed',
        'Social connections: regular family/friend time',
        'Hobby engagement: 30 minutes daily',
        'Professional counseling if needed',
      ],
    },
  ];

  return (
    <div className="min-h-full p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Health Care Measures</h1>
          <p className="text-gray-600">Personalized recommendations based on your health profile</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl text-white mb-8">
          <h3 className="font-semibold mb-2">AI-Personalized Plan</h3>
          <p className="text-sm">
            These recommendations are tailored specifically for you based on your test results, family history,
            and current health metrics. Follow these guidelines to optimize your health and reduce cancer risk.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
                <div className={`inline-flex p-3 bg-gradient-to-r ${rec.color} rounded-xl mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{rec.title}</h3>
                <ul className="space-y-2">
                  {rec.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-1.5 h-1.5 bg-purple-600 rounded-full mt-2"></span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-purple-50 border border-purple-200 p-6 rounded-2xl text-center">
          <p className="text-purple-900 font-semibold mb-3">
            Track your progress and update your plan monthly
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Download Personalized Plan PDF
          </button>
        </div>
      </div>
    </div>
  );
}

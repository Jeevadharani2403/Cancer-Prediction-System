import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Activity, Heart, Droplet } from 'lucide-react';

const healthTrendData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 86 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 91 },
];

const biomarkerData = [
  { name: 'WBC', value: 7.5, normal: 8 },
  { name: 'RBC', value: 4.8, normal: 5 },
  { name: 'Hemoglobin', value: 14.2, normal: 15 },
  { name: 'Platelets', value: 250, normal: 300 },
];

const radarData = [
  { metric: 'Physical', score: 90 },
  { metric: 'Mental', score: 85 },
  { metric: 'Nutrition', score: 78 },
  { metric: 'Sleep', score: 82 },
  { metric: 'Immunity', score: 88 },
];

export default function ReportAnalysis() {
  return (
    <div className="min-h-full p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Health Analysis Dashboard
          </h1>
          <p className="text-gray-600">Comprehensive overview of your health metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Health Score</span>
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">91/100</div>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+5% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Heart Rate</span>
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">72 bpm</div>
            <div className="text-sm text-gray-500 mt-1">Normal range</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Blood Pressure</span>
              <Droplet className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">120/80</div>
            <div className="text-sm text-gray-500 mt-1">Optimal</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Tests Completed</span>
              <Activity className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800">12</div>
            <div className="text-sm text-gray-500 mt-1">This year</div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Health Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Score Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={healthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#9333ea" strokeWidth={3} dot={{ fill: '#9333ea', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Biomarkers */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Biomarkers</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={biomarkerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="value" fill="#9333ea" radius={[8, 8, 0, 0]} />
                <Bar dataKey="normal" fill="#e9d5ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Wellness Radar */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Wellness Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                <PolarRadiusAxis domain={[0, 100]} stroke="#6b7280" />
                <Radar name="Score" dataKey="score" stroke="#9333ea" fill="#9333ea" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Tests */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Test Results</h3>
            <div className="space-y-3">
              {[
                { name: 'Blood Test', date: 'Apr 20, 2026', result: 'Normal', color: 'green' },
                { name: 'CT Scan', date: 'Apr 15, 2026', result: 'Clear', color: 'green' },
                { name: 'Blood Pressure', date: 'Apr 10, 2026', result: 'Optimal', color: 'green' },
                { name: 'Cholesterol', date: 'Mar 28, 2026', result: 'Borderline', color: 'yellow' },
              ].map((test, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{test.name}</p>
                    <p className="text-sm text-gray-500">{test.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    test.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {test.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

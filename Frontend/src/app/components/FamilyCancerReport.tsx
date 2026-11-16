import { Users, AlertCircle, Info } from 'lucide-react';

export default function FamilyCancerReport() {
  return (
    <div className="min-h-full p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Family Cancer Report</h1>
          <p className="text-gray-600">AI-generated hereditary cancer risk analysis</p>
        </div>

        {/* Legend */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-purple-600" />
            Risk Level Legend
          </h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">High Risk - Confirmed Diagnosis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Medium Risk - Hereditary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Low Risk - Monitor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">No Known Risk</span>
            </div>
          </div>
        </div>

        {/* Family Tree */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100">
          <h3 className="font-semibold text-gray-800 mb-8 text-center text-xl">Your Family Tree</h3>

          <div className="space-y-12">
            {/* Grandparents */}
            <div className="flex justify-center gap-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  GM
                </div>
                <p className="text-sm font-semibold">Grandmother</p>
                <p className="text-xs text-gray-500">(Maternal)</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  GF
                </div>
                <p className="text-sm font-semibold">Grandfather</p>
                <p className="text-xs text-gray-500">(Maternal)</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  GM
                </div>
                <p className="text-sm font-semibold">Grandmother</p>
                <p className="text-xs text-gray-500">(Paternal)</p>
                <p className="text-xs text-red-600 font-semibold mt-1">Breast Cancer</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  GF
                </div>
                <p className="text-sm font-semibold">Grandfather</p>
                <p className="text-xs text-gray-500">(Paternal)</p>
              </div>
            </div>

            {/* Parents */}
            <div className="flex justify-center gap-24">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  M
                </div>
                <p className="text-sm font-semibold">Mother</p>
                <p className="text-xs text-orange-600 font-semibold mt-1">35% Hereditary Risk</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  F
                </div>
                <p className="text-sm font-semibold">Father</p>
                <p className="text-xs text-yellow-600 font-semibold mt-1">18% Hereditary Risk</p>
              </div>
            </div>

            {/* You */}
            <div className="flex justify-center">
              <div className="text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-xl border-4 border-white">
                  YOU
                </div>
                <p className="text-sm font-semibold">Your Profile</p>
                <p className="text-xs text-orange-600 font-semibold mt-1">22% Hereditary Risk</p>
              </div>
            </div>

            {/* Siblings */}
            <div className="flex justify-center gap-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  S1
                </div>
                <p className="text-sm font-semibold">Sister</p>
                <p className="text-xs text-orange-600 font-semibold mt-1">24% Risk</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-white mb-2 mx-auto shadow-lg">
                  B
                </div>
                <p className="text-sm font-semibold">Brother</p>
                <p className="text-xs text-yellow-600 font-semibold mt-1">15% Risk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 bg-orange-50 border border-orange-200 p-6 rounded-2xl">
          <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            AI-Generated Insights
          </h3>
          <ul className="space-y-2 text-sm text-orange-800">
            <li>• Hereditary breast cancer pattern detected through paternal grandmother</li>
            <li>• Recommend genetic counseling and BRCA gene testing</li>
            <li>• Suggested screening: Annual mammography starting age 35</li>
            <li>• Family members share similar genetic markers - encourage testing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { predictLung } from "../../api";

export default function TestConduct() {
  const [testType, setTestType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);

  const testTypes = [
    "CT Scan",
    "Blood Report",
    "Medical Report",
    "MRI Scan",
    "X-Ray",
    "Biopsy Results",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setReportGenerated(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!testType || !file) return;

    setIsProcessing(true);
    setReportGenerated(false);

    try {
      // 🔥 Call backend
      const res = await predictLung(file);

      setPrediction(res.prediction);
      setReportGenerated(true);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }

    setIsProcessing(false);
  };

  // 🧠 Convert prediction to readable text
  const getResultText = () => {
    if (prediction === 0) return "Normal";
    if (prediction === 1) return "Cancer Detected";
    if (prediction === 2) return "Severe Condition";
    return "Unknown";
  };

  return (
    <div className="min-h-full flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Test Conduct</h2>
            <p className="text-gray-600 mt-2">
              Upload your medical data for AI-powered analysis
            </p>
          </div>

          <div className="space-y-6">
            {/* Test Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type of Test
              </label>
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
              >
                <option value="">Select test type...</option>
                {testTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Data
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-3 w-full px-4 py-6 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50"
                >
                  <Upload className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">
                    {fileName || "Click to upload image"}
                  </span>
                </label>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleGenerateReport}
              disabled={!testType || !file || isProcessing}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing with AI...</span>
                </>
              ) : reportGenerated ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Analysis Complete</span>
                </>
              ) : (
                <span>Generate Report</span>
              )}
            </button>

            {/* Result */}
            {reportGenerated && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  AI Analysis Result
                </h3>

                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>Test Type:</strong> {testType}</p>
                  <p><strong>Prediction:</strong> {getResultText()}</p>
                  <p><strong>Raw Output:</strong> {prediction}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
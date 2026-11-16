import { useState } from "react";
import { Menu, User, X } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ProfileMenu from "./components/ProfileMenu";
import LandingPage from "./components/LandingPage";
import TestConduct from "./components/TestConduct";
import ReportAnalysis from "./components/ReportAnalysis";
import FamilyCancerReport from "./components/FamilyCancerReport";
import HealthCareMeasures from "./components/HealthCareMeasures";
import ChatbotElix from "./components/ChatbotElix";
import Reminders from "./components/Reminders";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage />;
      case "test-conduct":
        return <TestConduct />;
      case "report-analysis":
        return <ReportAnalysis />;
      case "family-report":
        return <FamilyCancerReport />;
      case "health-measures":
        return <HealthCareMeasures />;
      case "chatbot":
        return <ChatbotElix />;
      case "reminders":
        return <Reminders />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6 text-purple-600" />
          ) : (
            <Menu className="w-6 h-6 text-purple-600" />
          )}
        </button>

        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Ribbon Haven
        </h1>

        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="p-2 hover:bg-purple-100 rounded-full transition-colors"
            aria-label="Profile menu"
          >
            <User className="w-6 h-6 text-purple-600" />
          </button>

          <ProfileMenu
            isOpen={profileMenuOpen}
            onClose={() => setProfileMenuOpen(false)}
            isLoggedIn={isLoggedIn}
            onLogin={() => setIsLoggedIn(true)}
            onLogout={() => setIsLoggedIn(false)}
          />
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onNavigate={handleNavigation}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="size-full pt-16 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}
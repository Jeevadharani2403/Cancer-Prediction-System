import { Activity, FileText, Users, Heart, MessageCircle, Bell } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  onClose: () => void;
}

const menuItems = [
  { id: 'test-conduct', label: 'Test Conduct', icon: Activity },
  { id: 'report-analysis', label: 'Report Analysis', icon: FileText },
  { id: 'family-report', label: 'Family Cancer Report', icon: Users },
  { id: 'health-measures', label: 'Health Care Measures', icon: Heart },
  { id: 'chatbot', label: 'Elix - AI Chatbot', icon: MessageCircle },
  { id: 'reminders', label: 'Reminders & Notifications', icon: Bell },
];

export default function Sidebar({ isOpen, currentPage, onNavigate, onClose }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-6 space-y-2">
          <button
            onClick={() => onNavigate('home')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              currentPage === 'home'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'hover:bg-purple-50 text-gray-700'
            }`}
          >
            Home
          </button>

          <div className="pt-4 pb-2">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Features
            </h3>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'hover:bg-purple-50 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

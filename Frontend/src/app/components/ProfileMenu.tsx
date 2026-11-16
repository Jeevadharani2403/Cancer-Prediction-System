import { LogIn, LogOut, User } from 'lucide-react';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function ProfileMenu({ isOpen, onClose, isLoggedIn, onLogin, onLogout }: ProfileMenuProps) {
  if (!isOpen) return null;

  const handleLogin = () => {
    onLogin();
    onClose();
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-xl border border-purple-100 z-50 overflow-hidden">
        {isLoggedIn ? (
          <>
            <button
              className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 text-gray-700"
              onClick={onClose}
            >
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </button>
            <button
              className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 text-gray-700 border-t border-purple-100"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </>
        ) : (
          <button
            className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 text-gray-700"
            onClick={handleLogin}
          >
            <LogIn className="w-4 h-4" />
            <span>Log In</span>
          </button>
        )}
      </div>
    </>
  );
}

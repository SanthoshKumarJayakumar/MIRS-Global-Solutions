import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatSessionTime, extendSession } from '../utils/sessionUtils';

const SessionTimeoutWarning: React.FC = () => {
  const { sessionTimeLeft, isSessionExpiring, logout } = useAuth();

  const handleExtendSession = () => {
    if (extendSession()) {
      window.location.reload(); // Simple refresh to restart timers
    }
  };

  if (!isSessionExpiring || sessionTimeLeft <= 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="text-yellow-200" size={20} />
              <div>
                <p className="font-semibold">Session Expiring Soon!</p>
                <p className="text-sm text-yellow-100">
                  Your session will expire in {formatSessionTime(sessionTimeLeft)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-100">
                <Clock size={16} />
                <span className="text-sm font-mono">
                  {formatSessionTime(sessionTimeLeft)}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleExtendSession}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Extend Session
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Logout Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SessionTimeoutWarning;

// Session management utilities

export const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
export const WARNING_TIME = 60 * 1000; // 1 minute warning before expiry

export const formatSessionTime = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const isSessionValid = (loginTime: number): boolean => {
  const now = Date.now();
  return (now - loginTime) < SESSION_DURATION;
};

export const getSessionTimeLeft = (loginTime: number): number => {
  const now = Date.now();
  const timeLeft = SESSION_DURATION - (now - loginTime);
  return Math.max(0, timeLeft);
};

export const extendSession = (): boolean => {
  try {
    const currentUser = localStorage.getItem('mirs_admin_user');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      userData.loginTime = Date.now();
      localStorage.setItem('mirs_admin_user', JSON.stringify(userData));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error extending session:', error);
    return false;
  }
};


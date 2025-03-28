'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

const useAutoLogout = (timeout: number = 2 * 60 * 60 * 1000) => {
  // Default to 2 hours
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [countdown, setCountdown] = useState<number>(timeout / 1000); // Convert ms to seconds
  const logout = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  const addEventListeners = () => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
  };

  const removeEventListeners = () => {
    window.removeEventListener('mousemove', handleUserActivity);
    window.removeEventListener('click', handleUserActivity);
    window.removeEventListener('keypress', handleUserActivity);
  };
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (seconds === 0) {
      logout();
    }
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    // return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const [formattedCountdown, setFormattedCountdown] = useState<string>(
    formatTime(timeout / 1000)
  );
  let activityTimeout: NodeJS.Timeout;
  let countdownInterval: NodeJS.Timeout;

  const resetTimer = () => {
    if (showAuthModal) return null;
    clearTimeout(activityTimeout);
    clearInterval(countdownInterval);
    const initialCountdown = timeout / 1000;
    setCountdown(initialCountdown); // Reset countdown to full timeout
    setFormattedCountdown(formatTime(initialCountdown));
    addEventListeners();
    activityTimeout = setTimeout(logout, timeout);
    startCountdown();
  };

  const handleUserActivity = () => {
    resetTimer();
  };

  const startCountdown = () => {
    countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        const newCountdown = prevCountdown - 1;
        setFormattedCountdown(formatTime(newCountdown));
        if (newCountdown <= 900) {
          if (!showAuthModal) {
            setShowAuthModal(true);
            removeEventListeners();
          }
        }
        return newCountdown;
      });
    }, 1000); // Update countdown every second
  };

  const onReset = () => {
    setShowAuthModal(false);
    setCountdown(timeout / 1000);
  };

  useEffect(() => {
    resetTimer(); // Start initial timer and countdown
    return () => {
      clearTimeout(activityTimeout);
      clearInterval(countdownInterval);
      removeEventListeners();
    };
  }, []);

  return { countdown, logout, onReset, showAuthModal, formattedCountdown }; // Return both seconds and formatted time
};

export default useAutoLogout;

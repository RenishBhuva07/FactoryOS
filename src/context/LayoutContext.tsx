import React, { useState, useEffect } from 'react';
import { LayoutContext } from './layoutContextDef';

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isWhatsAppDigestOpen, setIsWhatsAppDigestOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev);
  const toggleWhatsAppDigest = () => setIsWhatsAppDigestOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsMobileMenuOpen(false);
        setIsWhatsAppDigestOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        isSearchOpen,
        setIsSearchOpen,
        toggleSearch,
        isNotificationsOpen,
        setIsNotificationsOpen,
        toggleNotifications,
        isWhatsAppDigestOpen,
        setIsWhatsAppDigestOpen,
        toggleWhatsAppDigest,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

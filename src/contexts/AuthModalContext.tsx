'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthModalContextType = {
  isModalOpen: boolean;
  modalView: 'login' | 'register';
  openLoginModal: () => void;
  openRegisterModal: () => void;
  closeModal: () => void;
  switchToLogin: () => void;
  switchToRegister: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'login' | 'register'>('login');

  const openLoginModal = () => {
    setModalView('login');
    setIsModalOpen(true);
  };

  const openRegisterModal = () => {
    setModalView('register');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const switchToLogin = () => {
    setModalView('login');
  };

  const switchToRegister = () => {
    setModalView('register');
  };

  return (
    <AuthModalContext.Provider
      value={{
        isModalOpen,
        modalView,
        openLoginModal,
        openRegisterModal,
        closeModal,
        switchToLogin,
        switchToRegister,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
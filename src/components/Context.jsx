'use client';
const { createContext, useState, useContext } = require('react');

const ToggleContext = createContext();

export const ToggleProvider = ({ children, initialState = false }) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ToggleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};

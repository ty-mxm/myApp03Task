import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the UserContextProps interface
interface UserContextProps {
  user: { firstName: string; lastName: string } | null;
  setUser: (user: { firstName: string; lastName: string }) => void;
}

// Create the UserContext with default value as undefined
export const UserContext = createContext<UserContextProps | undefined>(undefined); // Export UserContext

// Create a provider component to wrap your app
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

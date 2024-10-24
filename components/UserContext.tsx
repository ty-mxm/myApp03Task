import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définir l'interface UserContextProps
interface UserContextProps {
  user: { firstName: string; lastName: string } | null;
  setUser: (user: { firstName: string; lastName: string }) => void;
}

// Créer le UserContext avec une valeur par défaut définie sur undefined
export const UserContext = createContext<UserContextProps | undefined>(undefined); // Exporter UserContext

// Créer un composant provider pour encapsuler votre application
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour utiliser le UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

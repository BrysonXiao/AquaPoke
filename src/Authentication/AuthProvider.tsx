import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {username: string} | null;

export const AuthContext = React.createContext<{
  user: User;
  login: () => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {}

// Access the current user anywhere in the application
export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: () => {
          // Usually some API call
          const fakeUser = {username: 'bob'};
          setUser(fakeUser);
          AsyncStorage.setItem('user', JSON.stringify(fakeUser));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem('user');
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

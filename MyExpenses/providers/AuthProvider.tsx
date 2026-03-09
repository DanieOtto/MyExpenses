import React, {createContext, useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../config/api';

type AuthState = { accessToken: string | null; refreshToken?: string | null; user?: any };
const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{children:any}> = ({children}) => {
  const [state, setState] = useState<AuthState>({accessToken: null, refreshToken: null, user: null});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setState({ accessToken, refreshToken: null, user: null });
      }
      setLoading(false);
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    const resp = await api.post('/api/auth/login', { email, password });
    const { token } = resp.data;
    await SecureStore.setItemAsync('accessToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setState({ accessToken: token, refreshToken: null, user: null });
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    delete api.defaults.headers.common['Authorization'];
    setState({ accessToken: null, refreshToken: null, user: null });
  };

  // Register method for new users
  const register = async (email: string, password: string) => {
    const resp = await api.post('/auth/register', { email, password });
    const { token } = resp.data;
    await SecureStore.setItemAsync('accessToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setState({ accessToken: token, refreshToken: null, user: null });
  };

  const value = { ...state, loading, signIn, signOut, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

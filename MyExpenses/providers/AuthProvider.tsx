import React, {createContext, useContext, useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../config/api';

type AuthState = { accessToken: string | null; refreshToken?: string | null; user?: any };
const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{children:any}> = ({children}) => {
  const [state, setState] = useState<AuthState>({accessToken: null, refreshToken: null, user: null});
  React.useEffect(() => {
    console.log('AuthProvider: state changed', state);
  }, [state]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setState({ accessToken, refreshToken: null, user: null });
        console.log('AuthProvider: accessToken loaded from SecureStore', accessToken);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const resp = await api.post('/api/auth/login', { username: email, password });
      let token = resp.data.result;
      if (typeof token !== 'string') {
        token = String(token);
      }
      await SecureStore.setItemAsync('accessToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setState({ accessToken: token, refreshToken: null, user: null });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    delete api.defaults.headers.common['Authorization'];
    setState({ accessToken: null, refreshToken: null, user: null });
  };

  const register = async (email: string, password: string) => {
    const resp = await api.post('/auth/register', { email, password });
    const { token } = resp.data.result;
    await SecureStore.setItemAsync('accessToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setState({ accessToken: token, refreshToken: null, user: null });
  };

  const value = { ...state, loading, signIn, signOut, register };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

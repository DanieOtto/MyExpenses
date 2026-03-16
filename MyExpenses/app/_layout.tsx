import React from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../providers/AuthProvider';
import { View, ActivityIndicator } from 'react-native';

function AuthGate() {
  const auth = useAuth();
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    if (auth.loading) return;

    const inAuthRoute = segments[0] === 'auth';

    if (!auth.accessToken && !inAuthRoute) {
      router.replace('/auth/Login');
      return;
    }

    if (auth.accessToken && inAuthRoute) {
      router.replace('/(tabs)/expenses');
    }
  }, [auth.loading, auth.accessToken, segments, router]);

  React.useEffect(() => {
    console.log('AuthGate: auth state', auth);
  }, [auth]);
  if (auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="auth/Login" options={{ title: 'Login' }} />
      <Stack.Screen name="auth/Register" options={{ title: 'Register' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}

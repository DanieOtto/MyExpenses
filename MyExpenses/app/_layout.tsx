import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import { View, ActivityIndicator } from 'react-native';

function AuthGate() {
  const auth = useAuth();
  if (auth.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!auth.accessToken) {
    return (
      <Stack>
        <Stack.Screen name="auth/Login" options={{ title: 'Login' }} />
        <Stack.Screen name="auth/Register" options={{ title: 'Register' }} />
      </Stack>
    );
  }
  return (
    <Stack>
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

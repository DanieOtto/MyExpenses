import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from './AuthProvider';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState('');
  const auth = useAuth();

  const submit = async () => {
    setErr('');
    if (password !== confirm) {
      setErr('Passwords do not match');
      return;
    }
    try {
      await auth.register(email, password);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Registration failed');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput placeholder="Confirm Password" value={confirm} onChangeText={setConfirm} secureTextEntry />
      {err ? <Text style={{ color: 'red' }}>{err}</Text> : null}
      <Button title="Register" onPress={submit} />
    </View>
  );
}

import React, {useState} from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from './AuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const auth = useAuth();

  const submit = async () => {
    try {
      await auth.signIn(email, password);
    } catch (e:any) {
      setErr(e?.response?.data?.message || e.message || 'Login failed');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {err ? <Text>{err}</Text> : null}
      <Button title="Sign in" onPress={submit} />
    </View>
  );
}
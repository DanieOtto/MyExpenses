import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../providers/AuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const auth = useAuth();

  const validateEmail = (value: string) => {
    return /^\S+@\S+\.\S+$/.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const submit = async () => {
    setErr('');
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (!valid) return;
    setLoading(true);
    try {
      await auth.signIn(email, password);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eyeButton}
          accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
        >
          <MaterialIcons
            name={showPassword ? 'visibility-off' : 'visibility'}
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
      {err ? <Text style={styles.error}>{err}</Text> : null}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={submit}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#222',
  },
  error: {
    color: '#d32f2f',
    marginBottom: 12,
    marginTop: -8,
    fontSize: 14,
    alignSelf: 'flex-start',
    maxWidth: 340,
  },
  button: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    marginTop: 8,
    shadowColor: '#1976d2',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  eyeButton: {
    padding: 4,
    marginLeft: 4,
  },
});
// src/screens/auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@firebaseConfig';  // Your Firebase auth configuration
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Password reset link sent to your email.');
      router.push('/login'); // Navigate to the login page after successful reset
    } catch (error) {
      let errorMessage = 'Failed to send reset link';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePasswordReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/login')}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  backToLogin: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
// app/(auth)/login.tsx
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import LoginScreen from '@/screens/auth/LoginScreen'; // Import the LoginScreen component
import { useRouter } from 'expo-router'; // For navigation

export default function LoginPage() {
  const router = useRouter();

  const navigateToRegister = () => {
    router.push('/register'); // Navigate to the register page
  };

  const navigateToForgotPassword = () => {
    router.push('/ForgotPassword'); // Navigate to the forgot password page
  };

  return (
    <View style={styles.container}>
      <LoginScreen />
  
      <View style={styles.linksContainer}>
        <Text style={styles.text}>Don't have an account? 
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerText}> Register</Text>
          </TouchableOpacity>
        </Text>
  
        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25292e',
    paddingHorizontal: 20,
  },
  linksContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  registerText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 15,
    fontWeight: 'bold',
  },
});


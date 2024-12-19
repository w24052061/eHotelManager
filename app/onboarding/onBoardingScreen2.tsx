import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AnimatedImage from '@/components/AnimatedImage';

export default function OnboardingScreen2() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={require('../../assets/images/onBoardingImage2.webp')}
        style={styles.imageContainer}
        duration={3000} // Optional, customize animation duration
        animationType="rotate" // Choose the animation type (zoom, wobble, fade, bounce, rotate, slide.)
      />
      <Text style={styles.title}>Manage Your Rooms</Text>
      <Text style={styles.description}>
        Effortlessly manage hotel rooms, availability, and bookings. Our platform gives you complete control over your property.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => router.replace('/(auth)/Login')}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => router.push('/onboarding/onBoardingScreen3')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
    borderRadius:150
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  skipButton: {
    padding: 15,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#cccccc',
    fontSize: 16,
  },
  nextButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 30,
  }
});

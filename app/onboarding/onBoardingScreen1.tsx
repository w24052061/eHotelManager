import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { markOnboardingComplete } from '@/utils/onboardingStorage'; 
import AnimatedImage from '@/components/AnimatedImage';

export default function OnboardingScreen1() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={require('../../assets/images/onBoardingImage1.webp')}
        style={styles.imageContainer}
        duration={3000} // Optional, customize animation duration
        animationType="wobble" // Choose the animation type (zoom, wobble, fade, bounce, rotate, slide.)
      />
      <Text style={styles.title}>Welcome to eHotelManager</Text>
      <Text style={styles.description}>
        Manage your hotel bookings, guest services, and more, all in one place. Let's get you started!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={async () => {
            await markOnboardingComplete(); 
            router.replace('/(auth)/login'); 
          }}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => router.push('/onboarding/onBoardingScreen2')}
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

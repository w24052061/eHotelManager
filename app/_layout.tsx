import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import { ActivityIndicator, View } from 'react-native';  // For loading spinner

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
        setIsFirstLaunch(hasCompletedOnboarding !== 'true');
      } catch (error) {
        console.error('Error checking onboarding status', error);
        setIsFirstLaunch(true); // Default to onboarding if there’s an error
      }
    };

    checkOnboardingStatus();
  }, []);

  // Display a loading spinner while checking onboarding status
  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <Stack.Screen name="onboarding/onBoardingScreen1" /> 
      ) : (
        <Stack.Screen name="(tabs)" />  
      )}
    </Stack>
  );
}
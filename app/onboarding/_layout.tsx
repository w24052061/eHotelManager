import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onBoardingScreen1" />
      <Stack.Screen name="onBoardingScreen2" />
      <Stack.Screen name="onBoardingScreen3" />
    </Stack>
  );
}
// src/components/AnimatedImage.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

interface AnimatedImageProps {
  source: any; // The image source (could be a static image or dynamic URI)
  style?: object; // Optionally accept additional styles
  duration?: number; // Duration for the animation (default: 3000ms)
  animationType?: 'zoom' | 'wobble' | 'fade' | 'bounce' | 'rotate' | 'slide'; // Animation type
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  source,
  style,
  duration = 3000,
  animationType = 'zoom', // Default animation
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    switch (animationType) {
      case 'zoom':
        animation = Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1.5,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
        ]);
        break;
      case 'wobble':
        animation = Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1.5,
              duration: duration / 4,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: duration / .5,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      case 'fade':
        animation = Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        });
        break;
      case 'bounce':
        animation = Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1.5,
              duration: duration / 2,
              useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: duration / 2,
              useNativeDriver: true,
            }),
          ])
        );
        break;
      case 'rotate':
        animation = Animated.loop(
          Animated.timing(animatedValue, {
            toValue: 360,
            duration,
            useNativeDriver: true,
          })
        );
        break;
      case 'slide':
        animation = Animated.timing(animatedValue, {
          toValue: 200,
          duration,
          useNativeDriver: true,
        });
        break;
      default:
        animation = Animated.timing(animatedValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        });
        break;
    }

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animatedValue, animationType, duration]);

  const transformStyle = {
    transform: [
      ...(animationType === 'rotate' ? [{ rotate: animatedValue.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] : []),
      ...(animationType === 'slide' ? [{ translateX: animatedValue }] : []),
      ...(animationType === 'zoom' || animationType === 'wobble' || animationType === 'fade' || animationType === 'bounce'
        ? [{ scale: animatedValue }]
        : []),
    ],
  };

  const opacityStyle = animationType === 'fade' ? { opacity: animatedValue } : {};

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={source}
        style={[styles.image, transformStyle, opacityStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius:150
  },
});

export default AnimatedImage;

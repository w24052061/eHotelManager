// components/MenuComponent.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@firebaseConfig';
import { useRouter } from 'expo-router';

const MenuComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Track if menu is open
  const [showMenuButton, setShowMenuButton] = useState(true); // Control the visibility of the hamburger button
  const menuAnimation = useState(new Animated.Value(0))[0]; // Animation for sliding in/out the menu
  const router = useRouter();
  
  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    // Slide in/out animation
    Animated.timing(menuAnimation, {
      toValue: nextState ? 1 : 0, // When opening, set to 1, when closing, set to 0
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      
      if (!nextState) {
        setTimeout(() => {
          setShowMenuButton(true); 
        }, 100);  
      }
    });

    if (nextState) {
      setShowMenuButton(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert('Logout Error', error.message);
    }
  };


  const navigateToHome = () => {
    router.push('/');  // Use the '/' route to navigate to the Home page
  };


  return (
    <View style={styles.container}>
      {/* Hamburger Button to Open Menu */}
      {showMenuButton && (  // Only show the hamburger button when the menu is closed
        <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
      )}

      {/* Sliding Menu */}
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [
              {
                translateX: menuAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-250, 0], // The menu will slide in/out from left to right
                }),
              },
            ],
          },
        ]}
      >
        {/* Close Button inside the Menu */}
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Text style={styles.closeButtonText}>❌</Text>
        </TouchableOpacity>

        {/* Menu Items */}
        <TouchableOpacity style={styles.menuItem} onPress={navigateToHome}>
          <Text style={styles.menuItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        <Text style={styles.menuCategory}>Demo Pages</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>React Native Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>React Native Animations</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Ensure the container is absolutely positioned
    top: 0,
    left: 0,
    zIndex: 10,  // Keep the menu above other content
    width: '100%',
    height: '100%',
  },
  hamburgerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 20,
    zIndex: 20,  // Button should stay on top of the menu
    position: 'absolute',  // Position the button over the content
  },
  hamburgerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 250,
    backgroundColor: '#2c3e50',
    paddingTop: 50,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    zIndex: 1,  // Ensure the menu stays behind the button when visible
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 50,
    zIndex: 30, // Make sure the close button stays on top
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginVertical: 10,
    marginLeft: 15,
  },
  menuItem: {
    paddingVertical: 15,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  menuItemText: {
    fontSize: 16,
    color: '#ecf0f1',
  },
});

export default MenuComponent;

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // Use router for navigation (optional)

const HamburgerMenu = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuAnimation = new Animated.Value(0);

  // Toggle the menu and apply slide-in/out animation
  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);

    Animated.timing(menuAnimation, {
      toValue: nextState ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Handle menu item click and navigate
  const handleMenuItemClick = (item) => {
    navigation.navigate(item); // Navigate to the clicked screen
    toggleMenu(); // Close menu after navigation
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Button */}
      <TouchableOpacity style={styles.hamburgerButton} onPress={toggleMenu}>
        <Text style={styles.hamburgerText}>☰</Text>
      </TouchableOpacity>

      {/* Sliding Menu */}
      <Animated.View
        style={[
          styles.menu,
          {
            transform: [
              {
                translateX: menuAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-250, 0], // Slide menu from left
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

        {/* Scrollable Menu Items */}
        <ScrollView style={styles.menuItemsContainer}>
          <FlatList
            data={['Home', 'Profile']}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemClick(item)}>
                <Text style={styles.menuItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  hamburgerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 20,
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
    paddingLeft: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  menuItemsContainer: {
    paddingTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  menuItemText: {
    fontSize: 16,
    color: '#ecf0f1',
  },
});

export default HamburgerMenu;

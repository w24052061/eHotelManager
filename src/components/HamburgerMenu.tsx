import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '@firebaseConfig';
import { signOut } from 'firebase/auth';

const HamburgerMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateToHome = () => {
        router.push('/'); // Navigates to the Home page
    };

    const navigateToDash = () => {
        router.push('/Dashboard'); // Navigates to the Dashboard page
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert('Logout Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
            {menuVisible && (
                <Modal
                    transparent={true}
                    animationType="none"
                    visible={menuVisible}
                    onRequestClose={toggleMenu}>
                    <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu}>
                        <View style={styles.menu}>
                            <Text style={styles.menuItem} onPress={navigateToHome}>🏠  Home</Text>
                            <Text style={styles.menuItem} onPress={navigateToDash}>📊  Dashboard</Text>
                            <Text style={styles.menuItem} onPress={handleLogout}>↪️  Logout</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginLeft: 20, // Align to the left side of the screen
        alignItems: 'flex-start', // Align items to the start (left)
        
    },
    menuButton: {
        padding: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4a4e69', // Dark desaturated blue
        borderRadius: 25, // Circular button
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 1, height: 1 },
        elevation: 6,
    },
    menuText: {
        fontSize: 28,
        color: '#ffffff', // White color for the menu icon
    },
    modalOverlay: {
        flex: 1,
        alignItems: 'flex-start', 
        backgroundColor: 'rgba(0,0,0,0.4)', 
    },
    menu: {
        marginTop: 50,
        backgroundColor: '#ffffff',
        padding: 20,
        width: '50%',
        maxWidth:400,
        borderRadius:0
    },
    menuItem: {
        fontSize: 18,
        padding: 15, 
        color: '#333', 
        textAlign: 'left', // Align text to the left
        fontFamily: 'Roboto-Regular', // Assuming Roboto is available, otherwise, default will be used
    }
});

export default HamburgerMenu;

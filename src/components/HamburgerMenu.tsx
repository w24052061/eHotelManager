import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const SimpleHamburgerMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
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
                            <Text style={styles.menuItem} onPress={() => alert('Option 1 Selected')}>Option 1</Text>
                            <Text style={styles.menuItem} onPress={() => alert('Option 2 Selected')}>Option 2</Text>
                            <Text style={styles.menuItem} onPress={() => alert('Option 3 Selected')}>Option 3</Text>
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
        marginRight: 20,
        alignItems: 'flex-end',
    },
    menuButton: {
        padding: 10,
        fontSize: 18,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 28,
        color: '#000',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    menu: {
        marginTop: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        fontSize: 18,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    }
});

export default SimpleHamburgerMenu;

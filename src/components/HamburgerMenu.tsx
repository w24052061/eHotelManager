import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "@firebaseConfig";
import { signOut } from "firebase/auth";
import useCheckUserRole from "@/components/CheckUserRole";

const HamburgerMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const role = useCheckUserRole();
  const isLoggedIn = role !== "" && role !== "loading";

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const navigateToHome = () => router.push("/");
  const navigateToDash = () => router.push("/Dashboard");
  const navigateToLogin = () => router.push("/Login");
  const navigateToProfile = () => router.push("/profile");
  const navigateToManageStaff = () => router.push("/ManageStaff");

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert("Logout Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {menuVisible && (
        <Modal
          transparent
          animationType="none"
          visible={menuVisible}
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleMenu}>
            <View style={styles.menu}>
              <Text style={styles.menuItem} onPress={navigateToHome}>
                🏠 Home
              </Text>

              {isLoggedIn && role !== "admin" && (
                // If logged in, show Dashboard and Logout
                <View>
                  <Text style={styles.menuItem} onPress={navigateToDash}>
                    📊 Dashboard
                  </Text>
                  <Text style={styles.menuItem} onPress={navigateToProfile}>
                    🙎🏻‍♂️ Profile
                  </Text>
                  <Text style={styles.menuItem} onPress={handleLogout}>
                    ↪️ Logout
                  </Text>
                </View>
              )}
              {!isLoggedIn && (
                // Otherwise, show Login
                <Text style={styles.menuItem} onPress={navigateToLogin}>
                  📲 Login
                </Text>
              )}

              {role === "admin" && (
                // If logged in, show Dashboard and Logout
                <View>
                  <Text style={styles.menuItem} onPress={navigateToDash}>
                    📊 Dashboard
                  </Text>
                  <Text style={styles.menuItem} onPress={navigateToManageStaff}>
                    👥 User Management
                  </Text>
                  <Text style={styles.menuItem} onPress={handleLogout}>
                    ↪️ Logout
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default HamburgerMenu;

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    alignItems: "flex-start",
  },
  menuButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4a4e69",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 1 },
    elevation: 6,
  },
  menuText: {
    fontSize: 28,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  menu: {
    marginTop: 50,
    backgroundColor: "#fff",
    padding: 20,
    width: "50%",
    maxWidth: 400,
    minWidth: 250,
  },
  menuItem: {
    fontSize: 18,
    padding: 15,
    color: "#333",
    textAlign: "left",
  },
});

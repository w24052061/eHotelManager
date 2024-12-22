import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref } from "firebase/database";
import { auth, database } from "@firebaseConfig";

type RoleState = "loading" | "admin" | "staff" | "user" | "";

export default function useCheckUserRole(): RoleState {
  const [role, setRole] = useState<RoleState>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Not logged in
        setRole("");
        return;
      }
      try {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          setRole(userData.role ?? "");
        } else {
          setRole("");
        }
      } catch (error) {
        console.error("Failed to fetch user role:", error);
        setRole("");
      }
    });

    return () => unsubscribe();
  }, []);

  return role;
}

import { getDatabase, ref, get } from "firebase/database";

export const fetchUserRole = async (userId) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val().role; // Assuming the role is stored directly under the user object
  } else {
    return null; // Handle case where user data may not exist
  }
};

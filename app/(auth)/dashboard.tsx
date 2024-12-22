import DashboardScreen from "@/screens/auth/DashboardScreen";
import AdminDashboard from "./AdminDashboard"; // Ensure the path is correct
import { useRouter } from "expo-router"; // Import the router
import useCheckUserRole from "@/components/CheckUserRole";

const DashboardTab = () => {
  const router = useRouter();
  const role = useCheckUserRole();

  if (role === "loading") {
    return null; // Return null while loading
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "staff" || role === "user") {
    return <DashboardScreen />;
  } else {
    // If truly no role (user not logged in)
    router.replace("/");
    return null;
  }
};

export default DashboardTab;

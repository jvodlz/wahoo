import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const ProtectedRoute: React.FC = () => {
    const { isAuthorized } = useAuth();
    console.log(`Protected Route access: ${isAuthorized}`);

    if(!isAuthorized) {
        return <Navigate to="/login" />
    } 
    return <Outlet />
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { token } = useAuth();

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token exists, allow access
    return children;
}


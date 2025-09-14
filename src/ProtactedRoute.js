import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const ProtectedRoute = () => {
    const getUserLoggedIn = useSelector((state) => state.user.userLoggedIn);
    console.log(getUserLoggedIn,"getUserLoggedIn");
   
    
    return getUserLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
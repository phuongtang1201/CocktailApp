import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


/*
This component is to verify all user sign in before accessing protected routes
*/
const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return (  
        //If auth is user, then can access to protectes routes (which represents by <Outlet/>)
        //Otherwise, go to login page and remember where we came from and head in after sign in
        auth?.email
            ? <Outlet/>
            : <Navigate to= "/sign-in" state={{from: location}} replace/>
    );
}
 
export default RequireAuth;
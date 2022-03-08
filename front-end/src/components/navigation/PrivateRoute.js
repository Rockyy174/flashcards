import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LOGIN_ROUTE } from "../../constants/routes";
import { ACCESS_TOKEN } from "../../constants/constants";


const PrivateRoute = ({children}) => {
    // Redirect
    const navigate = useNavigate();
    // User info
    const {isAuthenticated} = useContext(GlobalContext);

    useEffect(() => {
        if (!isAuthenticated && !ACCESS_TOKEN) {
            navigate(LOGIN_ROUTE);
        }
    }, [])


    return (
        <>
            {isAuthenticated ? children : <></>}
        </>
    )
}

export default PrivateRoute;

import React, {useContext} from "react";
import {UserContext} from "./UserSession";
import {Navigate, Outlet, Route, useLocation} from "react-router-dom";
//import {retrieveUserFromLocalStorage} from "./retrieveUserFromLocalStorage";




// PrivateRoute component to guard routes
const PrivateRoute = ({  children, allowedUserTypes  } : any) => {
    //const navigate = useNavigate();
    //const { user } = useContext(UserContext);
    //const storedUser = localStorage.getItem('currentUser');
    const storedUser = sessionStorage.getItem('currentUserLoggedIn');
    const user = storedUser ? JSON.parse(storedUser) : null;
    let location = useLocation();

    const isNotAuth = !user || !allowedUserTypes.includes(user.userType);

    console.log("The usertype: " + user?.userType);

    if (isNotAuth) {
        // Redirect to the unauthorized page if user is not authenticated
        return <Navigate to="/unauthorized"  state = {{from: location}}/>;
    }


    // Render the route's element if user is authenticated
    return children ? children : <Outlet/>;
};

export default PrivateRoute;
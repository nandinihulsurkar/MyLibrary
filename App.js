import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./src/components/Header";
import Home from "./src/components/Home";
import Books from "./src/components/Books";
import Authors from "./src/components/Authors";
import Register from "./src/components/Register";
import Login from "./src/components/Login";
import ChangePassword from "./src/components/ChangePassword";
import UpdateProfile from "./src/components/UpdateProfile";

import SearchContext from "./src/contexts/SearchContext";
import LoggedInUser from "./src/contexts/LoggedInUser";

const LandingHere = () => {
    const [searchedTextIs, setSearchedTextIs] = useState('');

    const liuDefData = useContext(LoggedInUser);
    const [liUserDetails, setLiUserDetails] = useState(liuDefData);

    return(
        <SearchContext.Provider value={{searchedTextIs:searchedTextIs, setSearchedTextIs}} >
        <LoggedInUser.Provider value={{liUserDetails, setLiUserDetails}} >
        <div>
            <Header></Header>                 
            <Outlet />
        </div>
        </LoggedInUser.Provider>
        </SearchContext.Provider>
    )
}

const appRoutes = createBrowserRouter([
    {
        'path':'/',
        element: <LandingHere />,
        children:[
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/authors',
                element: <Authors />,
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/change-password',
                element: <ChangePassword />
            },
            {
                path: '/update-profile',
                element: <UpdateProfile />
            }
        ],
    }    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./src/components/Header";
import Home from "./src/components/Home";
import Books from "./src/components/Books";
import Authors from "./src/components/Authors";

import SearchContext from "./src/contexts/SearchContext";

const LandingHere = () => {
    const [searchedTextIs, setSearchedTextIs] = useState('');
    return(
        <SearchContext.Provider value={{searchedTextIs:searchedTextIs, setSearchedTextIs}} >
        <div>
            <Header></Header>
           
            <Outlet />
        </div>
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
        ],
    }    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoutes} />);
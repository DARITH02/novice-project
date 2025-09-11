import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import ViewCart from "../components/ViewCart.jsx";
const route = createBrowserRouter([
    {
        path: "/",
        element:<App/> ,


    },{
        path:"/view-cart/:id",
        element:<ViewCart/>,
    }
])

export default route;
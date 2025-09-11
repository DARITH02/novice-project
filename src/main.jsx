import { StrictMode } from 'react'
import  ReactDOM  from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import route from './router/route.jsx'
import './index.css'
import React from "react";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={route} />
    </React.StrictMode>
)


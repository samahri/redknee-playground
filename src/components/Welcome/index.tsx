import React from "react";
import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
    return (
        <div>
            <h1><Link to={'/'}>Welcome to Redknee</Link></h1>
            <Outlet />
        </div>
    );
};

export default Welcome;
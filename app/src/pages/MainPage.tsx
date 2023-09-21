import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../services/auth-service";

function MainPage() {
    const [loginStatus] = useState(!!isLoggedIn())
    const navigate = useNavigate()

    useEffect(() => {
        if(!loginStatus) navigate('/login')
    }, [loginStatus, navigate])
    return (
        <div className="flex h-screen">
            <Sidebar></Sidebar>
            <Outlet />
        </div>
    );
}

export default MainPage;

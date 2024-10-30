import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    },[]);

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar />
            <div className="h-[calc(100vh-3.5rem)] overflow-auto w-full">
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
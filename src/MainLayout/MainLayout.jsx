import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div className="relative">
           <div className="sticky top-0 z-10"> <Navbar /></div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
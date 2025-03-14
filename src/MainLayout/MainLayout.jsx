import { Outlet } from "react-router-dom";
import Header from "../Components/Header.jsx";

const MainLayout = () => {

    return (
        <>  
            <div className="w-full h-full flex flex-col bg-[#AEEA94]">
                <Header/>
                <Outlet/>
            </div>
        </>
    )
}

export default MainLayout ;
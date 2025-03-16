import { Outlet } from "react-router-dom";
import Header from "../Components/Header.jsx";

const MainLayout = () => {

    return (
        <>  
            <div className="w-full h-full flex flex-col bg-green-200">
                <Header/>
                <Outlet/>
            </div>
        </>
    )
}

export default MainLayout ;
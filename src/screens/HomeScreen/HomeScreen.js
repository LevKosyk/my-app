import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const HomeScreen = () =>{
    return(
        <div>
            <Navbar />
            <Outlet />
            <h2>Home Page</h2>
        </div>
    )
}

export default HomeScreen;
import { Outlet } from "react-router-dom";
import Navbar from './Navbar'

/*
This is the overall layout that holds other child components
*/
const Layout = () => {
    return (  
        <main  className="App">
            <Navbar/>
            <div className="container1">
                <div className = "content">
                    <Outlet/>
                </div>
            </div>
        </main>
    );
}
 
export default Layout;
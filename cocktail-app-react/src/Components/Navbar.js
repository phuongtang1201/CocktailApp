import DropdownCategory from './DropdownCategory'
import DropdownUser from './DropdownUser';

import {IoMdArrowDropdown} from 'react-icons/io';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../Hooks/useAuth';

/*
Navigation component
*/
const Navbar = () => {
    const [CategoryDropdownClick, setCategoryDropdownClick] = useState(false);
    const [UserDropdownClick, setUserDropdownClick] = useState(false);
    const {auth} = useAuth();

    
    const onMouseEnterCategory= () => {
        setCategoryDropdownClick(true);
    }

    const onMouseLeaveCategory = () => {
        if (window.innerWidth < 960){
            setCategoryDropdownClick(false);
        }else{
            setCategoryDropdownClick(false);
        }
    }

    const onMouseEnterUser=() =>{
        setUserDropdownClick(true);
    }

    const onMouseLeaveUser = () =>{
        if (window.innerWidth < 960){
            setUserDropdownClick(false);
        }else{
            setUserDropdownClick(false);
        }
    }


    return ( 
        <nav className="navbar">
            <h2>
                HeadStrong
            </h2>
            <ul>
                <li className='link'>
                    <Link to = {`/`}>
                        Home
                    </Link>
                </li>
                <li className='link'> <a href = "/about">About</a></li>
                <li onMouseEnter = {onMouseEnterCategory}
                    onMouseLeave = {onMouseLeaveCategory}
                    className='link dropdown' >
                    <a href = "/">
                    Categories <IoMdArrowDropdown/>
                    </a>
                    {CategoryDropdownClick && <DropdownCategory/>}
                </li>

                <li>
                {auth?.email ? (
                    //  <button onClick={logout}>Sign Out</button>
                     <ul>
                        <li onMouseEnter = {onMouseEnterUser}
                            onMouseLeave = {onMouseLeaveUser}
                            className='link dropdown' >
                            <a href = "/">
                            Users <IoMdArrowDropdown/>
                            </a>
                            {UserDropdownClick && <DropdownUser/>}
                        </li>
                     </ul>
                ):(
                    <ul>
                        <li className='link'>
                        <Link to={`/sign-up`}>
                            Sign Up
                        </Link>
                        </li>

                        <li>
                        <Link to={`/sign-in`}>
                            <button className='btn'>Sign In</button>
                        </Link>
                        </li>
                    </ul>
                    
                )}

                </li>
            </ul>
            
            
        </nav>
    );
}
 
export default Navbar;
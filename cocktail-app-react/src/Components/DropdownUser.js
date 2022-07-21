import React, { useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';

import useAuth from '../Hooks/useAuth';
import { signout } from '../Services/CocktailService';

/*
This component displays the dropdown menu for user
*/
const DropdownUser = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const UserItems = [
        {
            title: 'Favorite List',
            path: '/user/favoriteList'
        }
    ]

    const logout = async() =>{
        
        signout()
            .then(response =>{
                if (response?.status === 204){
                    setAuth({});
                    navigate('/');
                }
                else{
                    console.log(JSON.stringify(response));
                }
                
            })
        
    }

    return ( 
        <div>
            <ul onClick={handleClick} className="dropdown-menu"  >
                {UserItems.map((item, index) => {
                    return (
                        <li key = {index}>
                            <Link 
                                to = {item.path} 
                                onClick={() => setClick(false)}>
                                {item.title}
                            </Link>
                           
                        </li>
                    );
                })}
                <li>
                    <button onClick={logout}>Sign Out</button>
                </li>
            </ul>
        </div>
     );
}
 
export default DropdownUser;
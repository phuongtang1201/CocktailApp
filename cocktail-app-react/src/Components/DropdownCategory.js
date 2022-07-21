import React, { useState} from 'react';
import { CategoryItems } from './CategoryItems';


import {Link } from 'react-router-dom';

/*
This component display the dropdown for different categories
*/
const DropdownCategory = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (  
        <div>
            <ul onClick={handleClick} className="dropdown-menu"  >
                {CategoryItems.map((item, index) => {
                    return (
                        <li key = {index}>
                            <Link 
                                className= {item.cName} 
                                to = {item.path} 
                                onClick={() => setClick(false)}>
                                {item.title}
                            </Link>
                           
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
 
export default DropdownCategory;
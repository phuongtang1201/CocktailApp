
import { useEffect, useState } from 'react';
import homeImage from '../Assets/homeImage.webp'
import PopularCocktails from "./PopularCocktails";
import {IoMdArrowDropdown} from 'react-icons/io';
import CocktailList from './CocktailList';
import { getCocktailsByName, getCocktailsByIngredient} from '../Services/CocktailService';
import '../Styles/Home.css'

/*
Home component
*/
const Home = () => {
    
    const [searchValue, setSearchValue] = useState('');
    const[cocktails, setCocktails] = useState([]);
    const[filterType, setFilterType] = useState('By name')

    const [searchDropdownClick, setSearchDropdownClick] = useState(false);

   

    const onMouseSearchDropdown = () =>{
        setSearchDropdownClick(true);
    }
    const onMouseLeaveDropdown = () =>{
        setSearchDropdownClick(false);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        //if search by name
        if(filterType === 'By name'){
            getCocktailsByName(searchValue)
            .then(response=>{
                setCocktails(response);
            })
        }

        else{
            getCocktailsByIngredient(searchValue)
            .then(response =>{
                setCocktails(response)
            })
        }
        
    }

    return (  
        <div className = "Home">
            <div className=" search-area">
                {/*Search field*/}
                <div className="search-field ">
                    <p className='search-area-title'> 
                        Search for cocktails
                    </p>
                    
                    <div onMouseEnter={onMouseSearchDropdown}
                         onMouseLeave = {onMouseLeaveDropdown}>
                        <p className='filter-dropdown'>
                            {filterType} <IoMdArrowDropdown/>
                        </p>
                        {searchDropdownClick &&
                            <div>
                                <ul  className="dropdown-menu"  >
                                    <li>
                                        <button className="home-filter-item" onClick={() => { setFilterType('By name'); onMouseLeaveDropdown()}}>
                                            By name
                                        </button>
                                    </li>
                                    <li>
                                        <button  className="home-filter-item"  onClick={() => {setFilterType('By category'); onMouseLeaveDropdown()}}>
                                            By category
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }   
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* <label htmlFor="useremail">
                                User email:
                        </label> */}
                        <input
                            type="text"
                            // id = "useremail"
                           // ref = {userRef}
                            autoComplete = "off"
                            onChange= {(e) => setSearchValue(e.target.value)}
                            required
                            placeholder={filterType === 'By name' ? 'Ex: margarita' : 'Ex: vodka'}
                            
                        />

                        <button className="general-button">
                            Search
                        </button>
                    </form>
                </div>

                <div className="img-area">
                    <img src = {homeImage} alt ="Home" className="img-home" />
                </div>
            </div>

            {/*show the result of search value*/}
            {cocktails?.length  > 0 &&
                <CocktailList cocktails={cocktails}/>
            }

            {/* if there is not search value, then show popular list*/}
            {(!cocktails || cocktails.length === 0) &&
                <PopularCocktails/>
            }
            
        </div>
        
    );
}
 
export default Home;
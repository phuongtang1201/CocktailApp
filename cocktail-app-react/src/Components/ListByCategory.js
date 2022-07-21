
import { useState, useEffect} from "react";
import { getDrinksByCategory } from "../Services/CocktailService";
import CocktailList from "./CocktailList";

/*
This component will display all cocktails of passed in category
*/
const ListByCategory = (category) => {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() =>{
        console.log("list1");
        getDrinksByCategory(category.category)
        .then(response => {
        setCategoryList(response);
        });
    
    },[category.category])

    return (  
        <div className="list-container">
            <div className = "list-cocktails">
                <h2 className="list-title"> {category.category}</h2>
                <CocktailList cocktails={categoryList}/>
            </div>
        </div>
    );
}
 
export default ListByCategory;
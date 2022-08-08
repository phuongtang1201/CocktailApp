import { useState, useEffect} from "react";
import { getPopularList } from "../Services/CocktailService";
import CocktailList from "./CocktailList";

//Mock data
import {popularItems} from '../Services/MockData'

const PopularCocktails = () => {
    const [cocktails, setCocktails] = useState([]);


    //real API Call
    useEffect(() =>{
        getPopularList().then(response => {
        setCocktails(response);
        });
    },[])

    //Mock data
    // useEffect(()=>{
    //     setCocktails(popularItems);
    // },[])
    
    return ( 
        <div className="list-container">
            <div className = "list-cocktails">
                <h2 className="list-title">Top 20 popular cocktails</h2>
                {/*Show popular list*/}
                {cocktails.length ? (
                    <CocktailList cocktails={cocktails} />
                ) : (
                    <p style={{ marginTop: "2rem" }}>
                        No posts to display.
                    </p>
                )}

            </div>
        </div>
     );
}
 
export default PopularCocktails;

import { useEffect, useState } from "react";
import { getDrinkById } from "../Services/CocktailService";
import CocktailList from "./CocktailList";

import useAuth from '../Hooks/useAuth';
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

/*
This component will display the favorite list of user
*/
const FavoriteList = () => {
    const {auth} = useAuth();

    const [favoriteDrinks, setFavoriteDrinks] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    const location = useLocation();


    /*
    Fetch the favortie list of user
    */
    useEffect(() =>{
       
        let isMounted = true;
        const controller = new AbortController(); //cancel the request if the component is unmounted

        const getFavoriteList = async() =>{
            try{
               // console.log("Try")
                axiosPrivate.get(`/user/${auth?.email}`)
                .then(response =>{
                    if (response){
                        let temp = [];
                        for (let i = 0; i < response.data.favoriteList.length; i++){
                            temp.push(getDrinkById(response.data.favoriteList[i].idDrink))
                        }
                        Promise.all(temp).then(results =>{
                            isMounted && setFavoriteDrinks(results)
                        });
                    }
                })

            }catch(error){
                console.error(error);
                navigate('/sign-in', {state: {from: location}, replace: true})
            }
        }

        getFavoriteList();

        return () =>{
            isMounted = false;
            controller.abort();
        }
    },[])

    /*
        Remove the drink from favorite list
    */
    const removeFromList = (cocktail) =>{
        try{
            
            axiosPrivate.patch(`/removeDrinkForUser`,  {email : auth?.email, idDrink: cocktail.idDrink})
            .then(response =>{
                if (response?.data?.result === "Removed successfully"){
                    let tempArr = [...favoriteDrinks];
                    // setChangeIndicator(changeIndicator + 1);
                    let index = -1;
                    let isFound = tempArr.some((item, idx)=>{
                        if(item.idDrink === cocktail.idDrink){
                            index = idx;
                            return true;
                        }
                        return false;
                    });
                    tempArr.splice(index, 1);
                    setFavoriteDrinks(tempArr)
                    return 'ok';
                }
                else{
                    return 'Drink not in favorite list'
                }
            })

        }catch(error){
            console.error(error);
            return 'Remove failed';
        }
    }

    return ( 

        <div className="list-container">
            <div className = "list-cocktails">
            <h2 className="list-title">Favorite List</h2>
                <div>
                    {favoriteDrinks && <CocktailList cocktails={favoriteDrinks} type ='userFavoriteList' removeFromList = {removeFromList} />}
                </div>
            </div>
        </div>
    );
}
    

 
export default FavoriteList;
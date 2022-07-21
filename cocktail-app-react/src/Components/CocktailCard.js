import { useState , useRef, useEffect} from "react";
import { Link } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

import { Card } from "react-bootstrap";
import '../Styles/CocktailCard.css'

/*
This component will display the card of each cocktail
Parameter:
    cocktail: cocktail object
    type (optional): to specify the type of page, specifically if favorite list
    removeFromList (optional): if this list is favoriteList, then need to pass in removeFromList function
 */
const CocktailCard = ({cocktail, type, removeFromList}) => {
    const msgRef = useRef();
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
   
    const [btnValue, setBtnValue] = useState('')
    
    
    useEffect(()=>{
        if(type && type === 'userFavoriteList'){
            setBtnValue('Remove from List')
        }
        else{
            setBtnValue('Save to List')
        }
    },[])


    /*
        This will save this drink to the favorite list of user
    */
    const saveToList = () =>{

        try{
            
             axiosPrivate.post(`/mapDrinkToUser`,  {email : auth?.email, idDrink: cocktail.idDrink})
             .then(response =>{
                 if (response?.data?.result === "Mapped drink to user successfully"){
                     console.log(response);
                     setBtnValue("Saved")
                 }
                 else{
                    setBtnValue ("Already in list")
                 }
             })

         }catch(error){
             console.error(error);
             setBtnValue("Save failed")
         }

    }

    
    /*
        This will remove the drink from favorite list of user
    */
    const remove = () =>{
        //use the passed in function from parent component FavoriteList
        const res = removeFromList (cocktail);
        if (res !== 'ok'){
            console.log('not ok')
            setBtnValue(res);
        }
    }
    
    return ( 
        
            <Card className = "card">
                <Link to = {`/cocktail/${cocktail.idDrink}`} className="link ">
                {cocktail.strDrinkThumb&&
                <Card.Img src = {cocktail.strDrinkThumb} alt ={cocktail.strDrink} className="img-thumbnail"></Card.Img>}

                <Card.Body className="card-body ">
                    {cocktail.strDrink&&
                    <Card.Title>{cocktail.strDrink}</Card.Title>}

                    {cocktail.strTags &&
                        <Card.Text>{cocktail.strTags}</Card.Text>
                    }

                </Card.Body>
                </Link>
                {/* if this card not belong to FavoriteList, show the "Save to List" button */}
                {auth?.email && type !== 'userFavoriteList' &&
                        
                    <button ref={msgRef}
                            className={btnValue === 'Save to List' ? "general-button cocktail-card-btn" : "disabled-button"}
                            disabled = {btnValue !== 'Save to List'} 
                            onClick = {saveToList}>

                            {btnValue}
                    </button>
                    
                }

                {/* if this card belong to FavoriteList, show the "Remove from List" button */}
                {auth?.email && type === 'userFavoriteList' &&
                    <button className= {btnValue === 'Remove from List' ? "general-button cocktail-card-btn" : "disabled-button"} 
                            disabled = {btnValue !== 'Remove from List'}
                            onClick={remove}>
                        {btnValue}
                    </button>
                }
            </Card>
        
     );
}
 
export default CocktailCard;
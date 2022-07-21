
import { useParams, Link } from "react-router-dom";
import defaultImg from '../Assets/no_image_available.jpeg'
import { useEffect, useState } from "react";
import {getDrinkById} from '../Services/CocktailService';


/*
Display the details of a particular cocktail
*/
const CocktailDetails = () => {
    const { id} = useParams();

    const [cocktail, setCocktail] = useState();

    useEffect(()=>{
        getDrinkById(id)
            .then(response => {
            console.log(response);
            setCocktail(response);
            });
        
    },[])

    console.log(cocktail);

    return (
        <div>
            {cocktail &&
                <div className="cocktail-details">
                    <div className="cocktail-image">
                    
                        {cocktail.strDrinkThumb &&
                            <img src = {cocktail.strDrinkThumb} alt ={cocktail.strDrink} 
                            className="img-thumbnail"/>
                        }
                        {!cocktail.strDrinkThumb &&
                            <img src ={defaultImg} alt = "Default"
                            className="img-thumbnail"/>
                        }
                    </div>
                    <p className="cocktailTitle">{cocktail.strDrink}</p>
                    <div className="cocktailBody">
                        
                        {cocktail.strTags &&
                                <div> 
                                    <p className="cocktail-subtitle"> Brief  </p>
                                    <p>{cocktail.strTags}</p>
                                </div>
                        }

                        <div className="cocktailCategory">
                            <p className="cocktail-subtitle">More details</p>
                            <div>
                                {cocktail.strIBA &&
                                    <p>IBA type: {cocktail.strIBA}</p>
                                }
                                {cocktail.strCategory &&
                                    <p >Category: 
                                        {cocktail.strAlcoholic &&
                                            <span> {cocktail.strAlcoholic} </span>
                                        }
                                        <span>{cocktail.strCategory}</span>
                                    </p>
                                }
                                {cocktail.strVideo &&
                                    <p> Video: 
                                       <a href = {cocktail.strVideo}>
                                            <span> {cocktail.strVideo}</span>
                                        </a>
                                    </p>
                                }
                            </div>

                        </div>

                        <div className="cocktailPrep">
                            <p className="cocktail-subtitle">Prepare</p>
                        </div>
                        <div className="cocktailIngredient">
                            {cocktail.strGlass &&
                                <p>{cocktail.strGlass}</p>
                            }
                            {cocktail.strIngredient1 &&
                                <p>{cocktail.strIngredient1}
                                {cocktail.strMeasure1 &&
                                    <span>: {cocktail.strMeasure1}</span>
                                }
                                </p>
                            }
                            {cocktail.strIngredient2 &&
                                <p>{cocktail.strIngredient2}
                                {cocktail.strMeasure2 &&
                                    <span>: {cocktail.strMeasure2}</span>
                                }
                                </p>
                            }

                            {cocktail.strIngredient3 &&
                                <p>{cocktail.strIngredient3}
                                {cocktail.strMeasure3 &&
                                    <span>: {cocktail.strMeasure3}</span>
                                }
                                </p>
                            }

                            {cocktail.strIngredient4 &&
                                <p>{cocktail.strIngredient4}
                                {cocktail.strMeasure4 &&
                                    <span>: {cocktail.strMeasure4}</span>
                                }
                                </p>
                            }

                            {cocktail.strIngredient5 &&
                                <p>{cocktail.strIngredient5}
                                {cocktail.strMeasure5 &&
                                    <span>: {cocktail.strMeasure5}</span>
                                }
                                </p>
                            }

                            {cocktail.strIngredient6 &&
                                <p>{cocktail.strIngredient6}
                                {cocktail.strMeasure6 &&
                                    <span>: {cocktail.strMeasure6}</span>
                                }
                                </p>
                            } 

                            {cocktail.strIngredient7 &&
                                <p>{cocktail.strIngredient7}
                                {cocktail.strMeasure7 &&
                                    <span>: {cocktail.strMeasure7}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient8 &&
                                <p>{cocktail.strIngredient8}
                                {cocktail.strMeasure8 &&
                                    <span>: {cocktail.strMeasure8}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient9 &&
                                <p>{cocktail.strIngredient9}
                                {cocktail.strMeasure9 &&
                                    <span>: {cocktail.strMeasure9}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient10 &&
                                <p>{cocktail.strIngredient10}
                                {cocktail.strMeasure10 &&
                                    <span>: {cocktail.strMeasure10}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient11 &&
                                <p>{cocktail.strIngredient11}
                                {cocktail.strMeasure11 &&
                                    <span>: {cocktail.strMeasure11}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient12 &&
                                <p>{cocktail.strIngredient12}
                                {cocktail.strMeasure12 &&
                                    <span>: {cocktail.strMeasure12}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient13 &&
                                <p>{cocktail.strIngredient13}
                                {cocktail.strMeasure13 &&
                                    <span>: {cocktail.strMeasure13}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient14 &&
                                <p>{cocktail.strIngredient14}
                                {cocktail.strMeasure14 &&
                                    <span>: {cocktail.strMeasure14}</span>
                                }
                                </p>
                            }  

                            {cocktail.strIngredient15 &&
                                <p>{cocktail.strIngredient15}
                                {cocktail.strMeasure15 &&
                                    <span>: {cocktail.strMeasure15}</span>
                                }
                                </p>
                            }    
                        </div>

                        <div className="cocktailIntruction">   
                            {cocktail.strInstructions &&
                                <div>
                                    <p className="cocktail-subtitle">Instructions</p>
                                    <p>{cocktail.strInstructions}</p>
                                </div>
                            }

                        </div>

                        
                    </div>

                    
                </div>
            }
        </div>
        
    );
}
 
export default CocktailDetails;
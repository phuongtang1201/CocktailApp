import CocktailCard from "./CocktailCard";

/*
This component will display the list of cocktails
Parameter:
    cocktails: list of cocktails
    type (optional): to specify the type of page, specifically if favorite list
    removeFromList (optional): if this list is favoriteList, then need to pass in removeFromList function
 */
const CocktailList = ({cocktails, type, removeFromList}) => {
    // array of N elements, where N is the number of rows needed
    const rows = [...Array(Math.ceil(cocktails.length/4))];

    // chunk the products into the array of rows
    const productRows = rows.map((row, idx)=> cocktails.slice(idx*4, idx*4+4))

    // map the rows as div.row
    const content = productRows.map((row, idx) =>(
        <div className="row cocktail-list-row" key = {idx}>
            {row.map((cocktail,idx) => 
                <article key={idx} className="col-md-3"  >
                    <CocktailCard key = {cocktail.idDrink} cocktail={cocktail} type={type} removeFromList = {removeFromList} ></CocktailCard>
                </article>)}
        </div>
    ))

   
    return (  
        <div className="cocktail-list">
            {content}
        </div>
    );
}
 
export default CocktailList;
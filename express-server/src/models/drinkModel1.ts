import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IdrinkModel1} from '../interfaces/IdrinkModel1'
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class drinkModel{
    public schema: any;
    public model: any;

    public constructor(){
        this.createSchema();
        this.createModel();
    }
    public createSchema(): void{
        this.schema = new Mongoose.Schema(
            {
                idDrink: {
                    type: String,
                    required: true
                },
                strDrink: {
                    type: String,
                    required: true
                },
                strDrinkAlternate: String,
                strTags: String,
                stVideo: String,
                strCategory: String,
                strIBA: String,
                strAlcoholic: String,
                strGlass: String,
                strInstructions: String,
                strInstructionsES: String,
                strInstructionsDE: String,
                strInstructionsFR: String,
                strInstructionsIT: String,
                strDrinkThumb: String,
                strIngredient1: String,
                strIngredient2: String,
                strIngredient3: String,
                strIngredient4: String,
                strIngredient5: String,
                strIngredient6: String,
                strIngredient7: String,
                strIngredient8: String,
                strIngredient9: String,
                strIngredient10: String,
                strIngredient11: String,
                strIngredient12: String,
                strIngredient13: String,
                strIngredient14: String,
                strIngredient15: String,
                strMeasure1: String,
                strMeasure2: String,
                strMeasure3: String,
                strMeasure4: String,
                strMeasure5: String,
                strMeasure6: String,
                strMeasure7: String,
                strMeasure8: String,
                strMeasure9: String,
                strMeasure10: String,
                strMeasure11: String,
                strMeasure12: String,
                strMeasure13: String,
                strMeasure14: String,
                strMeasure15: String,
                strImageSource: String,
                strImageAttribution: String,
                strCreativeCommonsConfirmed: String,
                dateModified: String
            }
        );

    }

    public createModel(): void{
        this.model = mongooseConnection.model<IdrinkModel1>("Drink1", this.schema);
    }
    public retrieveAllDrinks(res:any): any {
        var findResult = this.model.find({});
        console.log('list of drinks fetched: ');
        findResult.exec( (err, resultArray) => {
            console.log(resultArray);
            res.json(resultArray);
        });
    }
}
export{drinkModel}
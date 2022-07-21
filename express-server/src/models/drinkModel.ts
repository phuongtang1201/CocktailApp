import Mongoose = require("mongoose");
import {DataAccess} from '../DataAccess';
import {IdrinkModel} from '../interfaces/IdrinkModel'
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
                    required: true, 
                    unique: true
                }
            }
        );

    }

    public createModel(): void{
        this.model = mongooseConnection.model<IdrinkModel>("Drink", this.schema);
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
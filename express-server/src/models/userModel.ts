import Mongoose = require("mongoose");
import {DataAccess} from './../DataAccess'
import {IuserModel} from '../interfaces/IuserModel'

//var { nanoid } = require("nanoid");
import{nanoid} from 'nanoid';


let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;
class userModel{
    public schema: any;
    public model: any;
    constructor(){
        this.createSchema();
        this.createModel();
    }
    public createSchema() : void{
        this.schema = new Mongoose.Schema({
            userId:{
                type: String,
                reqired: true,
                default: () => nanoid(),
                index: {unique: true}
            },
            userPassword: {
                type: String,
                require: true
            },
            fname: {
                type: String,
                required: true
            },
            lname: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            favoriteList: [
                {
                    idDrink: String
                }
            ],
            refreshToken: String
        });
        
    }

    public createModel(): void{
        this.model = mongooseConnection.model<IuserModel>("User", this.schema);
    }

    public retrieveAllUsers(res:any): any {
        var findResult = this.model.find({}).populate("favoriteList")
        console.log('list of users fetched: ');
        findResult.exec( (err, userArray) => {
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveUserByUserId(res:any, filter: Object) {
        var findResult = this.model.findOne(filter).populate("favoriteList");
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid user Id'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }

    public retrieveUserByUserEmail(res:any, filter: Object) {
        var findResult = this.model.findOne(filter).populate("favoriteList");
        findResult.exec( (err, userArray) => {
            if (err) {
                res.status(500).send({error: 'enter a valid user email'})
            }
            console.log(userArray);
            res.json(userArray);
        });
    }

    // public returnUserByUserEmail(filter: Object) :any {
    //     console.log("return User by user email ")
    //     var findResult = this.model.findOne(filter).populate("favoriteList");
    //     findResult.exec( async (err, userArray) => {
    //         if (err) {
    //             // res.status(500).send({error: 'enter a valid user email'})
    //             return err;
    //         }
    //         console.log(userArray);
    //         // res.json(userArray);
    //         return await userArray;
    //     });
    // }

}
export{userModel}
"use strict";
exports.__esModule = true;
exports.drinkModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var drinkModel = /** @class */ (function () {
    function drinkModel() {
        this.createSchema();
        this.createModel();
    }
    drinkModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
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
        });
    };
    drinkModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Drink1", this.schema);
    };
    drinkModel.prototype.retrieveAllDrinks = function (res) {
        var findResult = this.model.find({});
        console.log('list of drinks fetched: ');
        findResult.exec(function (err, resultArray) {
            console.log(resultArray);
            res.json(resultArray);
        });
    };
    return drinkModel;
}());
exports.drinkModel = drinkModel;

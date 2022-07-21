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
                required: true,
                unique: true
            }
        });
    };
    drinkModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("Drink", this.schema);
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

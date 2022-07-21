"use strict";
exports.__esModule = true;
exports.userModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
//var { nanoid } = require("nanoid");
var nanoid_1 = require("nanoid");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var userModel = /** @class */ (function () {
    function userModel() {
        this.createSchema();
        this.createModel();
    }
    userModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userId: {
                type: String,
                reqired: true,
                "default": function () { return (0, nanoid_1.nanoid)(); },
                index: { unique: true }
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
    };
    userModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("User", this.schema);
    };
    userModel.prototype.retrieveAllUsers = function (res) {
        var findResult = this.model.find({}).populate("favoriteList");
        console.log('list of users fetched: ');
        findResult.exec(function (err, userArray) {
            console.log(userArray);
            res.json(userArray);
        });
    };
    userModel.prototype.retrieveUserByUserId = function (res, filter) {
        var findResult = this.model.findOne(filter).populate("favoriteList");
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid user Id' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    userModel.prototype.retrieveUserByUserEmail = function (res, filter) {
        var findResult = this.model.findOne(filter).populate("favoriteList");
        findResult.exec(function (err, userArray) {
            if (err) {
                res.status(500).send({ error: 'enter a valid user email' });
            }
            console.log(userArray);
            res.json(userArray);
        });
    };
    return userModel;
}());
exports.userModel = userModel;

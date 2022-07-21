"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.App = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var drinkModel_1 = require("./models/drinkModel");
var userModel_1 = require("./models/userModel");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();
var verifyJWT = require('./Middleware/verifyJWT');
var cookieParser = require('cookie-parser');
//var expressSession = require('express-session');
var App = /** @class */ (function () {
    function App() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Users = new userModel_1.userModel();
        this.Drinks = new drinkModel_1.drinkModel();
    }
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        //This will allow CORS permission for localhost:3000
        this.expressApp.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        //get all users
        router.route('/users').get(verifyJWT, function (req, res) {
            _this.Users.retrieveAllUsers(res);
        });
        //create a new user
        router.post('/createUser', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, userPassword, fname, lname, hashedPwd, user, userList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, userPassword = _a.userPassword, fname = _a.fname, lname = _a.lname;
                        if (!email || !userPassword || !fname || !lname)
                            return [2 /*return*/, res.status(400).json({ 'message': 'Email, password, first name or lname are required.' })];
                        return [4 /*yield*/, bcrypt.hash(userPassword, 10)];
                    case 1:
                        hashedPwd = _b.sent();
                        user = { "email": email, "userPassword": hashedPwd, "fname": fname, "lname": lname };
                        userList = new this.Users.model(user);
                        console.log(user);
                        userList.save().then(function () {
                            console.log("1" + userList);
                            res.status(200);
                            res.json({ 'message': "New user " + email + " created." });
                        })["catch"](function (error) {
                            var _a;
                            res.status(400);
                            res.json({ 'message': ((_a = error === null || error === void 0 ? void 0 : error.keyValue) === null || _a === void 0 ? void 0 : _a.email) + ' already exists.' });
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        //handle log in
        router.post('/auth', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, userPassword, foundUser, match, accessToken, refreshToken, updatedUser, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, userPassword = _a.userPassword;
                        if (!email || !userPassword)
                            return [2 /*return*/, res.status(400).json({ 'message': 'Email, password are required.' })];
                        return [4 /*yield*/, this.Users.model.findOne({ email: email })];
                    case 1:
                        foundUser = _b.sent();
                        if (!foundUser)
                            return [2 /*return*/, res.sendStatus(401)
                                //Evaluate password
                            ]; // unauthorized error code
                        return [4 /*yield*/, bcrypt.compare(userPassword, foundUser.userPassword)
                            //if match, create token
                        ];
                    case 2:
                        match = _b.sent();
                        if (!match) return [3 /*break*/, 7];
                        accessToken = jwt.sign({ "email": foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                        refreshToken = jwt.sign({ "email": foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.Users.model.update({ userId: foundUser.userId }, { $set: { "refreshToken": refreshToken } }, { "new": true, runValidators: true })];
                    case 4:
                        updatedUser = _b.sent();
                        if (!updatedUser) {
                            console.log("not updated User");
                            return [2 /*return*/, res.status(404).send()];
                        }
                        //set max age of cookie = 1 day ( 24hrs * 60mins * 60secs * 1000millisecs)
                        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                        res.json({ accessToken: accessToken });
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        console.log(e_1);
                        res.status(400).send(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.sendStatus(401);
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        //handle refresh token
        router.get('/refresh', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cookies, refreshToken, foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cookies = req.cookies;
                        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
                            return [2 /*return*/, res.sendStatus(401)];
                        ;
                        console.log(cookies.jwt);
                        refreshToken = cookies.jwt;
                        return [4 /*yield*/, this.Users.model.findOne({ refreshToken: refreshToken })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser)
                            return [2 /*return*/, res.sendStatus(403)
                                //Evaluate jwt
                            ]; //forbidden 
                        //Evaluate jwt
                        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
                            if (err || foundUser.email !== decoded.email)
                                return res.sendStatus(403);
                            var accessToken = jwt.sign({ "email": decoded.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
                            res.json({ accessToken: accessToken });
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        //handle log out
        router.get('/logout', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var cookies, refreshToken, foundUser, updatedUser, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cookies = req.cookies;
                        console.log("cookies " + JSON.stringify(cookies));
                        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
                            return [2 /*return*/, res.status(204)]; //Successful request but send no content
                        refreshToken = cookies.jwt;
                        return [4 /*yield*/, this.Users.model.findOne({ refreshToken: refreshToken })];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            //clear the cookie
                            res.clearCookie('jwt', { httpOnly: true });
                            return [2 /*return*/, res.sendStatus(204)];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.Users.model.update({ userId: foundUser.userId }, { $set: { "refreshToken": '' } }, { "new": true, runValidators: true })];
                    case 3:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            console.log("not updated User");
                            return [2 /*return*/, res.status(404).send()];
                        }
                        res.clearCookie('jwt', { httpOnly: true }); //secure: true - only serves on https
                        console.log("remove refresh token succefully");
                        res.sendStatus(204);
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        console.log(e_2);
                        res.status(400).send(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        //Update user by firstname
        router.patch('/users/userId/:userId/:firstName', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var firstName, userId, updatedUser, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        firstName = req.params.firstName;
                        userId = req.params.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Users.model.update({ userId: userId }, { $set: { "fname": firstName } }, { "new": true, runValidators: true })];
                    case 2:
                        updatedUser = _a.sent();
                        if (!updatedUser) {
                            return [2 /*return*/, res.status(404).send()];
                        }
                        console.log(updatedUser);
                        res.status(200).send(updatedUser);
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        res.status(400).send(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        //Get a single user by user id
        router.route('/users/userId/:userId').get(verifyJWT, function (req, res) {
            var userId = req.params.userId;
            console.log('Getting a user withs userId: ' + userId);
            _this.Users.retrieveUserByUserId(res, { userId: userId });
        });
        //get a single user by user email
        router.route('/user/:email').get(verifyJWT, function (req, res) {
            // var email = req.body.email;
            var email = req.params.email;
            console.log('Getting a user with email: ' + email);
            _this.Users.retrieveUserByUserId(res, { email: email });
        });
        //get all drinks
        router.get('/drinks', function (req, res) {
            _this.Drinks.retrieveAllDrinks(res);
        });
        //create a new drink
        router.post('/createDrink', function (req, res) {
            var drink = req.body;
            var drinkList = new _this.Drinks.model(drink);
            drinkList.save().then(function () {
                console.log(drinkList);
                res.send(drinkList);
            })["catch"](function (error) {
                res.status(400);
                res.send(error);
            });
        });
        //map drink to user
        // router.post('/mapDrinkToUser1', async (req,res) =>{
        //     let {userObjId, drinkObjId} = req.body;
        //     let user = await this.Users.model.findById(userObjId);
        //     console.log("retriev user " + user);
        //     let drink = await this.Drinks.model.findById(drinkObjId);
        //     user.favoriteList = [...user.favoriteList, drink]
        //     try{
        //         await this.Users.model.findByIdAndUpdate({_id: userObjId}, user, {new: true, runValidators: true});
        //         res.status(200).json( {
        //             "result"  : "Mapped drink to user successfully"
        //         })
        //     } catch(e){
        //         res.status(400).send(e);
        //     }
        // });
        //map drink idDrink to user email
        router.route('/mapDrinkToUser').post(verifyJWT, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, idDrink, user, isFound, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, idDrink = _a.idDrink;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.Users.model.findOne({ email: email }).populate("favoriteList")];
                    case 2:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        res.status(400).json({
                            "result": "User does not exist."
                        });
                        return [3 /*break*/, 6];
                    case 3:
                        console.log("Find result " + user);
                        isFound = user.favoriteList.some(function (element) {
                            if (element.idDrink === idDrink) {
                                return true;
                            }
                            return false;
                        });
                        if (!!isFound) return [3 /*break*/, 5];
                        user.favoriteList.push({ idDrink: idDrink });
                        console.log(user.favoriteList);
                        return [4 /*yield*/, this.Users.model.updateOne({ email: email }, user, { "new": true, runValidators: true })];
                    case 4:
                        _b.sent();
                        res.status(200).json({
                            "result": "Mapped drink to user successfully"
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(200).json({
                            "result": "Drink in list already"
                        });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        res.status(400).send(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        // remove idDrink from favoritelist of a user email
        router.patch('/removeDrinkForUser', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, idDrink, user, index_1, isFound, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, idDrink = _a.idDrink;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.Users.model.findOne({ email: email }).populate("favoriteList")];
                    case 2:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        res.status(400).json({
                            "result": "User does not exist."
                        });
                        return [3 /*break*/, 6];
                    case 3:
                        index_1 = -1;
                        isFound = user.favoriteList.some(function (element, i) {
                            if (element.idDrink === idDrink) {
                                index_1 = i;
                                return true;
                            }
                            return false;
                        });
                        if (!(index_1 > -1)) return [3 /*break*/, 5];
                        user.favoriteList.splice(index_1, 1);
                        return [4 /*yield*/, this.Users.model.updateOne({ email: email }, user, { "new": true, runValidators: true })];
                    case 4:
                        _b.sent();
                        res.status(200).json({
                            "result": "Removed successfully"
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(200).json({
                            "result": "Drink not in favorite list"
                        });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _b.sent();
                        res.status(400).send(error_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); });
        // Wiil delete if never use: remove drink for favoriteList of user
        router.patch('/user/removeDrink1', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a, userObjId, drinkObjId, user, index, e_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userObjId = _a.userObjId, drinkObjId = _a.drinkObjId;
                        return [4 /*yield*/, this.Users.model.findById(userObjId)];
                    case 1:
                        user = _b.sent();
                        index = user.favoriteList.indexOf(drinkObjId);
                        if (index > -1) {
                            user.favoriteList.splice(index, 1);
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.Users.model.findByIdAndUpdate({ _id: userObjId }, user, { "new": true, runValidators: true })];
                    case 3:
                        _b.sent();
                        res.status(200).json({
                            "result": "Removed drink from favorite list of user successfully"
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _b.sent();
                        res.status(400).send(e_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    };
    return App;
}());
exports.App = App;

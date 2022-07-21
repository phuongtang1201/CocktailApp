import * as express from 'express';
import * as bodyParser from 'body-parser';
import {drinkModel} from './models/drinkModel';
import {userModel} from './models/userModel'
import { toNamespacedPath } from 'path';

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const dotenv =require('dotenv')
dotenv.config();

const verifyJWT = require ('./Middleware/verifyJWT');
const cookieParser = require ('cookie-parser')

//var expressSession = require('express-session');
class App{
    public expressApp: express.Application;
    public Drinks: drinkModel;
    public Users: userModel;

    constructor(){
        this.expressApp = express();
        this.middleware();
        this.routes();

        this.Users = new userModel();
        this.Drinks = new drinkModel();

    }

    private middleware(): void{
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({extended: false}));

        this.expressApp.use(cookieParser())

        //This will allow CORS permission for localhost:3000
        this.expressApp.use(function(req, res, next){
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header('Access-Control-Allow-Credentials', "true");
            next();
        });
    }

    private routes(): void{
        let router = express.Router();
       
        //get all users
        router.route('/users').get(verifyJWT, (req,res) =>{
            this.Users.retrieveAllUsers(res);
        });

        //create a new user
        router.post('/createUser', async (req, res) =>{
            const {email, userPassword,fname, lname} = req.body;
            
            if(!email || !userPassword || !fname || !lname) 
                return res.status(400).json({'message': 'Email, password, first name or lname are required.'});

            const hashedPwd = await bcrypt.hash(userPassword, 10);
            //store the new user;
            const user = {"email": email, "userPassword" : hashedPwd, "fname": fname, "lname": lname}
            let userList = new this.Users.model(user);
            console.log(user);
            userList.save().then(() =>{
                console.log("1"+ userList);
                res.status(200);
                res.json({'message' : "New user " + email + " created."});
            }).catch((error) =>{
                res.status(400);
                res.json({'message' : error?.keyValue?.email + ' already exists.'})
            })

        });

        //handle log in
        router.post ('/auth', async(req, res) =>{
            const {email, userPassword} = req.body;
            if(!email || !userPassword) 
                return res.status(400).json({'message': 'Email, password are required.'});

            const foundUser = await this.Users.model.findOne({email: email});
            if(!foundUser)
                return res.sendStatus(401) // unauthorized error code

            //Evaluate password
            const match = await bcrypt.compare(userPassword, foundUser.userPassword)

            //if match, create token
            if(match){
                
                //create JWTs
                const accessToken = jwt.sign(
                    {"email": foundUser.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'30s'}
                );

                //Create refresh token
                const refreshToken = jwt.sign(
                    {"email": foundUser.email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn:'1d'}
                );

                try{
                    const updatedUser = await this.Users.model.update({userId: foundUser.userId}, {$set: {"refreshToken" : refreshToken}}, { new: true, runValidators: true})
                    if (!updatedUser) {
                        console.log("not updated User");
                        return res.status(404).send()                
                    }

                    //set max age of cookie = 1 day ( 24hrs * 60mins * 60secs * 1000millisecs)
                    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
                    res.json({accessToken});
                }catch(e){
                    console.log(e);
                    res.status(400).send(e);
                }  
            }
            else
                res.sendStatus(401);
        })

        //handle refresh token
        router.get ('/refresh', async (req, res) =>{
            const cookies = req.cookies;

            if(!cookies?.jwt) 
                return res.sendStatus(401);;

            console.log(cookies.jwt);
            const refreshToken = cookies.jwt;

            const foundUser = await this.Users.model.findOne({refreshToken: refreshToken});

            if(!foundUser)
                return res.sendStatus(403) //forbidden 

            //Evaluate jwt
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) =>{
                    if(err || foundUser.email !== decoded.email)
                        return res.sendStatus(403);
                    const accessToken = jwt.sign(
                        {"email": decoded.email },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: '30s'}
                    );
                    res.json({accessToken});
                }
            )
            
        })

        //handle log out
        router.get ('/logout', async (req, res) =>{
            //on client, also delete the accessToken

            const cookies = req.cookies;
            console.log("cookies " + JSON.stringify(cookies))

            if(!cookies?.jwt) 
                return res.status(204); //Successful request but send no content

            const refreshToken = cookies.jwt;

            //Is refreshToken in db?
            const foundUser = await this.Users.model.findOne({refreshToken: refreshToken});

            if(!foundUser){
                //clear the cookie
                res.clearCookie('jwt', {httpOnly: true})
                return res.sendStatus(204) 
            }
            
            //delete the refreshToken of that foundUser in db
            try{
                const updatedUser = await this.Users.model.update({userId: foundUser.userId}, {$set: {"refreshToken" : ''}}, { new: true, runValidators: true})
                if (!updatedUser) {
                    console.log("not updated User");
                    return res.status(404).send()                
                }
                res.clearCookie('jwt', {httpOnly: true}); //secure: true - only serves on https
                console.log("remove refresh token succefully")
                res.sendStatus(204);
            }catch(e){
                console.log(e);
                res.status(400).send(e);
            }  
        })


        //Update user by firstname
        router.patch('/users/userId/:userId/:firstName', async(req,res)=>{
            var firstName = req.params.firstName;
            var userId = req.params.userId;
            try{
                const updatedUser = await this.Users.model.update({userId: userId}, {$set: {"fname" : firstName}}, { new: true, runValidators: true})
                if (!updatedUser) {
                    return res.status(404).send()                
                }
                console.log(updatedUser)
                res.status(200).send(updatedUser)
            }catch(e) {
                console.log(e)
                res.status(400).send(e);
            }
            
        })

        //Get a single user by user id
        router.route('/users/userId/:userId').get(verifyJWT, (req, res) => {
            var userId = req.params.userId;
            console.log('Getting a user withs userId: ' + userId);
            this.Users.retrieveUserByUserId(res, {userId: userId});
        });

        //get a single user by user email
        router.route('/user/:email').get(verifyJWT, (req,res)=>{
            // var email = req.body.email;
            var email = req.params.email;
            console.log('Getting a user with email: ' + email);
            this.Users.retrieveUserByUserId(res, {email: email});
        })

        //get all drinks
        router.get('/drinks', (req, res) =>{
            this.Drinks.retrieveAllDrinks(res);
        })

        //create a new drink
        router.post('/createDrink', (req, res) =>{
            var drink = req.body;
            let drinkList = new this.Drinks.model(drink);
            drinkList.save().then(() =>{
                console.log(drinkList);
                res.send(drinkList);
            }).catch((error) =>{
                res.status(400);
                res.send(error);
            })
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
        router.route('/mapDrinkToUser').post(verifyJWT, async (req,res) =>{
            let {email, idDrink} = req.body;
            let user;
                try{
                    user = await this.Users.model.findOne({email: email}).populate("favoriteList");
                    if(!user){
                        res.status(400).json({
                            "result": "User does not exist."
                        })
                    }
                    
                    else{
                    console.log("Find result " + user)
                    const isFound = user.favoriteList.some(element =>{
                        if(element.idDrink === idDrink){
                            return true
                        }
                        return false;
                    });

                    if (!isFound){
                        user.favoriteList.push({idDrink: idDrink});
                        console.log(user.favoriteList)
                        await this.Users.model.updateOne({email: email}, user, {new: true, runValidators: true})
                        res.status(200).json( {
                            "result"  : "Mapped drink to user successfully"
                        })
                    }
                    else{
                        res.status(200).json( {
                            "result"  : "Drink in list already"
                        })
                    }
                }
                    
                }catch(error){
                    res.status(400).send(error);
                }
        });

        // remove idDrink from favoritelist of a user email
        router.patch('/removeDrinkForUser', async (req,res) =>{
            let {email, idDrink} = req.body;
            let user;
                try{
                    user = await this.Users.model.findOne({email: email}).populate("favoriteList");
                    if(!user){
                        res.status(400).json({
                            "result": "User does not exist."
                        })
                    }
                    
                    else{
                    let index = -1;
                    const isFound = user.favoriteList.some((element, i) =>{
                        if(element.idDrink === idDrink){
                            index = i;
                            return true;
                        }
                        return false;
                    })

                    if (index > -1) {
                        user.favoriteList.splice(index, 1); 
                        await this.Users.model.updateOne({email: email}, user, {new: true, runValidators: true})
                        res.status(200).json( {
                            "result"  : "Removed successfully"
                        })
                    }
                    else{
                        res.status(200).json( {
                            "result"  : "Drink not in favorite list"
                        })
                    }
                }
                    
                }catch(error){
                    res.status(400).send(error);
                }
        });
        

        // Wiil delete if never use: remove drink for favoriteList of user
        router.patch('/user/removeDrink1', async (req,res) =>{
            let {userObjId, drinkObjId} = req.body;
            let user = await this.Users.model.findById(userObjId);

            const index = user.favoriteList.indexOf(drinkObjId);
            if (index > -1) {
                user.favoriteList.splice(index, 1); 
            }

            try{
                await this.Users.model.findByIdAndUpdate({_id: userObjId}, user, {new: true, runValidators: true});
                res.status(200).json( {
                    "result"  : "Removed drink from favorite list of user successfully"
                })
            } catch(e){
                res.status(400).send(e);
            }
        });



        
        
        this.expressApp.use('/', router);
        this.expressApp.use('/', express.static("../public"));
    }
}

export{App};

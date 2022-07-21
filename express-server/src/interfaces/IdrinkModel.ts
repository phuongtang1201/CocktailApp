
import Mongoose = require ("mongoose");

interface IdrinkModel extends Mongoose.Document{
    idDrink: string;
}
export {IdrinkModel};
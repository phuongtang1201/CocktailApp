db = db.getSiblingDB('cocktail-app')

//drinks data
db.createCollection('drinks');
drinksCollection = db.getCollection("drinks");
drinksCollection.remove({});
drinksCollection.insert(
    {
        idDrink: "1",
        
    }
)

drinksCollection.insert(
    {
        idDrink: "2",
        
    }
)

drinksCollection.insert(
    {
        idDrink: "3",
        
    }
)

//users data
db.createCollection('users');
usersCollection = db.getCollection ("users");
usersCollection.remove({})

usersCollection.insert(
    {
        userId: "U1",
        fname: "Jenny",
        lname: "Dan",
        email: "jdan@gmail.com",
        favoriteList: []
    }
)

usersCollection.insert(
    {
        userId: "U2",
        fname: "David",
        lname: "John",
        email: "jdavid@gmail.com",
        favoriteList: []
    }
)
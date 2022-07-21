db = db.getSiblingDB('cocktail-app')

//drinks data
db.createCollection('drinks');
drinksCollection = db.getCollection("drinks");
drinksCollection.remove({});
drinksCollection.insert(
    {
        idDrink: "1",
        strDrink: "Mojito",
        strDrinkAlternate: null,
        strTags: "IBA,ContemporaryClassic,Alcoholic,USA,Asia,Vegan,Citrus,Brunch,Hangover,Mild",
        strVideo: null,
        strCategory: "Cocktail",
        strIBA: "Contemporary Classics",
        strAlcoholic: "Alcoholic",
        strGlass: "Highball glass",
        strInstructions: "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.",
        strInstructionsES: null,
        strInstructionsDE: "Minzblätter mit Zucker und Limettensaft verrühren. Füge einen Spritzer Sodawasser hinzu und fülle das Glas mit gebrochenem Eis. Den Rum eingießen und mit Sodawasser übergießen. Garnieren und mit einem Strohhalm servieren.",
        strInstructionsFR: null,
        strInstructionsIT: "Pestare le foglie di menta con lo zucchero e il succo di lime.\r\nAggiungere una spruzzata di acqua di seltz e riempi il bicchiere con ghiaccio tritato.\r\nVersare il rum e riempire con acqua di seltz.\r\nGuarnire con una fetta di lime, servire con una cannuccia.",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
        strIngredient1: "Light rum",
        strIngredient2: "Lime",
        strIngredient3: "Sugar",
        strIngredient4: "Mint",
        strIngredient5: "Soda water",
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "2-3 oz ",
        strMeasure2: "Juice of 1 ",
        strMeasure3: "2 tsp ",
        strMeasure4: "2-4 ",
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: "https://pixabay.com/photos/cocktail-mojito-cocktail-recipe-5096281/",
        strImageAttribution: "anilaha https://pixabay.com/users/anilaha-16242978/",
        strCreativeCommonsConfirmed: "Yes",
        dateModified: "2016-11-04 09:17:09"
    }
)

drinksCollection.insert(
    {
        idDrink: "2",
        strDrink: "Old Fashioned1",
        strDrinkAlternate: null,
        strTags: "IBA,ContemporaryClassic,Alcoholic,USA,Asia,Vegan,Citrus,Brunch,Hangover,Mild",
        strVideo: null,
        strCategory: "Cocktail",
        strIBA: "Contemporary Classics",
        strAlcoholic: "Alcoholic",
        strGlass: "Highball glass",
        strInstructions: "Muddle mint leaves with sugar and lime juice. Add a splash of soda water and fill the glass with cracked ice. Pour the rum and top with soda water. Garnish and serve with straw.",
        strInstructionsES: null,
        strInstructionsDE: "Minzblätter mit Zucker und Limettensaft verrühren. Füge einen Spritzer Sodawasser hinzu und fülle das Glas mit gebrochenem Eis. Den Rum eingießen und mit Sodawasser übergießen. Garnieren und mit einem Strohhalm servieren.",
        strInstructionsFR: null,
        strInstructionsIT: "Pestare le foglie di menta con lo zucchero e il succo di lime.\r\nAggiungere una spruzzata di acqua di seltz e riempi il bicchiere con ghiaccio tritato.\r\nVersare il rum e riempire con acqua di seltz.\r\nGuarnire con una fetta di lime, servire con una cannuccia.",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
        strIngredient1: "Light rum",
        strIngredient2: "Lime",
        strIngredient3: "Sugar",
        strIngredient4: "Mint",
        strIngredient5: "Soda water",
        strIngredient6: null,
        strIngredient7: null,
        strIngredient8: null,
        strIngredient9: null,
        strIngredient10: null,
        strIngredient11: null,
        strIngredient12: null,
        strIngredient13: null,
        strIngredient14: null,
        strIngredient15: null,
        strMeasure1: "2-3 oz ",
        strMeasure2: "Juice of 1 ",
        strMeasure3: "2 tsp ",
        strMeasure4: "2-4 ",
        strMeasure5: null,
        strMeasure6: null,
        strMeasure7: null,
        strMeasure8: null,
        strMeasure9: null,
        strMeasure10: null,
        strMeasure11: null,
        strMeasure12: null,
        strMeasure13: null,
        strMeasure14: null,
        strMeasure15: null,
        strImageSource: "https://pixabay.com/photos/cocktail-mojito-cocktail-recipe-5096281/",
        strImageAttribution: "anilaha https://pixabay.com/users/anilaha-16242978/",
        strCreativeCommonsConfirmed: "Yes",
        dateModified: "2016-11-04 09:17:09"
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
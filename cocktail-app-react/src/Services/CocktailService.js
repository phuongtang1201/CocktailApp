import Axios from 'axios';



let cancelToken;
let headersRapid = {
    'X-RapidAPI-Key': 'c12aa0d3d3msh82407f8b3e921eep10f584jsn9d4abc098880',
    'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
}
export async function getPopularList(){
    
    //console.log("Get all cocktails");
    const options = {
        method: 'GET',
        url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
        headers: headersRapid
    };
    
    if(typeof cancelToken != typeof undefined){
        cancelToken.cancel("Canceling the previous req");
    }
    cancelToken = Axios.CancelToken.source();

    try {
        const response = await Axios(options, {cancelToken: cancelToken.token});
        return await response.data.drinks;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return [];
    }
}

export async function getDrinksByCategory(category){
    console.log("category type " +  category)
    const options = {
        method: 'GET',
        url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
        params: {c: category},
        headers: headersRapid
    };

    try {
        const response = await Axios(options);
        return await response.data.drinks;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return [];
    }
}

export async function getDrinkById (id){
    
    const options = {
        method: 'GET',
        url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
        params: {i: id},
        headers: headersRapid
    };

    try {
        const response = await Axios(options);
        if (response.data && response.data.drinks && response.data.drinks.length>0){
            return await response.data?.drinks[0];
        }
        return await response;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return [];
    }
}

export async function getCocktailsByName(name){
    const options = {
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
        params: {s: name}
    };

    try {
        const response = await Axios(options);
        if (response.data && response.data.drinks && response.data.drinks.length>0){
            return await response.data?.drinks;
        }
        return await response;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return [];
    }
}

export async function getCocktailsByIngredient(igr){
    const options = {
        method: 'GET',
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
        params: {i: igr}
    };

    try {
        const response = await Axios(options);
        if (response.data && response.data.drinks && response.data.drinks.length>0){
            return await response.data?.drinks;
        }
        return await response;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return [];
    }
}


export async function getUserByUserId(userId){
    const options = {
        method: 'GET',
        url: `/users/userId/${userId}`,
        headers : {
            'Content-type' : 'application/json'
        }
    };

    // if(typeof cancelToken != typeof undefined){
    //     cancelToken.cancel("Canceling the previous req");
    // }
    // cancelToken = Axios.CancelToken.source();

    try {
        const response = await Axios(options);
        return await response.data;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return [];
    }
}

export async function createUser(jsonObj){

    try {
        const response = await Axios.post('/createUser', jsonObj)
        return await response.status;
    } catch(err){
      if (err.response){
          //not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          return err.response.data;
      }
      else{
          console.log(`Error: ${err.message}`)
      }
      return err;
    }
}

export async function signin(jsonObj){
    try{
        const response = await Axios.post('/auth', jsonObj, 
            {
                headers: {'Content-type': 'application/json',},
                withCredentials: true
            })
        return await response.data
    }catch(err){
        if (err.response){
            //not in the 200 response range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            return err.response;
        }
        else{
            console.log(`Error: ${err.message}`)
        }
        return err;
    }
}

export async function signout(){
    const options = {
        method: 'GET',
        url: `/logout`,
        headers : {
            'Content-type' : 'application/json',
            withCredentials: true
        }
    };
    try{
        const response = await Axios(options)
        return await response
    }catch(err){
        if (err.response){
            //not in the 200 response range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            return err.response;
        }
        else{
            console.log(`Error: ${err.message}`)
        }
        return err;
    }
}
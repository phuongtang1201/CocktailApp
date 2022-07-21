
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListByCategory from './Components/ListByCategory';
import Signin from './Components/Signin';
import Register from './Components/Register';
import FavoriteList from './Components/FavoriteList';
import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth';
import Home from './Components/Home';
import CocktailDetails from './Components/CocktailDetails';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
        <div >
          <Routes>
            <Route element={<Layout/>}>

              {/* public routes*/}
              <Route path="/" element = {<Home />} />
              <Route path = "/cocktail/:id" element={<CocktailDetails/>}/>
              <Route path = "/ordinaryDrinks" element= {<ListByCategory category= 'Ordinary Drink' />}/>
              <Route path = "/cocktails" element = {<ListByCategory category= 'Cocktail'/>}/>
              <Route path = "/shake" element = {<ListByCategory category= 'Shake'/>}/>
              <Route path = "/others" element = {<ListByCategory category= 'Other/Unknown'/>}/>
              <Route path = "/cocoa" element = {<ListByCategory category= 'Cocoa'/>}/>
              <Route path = "/shot" element = {<ListByCategory category= 'Shot'/>}/>
              <Route path = "/coffee-tea" element = {<ListByCategory category= 'Coffee / Tea'/>}/>
              <Route path = "/homemade-liqueur" element = {<ListByCategory category= 'Homemade Liqueur'/>}/>
              <Route path = "/punch-partydrink" element = {<ListByCategory category= 'Punch / Party Drink'/>}/>
              <Route path = "/sign-in" element = {<Signin/>}/>
              <Route path = "/sign-up" element = {<Register/>}/>

              

              {/*private routes */}
              <Route element= {<RequireAuth/>}>
                <Route path = "/user/favoriteList" element = {<FavoriteList/>}/>               
              </Route>

            </Route>
          </Routes>
        </div>

  );
}

export default App;

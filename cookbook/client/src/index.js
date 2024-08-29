import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IngredientList from "./components/IngredientList";
import RecipeDetail from "./components/RecipeDetail";
import {UserProvider} from "./UserProvider";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/">
                      <Route path="" element={<Home/>}/>
                      <Route path="home" element={<Home/>}/>
                      <Route path="recipeList" element={<App/>}/>
                      <Route path="recipeDetail" element={<RecipeDetail/>}/>
                      <Route path="ingredientList" element={<IngredientList/>}/>
                  </Route>
              </Routes>
          </BrowserRouter>
      </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

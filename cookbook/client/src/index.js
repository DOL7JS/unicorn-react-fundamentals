import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IngredientList from "./components/IngredientList";
import RecipesList from "./components/RecipesList";
import RecipeDetail from "./components/RecipeDetail";
import {UserProvider} from "./UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/">
                      <Route path="" element={<App/>}/>
                      <Route path="home" element={<App/>}/>
                      <Route path="recipeList" element={<RecipesList/>}/>
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

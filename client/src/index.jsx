import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./DogDetails";
import { AddDog } from "./AddDog";
import { getDogs } from "./apiManager";


export const Root = () => {
  const [dogs, setDogs] = useState([]);
  useEffect(() => {
    getDogs().then(setDogs)
  }, [])
  return (  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home setDogs = {setDogs} dogs = {dogs}/>} />
        <Route path="dogs/:dogId" element={<DogDetails />} setDogs = {setDogs} dogs = {dogs}/> 
        <Route path="/add-dog" element={<AddDog setDogs = {setDogs} dogs = {dogs}/>} />
      </Route>
    </Routes>
  </BrowserRouter>)
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

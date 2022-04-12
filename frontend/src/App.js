import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Cars from "./components/cars/cars";
import AddCars from "./components/admin/addCars";
import Connreg from "./components/connection/connreg";
import ForgotPassword from "./components/clients/forgotPassword";
import CarReservation from "./components/cars/carReservation";
import CarDetails from "./components/cars/carDetails";
import ModifyDetails from './components/cars/modifyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars name="mercedes" />} />
        <Route path="/add-cars" element={<AddCars />} />
        <Route path="/connreg" element={<Connreg />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/carReservation" element={<CarReservation />} />
        <Route path="/carDetails" element={<CarDetails />} />
        <Route path="/modifyDetails" element ={<ModifyDetails/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
//IN REACT DOM V6 SWITCH IS REPLACE BY Routes
//IMPORoute

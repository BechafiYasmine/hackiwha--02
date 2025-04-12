import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from "./Register";
import Login from './Login';

import Parent from "./parent";
import Doctor from './doctor';
import Accueil from './components/Accueil';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="/Accueil" element={<Accueil />} />
      <Route path='/parent' element={<Parent />} />
      <Route path='/doctor' element={<Doctor/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
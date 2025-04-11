import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from './Login';

import Parent from "./parent";
import Doctor from './doctor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />

      <Route path='/parent' element={<Parent />} />
      <Route path='/doctor' element={<Doctor/>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
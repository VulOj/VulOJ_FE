import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from './Pages/Home';
import Page404 from './Pages/Page404';
import Login from './Views/Login';
import Register from './Views/Register';

// import styles from './test.module.scss'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Login />} ></Route>
        <Route path='login' element={<Login />} ></Route>
        <Route path='register' element={<Register />} ></Route>
        <Route path='*' element={<Page404 />} ></Route>
      </Route>
    </Routes>
  );
}

export default App;

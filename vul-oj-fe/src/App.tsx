import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from 'src/pages/Home';
import Page404 from 'src/pages/Home/views/404';
import Login from 'src/pages/Home/views/Login';
import Register from 'src/pages/Home/views/Register';

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

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from 'src/pages/Home';
import Page404 from 'src/pages/Home/views/404';
import Login from 'src/pages/Home/views/Login';
import Register from 'src/pages/Home/views/Register';
import Discuss from './pages/Home/views/Discuss';

interface IAppProp {

}

interface IAppState {
  a: number
}

class App extends React.Component<IAppProp, IAppState> {
  constructor(props: IAppProp) {
    super(props);
    this.state = {
      a: 1
    }
  }

  setA = () => {
    if (this.state.a !== 2)
    this.setState({
      a: 2
    })
  }

  render() {

    return (
      <Routes>
        <Route path='/' element={<Home num={this.state.a} />}>
          <Route index element={<Login />} ></Route>
          <Route path='login' element={<Login />} ></Route>
          <Route path='register' element={<Register />} ></Route>
          <Route path='discuss' element={<Discuss setA={this.setA} />}></Route>
          <Route path='*' element={<Page404 />} ></Route>
        </Route>
      </Routes>

    );
  }
}

export default App;

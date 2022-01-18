import { Layout } from 'antd';
import React from 'react';
import './App.scss';

import Header from './Components/Header/Header';
import Login from './Pages/Login/Login';

// import styles from './test.module.scss'

function App() {
  return (
    <Layout className="layout">
      <Header
        items={[
          { name: '页面一', link: '/page1' },
          { name: '页面二', link: '/page2' },
          { name: '页面三', link: '/page3' }
        ]}
      >
      </Header>
      
      <Login >

      </Login>

    </Layout>
  );
}

export default App;

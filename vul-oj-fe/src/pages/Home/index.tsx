import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

class Home extends React.Component {

  render() {
    return (
      <Layout className="layout">
        <Header
          items={[
            { name: '页面一', link: '/page1' },
            { name: '页面二', link: '/page2' },
            { name: '讨论', link: '/discuss' }
          ]}
        >
        </Header>

        <Outlet />
      </Layout>
    );
  }
}

export default Home;
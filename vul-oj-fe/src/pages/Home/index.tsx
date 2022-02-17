import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

interface IHomeProp {
  num: number
}

class Home extends React.Component<IHomeProp> {


  render() {
    console.log(this.props.num);
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
        {this.props.num}

        <Outlet />
      </Layout>
    );
  }
}

export default Home;
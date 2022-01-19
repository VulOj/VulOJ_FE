import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";

class Home extends React.Component {
    
    render() {
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
            
            <Outlet />
          </Layout>
        );
    }
}

export default Home;
import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { matchRoutes, Outlet, useLocation } from "react-router-dom";
import router from "src/commons/routes";
import Header from "./components/Header";

function Home() {
  const [ selected, setSelected ] = useState<string>('');
  const location = useLocation();

  // 解决header菜单高亮问题
  useEffect(() => {
    const routes = matchRoutes(router, location.pathname);
    
    if(routes !== null) {
      if (routes[1].route.index) {
        setSelected('login');
      } else if (routes[1].route.path !== undefined) {
        setSelected(routes[1].route.path)
      } else {
        setSelected('');
      }
    }
  }, [location.pathname])

  return (
    <Layout className="layout">
      <Header
        items={[
          { name: '页面一', link: 'page1' },
          { name: '页面二', link: 'page2' },
          { name: '讨论', link: 'discuss' }
        ]}
        selected={selected}
      >
      </Header>

      <Outlet />
    </Layout>
  );
}

export default Home;
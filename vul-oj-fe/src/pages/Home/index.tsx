import { Layout } from "antd";
import { useEffect, useState } from "react";
import { matchRoutes, Outlet, useLocation } from "react-router-dom";
import router from "src/commons/routes";
import Header from "./components/Header";

import styles from './styles/Home.module.scss'

function Home() {
  const [selected, setSelected] = useState<string>('');
  const location = useLocation();

  // 解决header菜单高亮问题
  useEffect(() => {
    const routes = matchRoutes(router, location.pathname);

    if (routes !== null) {
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
    <Layout className={styles['layout']}>
      <Header
        items={[
          { name: '首页', link: 'home' },
          { name: '题目', link: 'problem' },
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
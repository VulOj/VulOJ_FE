import { Spin } from "antd";
import { lazy, ReactNode, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Home from "src/pages/Home";

// 懒加载
const HomePage = lazy(() => import('src/pages/Home/views/HomePage'));
const Blog = lazy(() => import('src/pages/Home/views/Blog'));
const UserProfile = lazy(() => import('src/pages/Home/views/UserProfile'));
const Login = lazy(() => import('src/pages/Home/views/Login'));
const Register = lazy(() => import('src/pages/Home/views/Register'));
const Page404 = lazy(() => import('src/pages/Home/views/404'));
const ProblemList = lazy(() => import('src/pages/Home/views/ProblemList'));

// 正在加载页面
function Loading() {

  return (
    <div
      style={{
        width: '100%',
        paddingTop: '200px'
      }}
    >
      <Spin
        size="large"
        style={{
          width: '100%',
          textAlign: 'center'
        }}
      />
    </div>
  )
}

const lazyLoad = (children: ReactNode) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}

const router: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: lazyLoad(<Login />)
      },
      {
        path: 'home',
        element: lazyLoad(<HomePage />)
      },
      {
        path: 'problem',
        element: lazyLoad(<ProblemList />)
      },
      {
        path: 'discuss',
        element: lazyLoad(<Blog />)
      },
      {
        path: 'profile',
        element: lazyLoad(<UserProfile />)
      },
      {
        path: 'login',
        element: lazyLoad(<Login />)
      },
      {
        path: 'register',
        element: lazyLoad(<Register />)
      },
      {
        path: '*',
        element: lazyLoad(<Page404 />)
      }
    ]
  }
];

export default router;
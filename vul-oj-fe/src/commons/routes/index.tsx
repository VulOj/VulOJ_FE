import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Home from "src/pages/Home";
import { lazyLoad } from "../utils/lazyLoad";

// 懒加载
const HomePage = lazy(() => import('src/pages/Home/views/HomePage'));
const Blog = lazy(() => import('src/pages/Home/views/Blog'));
const UserProfile = lazy(() => import('src/pages/Home/views/UserProfile'));
const Login = lazy(() => import('src/pages/Home/views/Login'));
const Register = lazy(() => import('src/pages/Home/views/Register'));
const Page404 = lazy(() => import('src/pages/Home/views/404'));



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
      // {
      //   path: 'problem',
      //   element: <></>
      // },
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
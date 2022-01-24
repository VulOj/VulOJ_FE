import React, { lazy, ReactNode } from "react";

// 懒加载
const Login = lazy(() => import('../Views/Login'));
const Page404 = lazy(() => import('../Pages/Page404'));

interface IRouter {
    title: string,
    path: string,
    component?: ReactNode,
    children?: IRouter[]
}

const router: IRouter[] = [
    {
        path: '/login',
        title: '登录',
        component: <Login />
    },
    {
        path: '*',
        title: '404',
        component: <Page404 />
    }
];

export default router;
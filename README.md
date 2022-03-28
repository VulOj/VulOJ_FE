# VulOj_FE

- 这里是VulOj项目的前端部分

## 项目框架

- 本项目使用react框架，基于react脚手架（[create-react-app](https://github.com/facebook/create-react-app)）搭建

## 技术依赖

- [react, react-dom](https://github.com/facebook/react)
    react框架的基本类库
- [react-router-dom](https://github.com/remix-run/react-router)
    用于处理react路由，以构建单页面应用程序提高用户体验
- [antd](https://github.com/ant-design/ant-design/)
    Ant Design设计库，高效复用常用组件，美化用户界面，提高开发效率
- [TypeScript](https://github.com/microsoft/TypeScript)
    强类型脚本语言，弥补了原生JavaScript弱类型可能导致的代码问题
- [sass](https://github.com/sass/sass)
    强大的样式表预处理语言，用于提高css代码的结构性和可维护性
- [css-modules](https://github.com/css-modules/css-modules)
    模块化管理sass样式表，对元素类名自动哈希处理，以解决大型项目中类名冲突的问题
- [axios](https://github.com/axios/axios)
    高效处理网络请求，以实现与后端服务器的通讯

## 项目结构

- **目前本项目的开发工作均在dev分支进行，若需要源码编译等操作，请切换到dev分支**

- 本项目结构如下：
```
\
    email_verification\         // VulOj邮件服务模块
    vul-oj-fe\                  // VulOj项目主体
        public\                 // 存放全局资源
        src\                    // 项目源码
            commons\            // 存放公共代码
                api\            // 存放api函数
                images\         // 存放全局资源
                routes\         // 存放路由规则文件
                styles\         // 存放公共css样式
                utils\          // 存放公共函数
            pages\              // 存放各页面文件
                Admin\          // 存放登录模块源码
                Home\           // 存放主页源码
                Workspace\      // 存放答题页面源码
```

## 安装

- **本项目基于Node.js，请确保你已经在官网安装尽量新版本的[Node.js](https://nodejs.org/en/)**

### 拉取项目源码

- 请使用git版本管理工具拉取仓库
    ``` sh
    git clone https://github.com/VulOj/VulOJ_FE.git
    cd VulOJ_FE
    ```
- 如果在拉取本项目时还未完工，main分支内容可能不完整，请手动切换到dev分支
    ``` sh
    git checkout dev
    ```

### 获取项目依赖

    ``` sh
    cd vul-oj-fe
    npm install
    ```
- 本操作及之后操作请确保在 `\VulOJ_FE\vul-oj-fe` 目录下进行

### 本地运行

    ``` sh
    npm start
    ```
- 该命令执行后，会在默认浏览器中打开页面。若页面未弹出、需要更换浏览器打开或重新访问页面，需要在浏览器访问[http://localhost:3000/](http://localhost:3000/)

### 编译项目

- 若需要对项目进行发布，则需要先进行编译操作：
    ``` sh
    npm run build
    ```
- 执行该命令之后，在 `\VulOJ_FE\vul-oj-fe` 下会生成 `build` 文件夹，该文件夹内即为编译成功的静态页面
- 后续的发布操作请参考[Apache](https://apache.org/)

## 授权

- 本项目最终解释权归VulOj团队所有

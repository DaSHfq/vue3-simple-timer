# Vue 3 简易计时器 (vue3-simple-timer)

这是一个使用 Vue 3、Vite、Vant UI 和 Pinia 构建的现代化、响应式的简易计时器和倒计时应用。此项目旨在演示基于这些技术栈的前端开发实践。

<!-- 
    建议您在这里添加一张项目运行时的截图。
    您可以在 GitHub 上传图片到仓库，然后在这里引用图片的链接。
    例如：
    ![项目截图](URL_TO_YOUR_SCREENSHOT.png) 
-->
[项目截图占位符 - 请替换为您应用的截图]

## ✨ 功能特性

* **正向计时模式**：标准的秒表功能，可以启动、暂停和重置。
* **倒计时模式**：可以设置指定的倒计时时长，并进行启动、暂停和重置。
* **模式切换**：轻松在正向计时和倒计时模式之间切换。
* **自定义时长**：在倒计时模式下，用户可以输入并设定倒计时的初始秒数。
* **状态持久化 (通过 Pinia)**：应用状态由 Pinia 集中管理。
* **响应式界面**：基于 Vant UI 组件库，适配不同屏幕尺寸。
* **实时反馈**：操作按钮的状态会根据计时器当前状态动态更新。
* **清晰的交互**：使用 Toast 组件对用户操作进行反馈。

## 🛠️ 技术栈

* **[Vue 3](https://vuejs.org/)**：渐进式 JavaScript 框架。
    * Composition API (`<script setup>`)
* **[Vite](https://vitejs.dev/)**：下一代前端构建工具。
* **[TypeScript](https://www.typescriptlang.org/)**：JavaScript 的超集，添加了类型系统。
* **[Vant UI](https://vant-contrib.gitee.io/vant/#/zh-CN/)**：轻量、可靠的移动端 Vue 组件库。
* **[Pinia](https://pinia.vuejs.org/)**：Vue 的专属状态管理库，Vuex 的继任者。
* **Git & GitHub**：版本控制和代码托管。

## 🚀 快速开始

请确保您的开发环境中已安装 [Node.js](https://nodejs.org/) (建议 LTS 版本) 和 npm/yarn/pnpm。

1.  **克隆仓库到本地**:
    ```bash
    git clone [https://github.com/DaSHfq/vue3-simple-timer.git](https://github.com/DaSHfq/vue3-simple-timer.git)
    ```

2.  **进入项目目录**:
    ```bash
    cd vue3-simple-timer
    ```

3.  **安装项目依赖**:
    ```bash
    npm install
    ```
    或者如果您使用 yarn:
    ```bash
    yarn install
    ```
    或者如果您使用 pnpm:
    ```bash
    pnpm install
    ```

4.  **启动开发服务器**:
    ```bash
    npm run dev
    ```
    或者:
    ```bash
    yarn dev
    ```
    或者:
    ```bash
    pnpm dev
    ```

5.  **在浏览器中打开应用**:
    Vite 启动后，命令行会显示本地访问地址，通常是 `http://localhost:5173` (或类似端口)。在浏览器中打开此地址即可看到运行的应用。

## 🔧 项目结构 (简要)
```text
vue3-simple-timer/
├── .git/                     # (Git 仓库目录, 通常隐藏)
├── .gitignore                # Git 忽略文件配置
├── .vscode/                  # (VS Code 编辑器配置, 可选)
│   └── extensions.json
├── index.html                # 单页面应用的 HTML 入口文件
├── package-lock.json         # npm 依赖版本锁定文件
├── package.json              # 项目依赖和脚本配置
├── README.md                 # 项目说明文档
├── tsconfig.app.json         # TypeScript 应用特定编译配置
├── tsconfig.json             # TypeScript 主配置文件
├── tsconfig.node.json        # TypeScript Node 环境特定编译配置
├── vite.config.ts            # Vite 配置文件
├── public/                   # 静态资源 (会被直接复制到 dist 根目录)
│   └── vite.svg
└── src/                      # 项目核心源代码
    ├── App.vue               # 根 Vue 组件 (应用主界面和逻辑)
    ├── main.ts               # 应用入口文件 (Vue 实例化、插件注册)
    ├── style.css             # 全局基础样式
    ├── vite-env.d.ts         # Vite 环境变量 TypeScript 定义
    ├── assets/               # 模块化静态资源 (会被 Vite 处理和打包)
    │   └── vue.svg
    ├── components/           # Vue 组件目录 (此项目中主要在App.vue编写)
    │   └── (可复用组件放在这里)
    └── store/                # Pinia 状态管理
        └── timer.ts          # 计时器核心逻辑
```
## 📝 许可协议

本项目采用 [MIT 许可协议](LICENSE)。

---

希望这份 README 对您有所帮助！您可以根据需要进行修改和补充。



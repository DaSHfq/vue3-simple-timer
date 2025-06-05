// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 导入 createPinia
import App from './App.vue';

// 引入 Vant 的全局样式 (确保这行在 createApp 之前或之后，但在 app.use(pinia) 之前通常都可以)
import 'vant/lib/index.css';

// 引入您项目的基础 CSS (Vite 默认的，可以保留)
import './style.css';

const app = createApp(App);

const pinia = createPinia(); // 创建 Pinia 实例
app.use(pinia); // 将 Pinia 实例作为插件使用

app.mount('#app');
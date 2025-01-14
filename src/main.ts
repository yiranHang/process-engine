import { createApp } from "vue";
// reset style sheet
import "./style/reset.scss";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// element icons
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App);


// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(ElementPlus);
app.mount("#app");

import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "swiper/scss";
import "swiper/scss/pagination";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

navigator.serviceWorker.addEventListener("controllerchange", () => {
  console.log("Trang web đã được cập nhật và sẽ có hiệu lực sau khi làm mới");
  ElMessage("Trang web đã được cập nhật và sẽ có hiệu lực sau khi làm mới");
});

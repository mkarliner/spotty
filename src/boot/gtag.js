import { boot } from "quasar/wrappers";
import VueGtag from "vue-gtag";

export default boot(async ({ app, router }) => {
  console.log("GTAG")
  app.use(VueGtag, {
    config: {
      id: "G-WJ62YKWKS1"
    }
  }, router);

  // app.mount("#app");
});

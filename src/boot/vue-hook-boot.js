import { boot } from "quasar/wrappers";

var protocol = 'wss'
var host = "mqtt.pskreporter.info"
var port = 1886
import mqttVueHook from 'mqtt-vue-hook'
// app.use(mqttVueHook, options)



export default boot(async ({ app, router }) => {


  // app.mount("#app");
  app.use(mqttVueHook, `${protocol}://${host}:${port}`, {
    clean: false,
    keepalive: 60,
    clientId: `mqtt_client_${Math.random().toString(16).substring(2, 10)}`,
    connectTimeout: 4000,
})
});

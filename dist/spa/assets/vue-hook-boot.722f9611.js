import{k as t}from"./index.bdb57a3e.js";import{m as r}from"./mqtt-vue-hook.es.f3d9172b.js";var e="wss",a="mqtt.pskreporter.info",s=1886,p=t(async({app:o,router:m})=>{o.use(r,`${e}://${a}:${s}`,{clean:!1,keepalive:60,clientId:`mqtt_client_${Math.random().toString(16).substring(2,10)}`,connectTimeout:4e3})});export{p as default};

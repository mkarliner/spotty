<template>
  <div></div>
</template>

<script>
import { useMQTT } from "mqtt-vue-hook";
import { locatorToLatLng } from "qth-locator";
import { computed, reactive } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { iso1A2Code } from "@ideditor/country-coder";
import { useCountryNames } from "./CountryNames";
const mqttHook = useMQTT();

export default {
  // name: 'ComponentName',
  setup() {
    console.log("MQTT active");
    const topics = reactive({
      callsign_tx_topic: "pskr/filter/v2/+/+/G8LKD/#",
      callsign_rx_topic: "pskr/filter/v2/+/+/+/G8LKD/#",
      grid_tx_topic: "pskr/filter/v2/+/+/+/+/AA91/#",
      grid_rx_topic: "pskr/filter/v2/+/+/+/+/+/AA91/#",
    });
    const store = useSettingsStore();
    const { codeToCountryName } = useCountryNames();
    // console.log("CCC ", codeToCountryName);
    // const topic = computed(() => store.topic);
    const report_ttl = computed(() => store.report_ttl);

    function changeSubscriptions(newt, oldt) {
      // console.log("TT ", newt, oldt);
      // if(oldt) {
      //   mqttHook.unSubscribe(oldt);
      // }

      for (const topic in topics) {
        let ptop = topic
        mqttHook.subscribe(topics[topic]);
        console.log("SUB: ", topics[topic])
        mqttHook.registerEvent(topics[topic], (topic, message) => {
          const rep = JSON.parse(message.toString());
          // console.log(ptop, rep, rep.rl);
          const [receiverLat, receiverLon] = locatorToLatLng(rep.rl);
          const rx_point = [receiverLon, receiverLat];
          const [senderLat, senderLon] = locatorToLatLng(rep.sl);
          const tx_point = [senderLon, senderLat];
          console.log("RP:", Object.keys(this.store.report_points).length);
          if (this.store.report_points.hasOwnProperty(rep.sq)) {
            console.log("ALERT, Duplicate");
          } else {
            this.store.report_points[rep.sq] = {
              topic: ptop,
              report: rep,
              sequenceNumber: rep.sq,
              band: rep.b,
              rx_coordinate: rx_point,
              tx_coordinate: tx_point,
              countryName: codeToCountryName(iso1A2Code(rx_point)),
            };
            //console.log("Country:", iso1A2Code(point), codeToCountryName(iso1A2Code(point)))
            setTimeout(() => {
              console.log("bye bye", rep.sq, this.store.report_ttl);
              delete this.store.report_points[rep.sq];
            }, this.store.report_ttl * 1000);
          }
        });
      }
    }

    return {
      codeToCountryName,
      changeSubscriptions,
      store,
      topics,
      report_ttl,
    };
  },

  mounted() {
    this.store.$subscribe((mutation, state) => {
      // console.log(
      //   "state change ",
      //   mutation, state
      // );
      // mqttHook.unsubscribe([mutation.])
      // mqttHook.subscribe([this.store.topic]);
    });
    // this.$refs.view.updateSize();
    // mqttHook.subscribe(["pskr/filter/+/+/+/+/IO91/#"]);
    // mqttHook.registerEvent("pskr/filter/+/+/+/+/IO91/#", (topic, message) => {
    console.log("ereeee", this.store.topic);
    this.changeSubscriptions(this.store.topic, null);
    // mqttHook.subscribe([this.store.topic]);
    // mqttHook.registerEvent(this.store.topic, (topic, message) => {
    //   const rep = JSON.parse(message.toString());
    //   //console.log(rep, rep.rl)
    //   const [receiverLat, receiverLon] = locatorToLatLng(rep.rl);
    //   const point = [receiverLon, receiverLat];
    //   //console.log("RP:", Object.keys(this.store.report_points).length);
    //   if (this.store.report_points.hasOwnProperty(rep.sq)) {
    //     console.log("ALERT, Duplicate");
    //   } else {
    //     this.store.report_points[rep.sq] = {
    //       report: rep,
    //       sequenceNumber: rep.sq,
    //       band: rep.b,
    //       coordinate: point,
    //     };
    //     setTimeout(() => {
    //       //console.log("bye bye", rep.sq, this.store.report_ttl);
    //       delete this.store.report_points[rep.sq];
    //     }, this.report_ttl * 1000);
    //   }
    // });
  },

  watch: {
    topics(n, o) {
      console.log("TOPICS CHANGE ", n, o)
      // this.changeSubscriptions(n, o);
    },
  },
};
</script>

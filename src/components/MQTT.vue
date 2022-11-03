<template>
  <div></div>
</template>

<script>
import { useMQTT } from "mqtt-vue-hook";
import { locatorToLatLng } from "qth-locator";
import { computed, reactive, onMounted, watch, ref, watchEffect } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { iso1A2Code } from "@ideditor/country-coder";
import { useCountryNames } from "./CountryNames";
const mqttHook = useMQTT();

export default {
  // name: 'ComponentName',
  setup() {
    console.log("MQTT active");
    const store = useSettingsStore();
    console.log("STORE: ", store);

    const { grid, callsign, track_callsign, track_grid } = storeToRefs(store);

    const topicss = computed(() => {
        let t = { }
        if(track_callsign.value) {
            t.callsign_tx_topic = `pskr/filter/v2/+/+/${callsign.value}/#`
            t.callsign_rx_topic = `pskr/filter/v2/+/+/+/${callsign.value}/#`
        }
        if(track_grid.value) {
            t.grid_tx_topic = `pskr/filter/v2/+/+/+/+/${grid.value}/#`,
            t.grid_rx_topic = `pskr/filter/v2/+/+/+/+/+/${grid.value}/#`
        }
        return t

      //  return {
      //   callsign_tx_topic: `pskr/filter/v2/+/+/${callsign.value}/#`,
      //   callsign_rx_topic: `pskr/filter/v2/+/+/+/${callsign.value}/#`,
      //   grid_tx_topic: `pskr/filter/v2/+/+/+/+/${grid.value}/#`,
      //   grid_rx_topic: `pskr/filter/v2/+/+/+/+/+/${grid.value}/#`,
      // };
    });

    const convertCoordinates = function(coord) {
        let lon = coord[0]
        let lat = coord[1]
        let x = (lon * 20037508.34) / 180;
        let y =  Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
        y = (y * 20037508.34) / 180;
        console.log("CC ", lon, lat, x,y)
        return [x, y];
      }

    const { codeToCountryName } = useCountryNames();
    // console.log("CCC ", codeToCountryName);
    // const topic = computed(() => store.topic);
    const report_ttl = computed(() => store.report_ttl);

    watch([topicss], (newv, oldv) => {
      console.log("WAT ", newv, oldv);
      for (const t in oldv[0]) {
        mqttHook.unSubscribe(oldv[0][t]);
        console.log("UNSUB : ", oldv[0][t]);
      }
      // return true;
      // grid.value = newv[0]
      // callsign.value = newv[1]
    });

    watchEffect(() => {
      console.log("CHANGE: ", grid.value, callsign.value, );
      console.log("TOPICS ", topicss.value);
      changeSubscriptions(grid, callsign);
    });

    function changeSubscriptions() {
      // console.log("TT ", newt, oldt);
      // if(oldt) {
      //   mqttHook.unSubscribe(oldt);
      // }

      const topics = topicss.value;
      for (const topic in topics) {
        // let ptop = topic;
        mqttHook.subscribe(topics[topic]);
        console.log("SUB: ", topics[topic]);
        mqttHook.registerEvent(topics[topic], (actual_topic, message) => {
          const rep = JSON.parse(message.toString());
          // console.log( rep, rep.sq);
          const [receiverLat, receiverLon] = (locatorToLatLng(rep.rl));
          const rx_point = [receiverLon, receiverLat];
          const [senderLat, senderLon] = (locatorToLatLng(rep.sl));
          const tx_point = [senderLon, senderLat];
          // console.log("RP:", Object.keys(this.store.report_points).length);
          //console.log("RPS: ", this.store.report_points);
          if (store.report_points.hasOwnProperty(rep.sq)) {
            console.log("ALERT, Duplicate");
          } else {
            store.last_spot = parseInt(rep.t) * 1000
            //console.log("LS:", parseInt(rep.t), new Date(store.last_spot))
            store.report_points[rep.sq] = {
              topic: topic,
              report: rep,
              sequenceNumber: rep.sq,
              band: rep.b,
              rx_coordinate: rx_point,
              tx_coordinate: tx_point,
              countryName: codeToCountryName(iso1A2Code(rx_point)),
              timestamp: Date.now(),
            };
            //console.log("Country:", iso1A2Code(point), codeToCountryName(iso1A2Code(point)))
            // setTimeout(() => {
            //   //console.log("bye bye", rep.sq, this.store.report_ttl);
            //   delete this.store.report_points[rep.sq];
            // }, this.store.report_ttl * 1000);
          }
        });
      }
    }

    onMounted(() => {
      console.log("MQTT mounted", store);
      // changeSubscriptions(store);
      //     store.$subscribe((mutation, state) => {
      //       console.log("EVsssNT ",mutation.events)
      //     // for(const e in mutation.events) {
      //     //   console.log("EVNT ", e)
      //     // }
      // })

      setInterval(function () {
        // console.log("RP:", topics, Object.keys(store.report_points).length);
        for (let r in store.report_points) {
          let age = (Date.now() - store.report_points[r].timestamp) / 1000;
          //console.log("age ", age, store.report_points[r].sequenceNumber )
          if (age > store.report_ttl) {
            store.deletePoint(store.report_points[r].sequenceNumber);
            //delete store.report_points[r].sq;
            //console.log("DEL ", age)
          }
          // console.log("AGE: ", age);
        }
      }, 10000);
    });

    return {
      topicss,
      codeToCountryName,
      changeSubscriptions,
      convertCoordinates,
      store,
      report_ttl,
      grid,
      callsign,
    };
  },
};
</script>

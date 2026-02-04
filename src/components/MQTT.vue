<template>
  <div></div>
</template>

<script>
import { useMQTT } from "mqtt-vue-hook";
import { locatorToLatLng } from "qth-locator";
import { computed, reactive, onMounted, onUnmounted, watch, ref, watchEffect } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
import { iso1A2Code } from "@rapideditor/country-coder";
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
      let t = {};
      if (track_callsign.value) {
        t.callsign_tx_topic = `pskr/filter/v2/+/+/${callsign.value}/#`;
        t.callsign_rx_topic = `pskr/filter/v2/+/+/+/${callsign.value}/#`;
      }
      if (track_grid.value) {
        t.grid_tx_topic = `pskr/filter/v2/+/+/+/+/${grid.value}/#`;
        t.grid_rx_topic = `pskr/filter/v2/+/+/+/+/+/${grid.value}/#`;
      }
      return t;

      //  return {
      //   callsign_tx_topic: `pskr/filter/v2/+/+/${callsign.value}/#`,
      //   callsign_rx_topic: `pskr/filter/v2/+/+/+/${callsign.value}/#`,
      //   grid_tx_topic: `pskr/filter/v2/+/+/+/+/${grid.value}/#`,
      //   grid_rx_topic: `pskr/filter/v2/+/+/+/+/+/${grid.value}/#`,
      // };
    });

    const convertCoordinates = function (coord) {
      let lon = coord[0];
      let lat = coord[1];
      let x = (lon * 20037508.34) / 180;
      let y =
        Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
      y = (y * 20037508.34) / 180;
      console.log("CC ", lon, lat, x, y);
      return [x, y];
    };

    const { codeToCountryName } = useCountryNames();
    // console.log("CCC ", codeToCountryName);
    // const topic = computed(() => store.topic);
    const report_ttl = computed(() => store.report_ttl);

    const registeredTopics = ref(new Set());

    watch(topicss, (newTopics, oldTopics) => {
      console.log("WAT ", newTopics, oldTopics);

      // Unsubscribe from old topics
      if (oldTopics) {
        for (const t in oldTopics) {
          mqttHook.unSubscribe(oldTopics[t]);
          console.log("UNSUB : ", oldTopics[t]);
        }
      }

      // Clear registered topics to allow re-registration
      registeredTopics.value.clear();

      // Subscribe to new topics
      changeSubscriptions();
    }, { immediate: true });

    function changeSubscriptions() {
      const topics = topicss.value;

      for (const topicKey in topics) {
        const topicString = topics[topicKey];

        // Skip if already registered to prevent duplicate handlers
        if (registeredTopics.value.has(topicString)) {
          continue;
        }

        mqttHook.subscribe(topicString);
        console.log("SUB: ", topicString);
        registeredTopics.value.add(topicString);

        mqttHook.registerEvent(topicString, (actual_topic, message) => {
          try {
            const rep = JSON.parse(message.toString());

            // Validate required fields
            if (!rep.rl || !rep.sl || !rep.sq) {
              console.warn("Invalid message, missing required fields:", rep);
              return;
            }

            const [receiverLat, receiverLon] = locatorToLatLng(rep.rl);
            const rx_point = [receiverLon, receiverLat];
            const [senderLat, senderLon] = locatorToLatLng(rep.sl);
            const tx_point = [senderLon, senderLat];

            if (store.report_points.hasOwnProperty(rep.sq)) {
              console.log("ALERT, Duplicate");
            } else {
              store.last_spot = parseInt(rep.t) * 1000;
              store.report_points[rep.sq] = {
                topic: topicString,
                topicKey: topicKey,
                report: rep,
                sequenceNumber: rep.sq,
                band: rep.b,
                rx_coordinate: rx_point,
                tx_coordinate: tx_point,
                countryName: codeToCountryName(iso1A2Code(rx_point)),
                timestamp: Date.now(),
              };
            }
          } catch (error) {
            console.error("Error processing MQTT message:", error, message.toString());
          }
        });
      }
    }

    let cleanupIntervalId = null;

    onMounted(() => {
      console.log("MQTT mounted", store);

      cleanupIntervalId = setInterval(function () {
        for (let r in store.report_points) {
          let age = (Date.now() - store.report_points[r].timestamp) / 1000;
          if (age > store.report_ttl) {
            store.deletePoint(store.report_points[r].sequenceNumber);
          }
        }
      }, 10000);
    });

    onUnmounted(() => {
      console.log("MQTT unmounted, cleaning up");

      // Clear the interval
      if (cleanupIntervalId !== null) {
        clearInterval(cleanupIntervalId);
      }

      // Unsubscribe from all topics
      const topics = topicss.value;
      for (const t in topics) {
        mqttHook.unSubscribe(topics[t]);
        console.log("CLEANUP UNSUB: ", topics[t]);
      }
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

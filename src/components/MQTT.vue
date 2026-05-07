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
import { createLogger } from "src/utils/logger";

const mqttHook = useMQTT();
const logger = createLogger('MQTT');

export default {
  // name: 'ComponentName',
  setup() {
    logger.debug("MQTT component active");
    const store = useSettingsStore();
    logger.debug("Store initialized:", store.callsign, store.grid);

    const { grid, callsign, track_callsign, track_grid, global_mode } = storeToRefs(store);

    const GLOBAL_TOPIC = 'pskr/filter/v2raw_1pc/#';

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
      logger.debug("Topics changed:", { new: newTopics, old: oldTopics });

      // Unsubscribe from old topics
      if (oldTopics) {
        for (const t in oldTopics) {
          mqttHook.unSubscribe(oldTopics[t]);
          logger.info("Unsubscribed from topic:", oldTopics[t]);
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
        logger.info("Subscribed to topic:", topicString);
        registeredTopics.value.add(topicString);

        mqttHook.registerEvent(topicString, (actual_topic, message) => {
          try {
            const rep = JSON.parse(message.toString());

            // Validate required fields
            if (!rep.rl || !rep.sl || !rep.sq) {
              logger.warn("Invalid message, missing required fields:", rep);
              return;
            }

            const [receiverLat, receiverLon] = locatorToLatLng(rep.rl);
            const rx_point = [receiverLon, receiverLat];
            const [senderLat, senderLon] = locatorToLatLng(rep.sl);
            const tx_point = [senderLon, senderLat];

            if (store.report_points.hasOwnProperty(rep.sq)) {
              logger.debug("Duplicate message received, sequence:", rep.sq);
            } else {
              const spotGeneratedAt = parseInt(rep.t) * 1000;
              const receivedAt = Date.now();
              const latency = receivedAt - spotGeneratedAt;

              store.last_spot = spotGeneratedAt;
              store.report_points[rep.sq] = {
                topic: topicString,
                topicKey: topicKey,
                report: rep,
                sequenceNumber: rep.sq,
                band: rep.b,
                rx_coordinate: rx_point,
                tx_coordinate: tx_point,
                countryName: codeToCountryName(iso1A2Code(rx_point)),
                timestamp: receivedAt,
                latency: latency,
              };
            }
          } catch (error) {
            logger.error("Error processing MQTT message:", error, message.toString());
          }
        });
      }
    }

    function processGlobalMessage(message) {
      try {
        const rep = JSON.parse(message.toString());
        if (!rep.rl || !rep.sl || !rep.sq) return;
        if (store.global_report_points.hasOwnProperty(rep.sq)) return;

        const [receiverLat, receiverLon] = locatorToLatLng(rep.rl);
        const rx_point = [receiverLon, receiverLat];
        const [senderLat, senderLon] = locatorToLatLng(rep.sl);
        const tx_point = [senderLon, senderLat];

        // Evict oldest entry when cap reached
        const keys = Object.keys(store.global_report_points);
        if (keys.length >= store.global_spot_cap) {
          let oldestKey = keys[0];
          let oldestTs = store.global_report_points[oldestKey].timestamp;
          for (const k of keys) {
            if (store.global_report_points[k].timestamp < oldestTs) {
              oldestTs = store.global_report_points[k].timestamp;
              oldestKey = k;
            }
          }
          store.deleteGlobalPoint(oldestKey);
        }

        const receivedAt = Date.now();
        store.global_report_points[rep.sq] = {
          topic: GLOBAL_TOPIC,
          topicKey: 'global',
          report: rep,
          sequenceNumber: rep.sq,
          band: rep.b,
          rx_coordinate: rx_point,
          tx_coordinate: tx_point,
          countryName: codeToCountryName(iso1A2Code(rx_point)),
          timestamp: receivedAt,
          latency: receivedAt - parseInt(rep.t) * 1000,
        };
      } catch (error) {
        logger.error("Error processing global MQTT message:", error);
      }
    }

    watch(global_mode, (enabled) => {
      if (enabled) {
        mqttHook.subscribe(GLOBAL_TOPIC);
        logger.info("Subscribed to global topic:", GLOBAL_TOPIC);
        mqttHook.registerEvent(GLOBAL_TOPIC, (actual_topic, message) => {
          processGlobalMessage(message);
        });
      } else {
        mqttHook.unSubscribe(GLOBAL_TOPIC);
        logger.info("Unsubscribed from global topic");
        store.global_report_points = {};
      }
    }, { immediate: true });

    // Monitor MQTT connection status using polling
    let connectionCheckInterval = null;
    let wasConnected = false;

    const checkConnectionStatus = () => {
      const isConnected = mqttHook.isConnected();

      if (isConnected && !wasConnected) {
        // Just connected
        logger.info("MQTT connection established");
        store.mqtt_status = 'connected';
        store.mqtt_error = null;
        wasConnected = true;
      } else if (!isConnected && wasConnected) {
        // Just disconnected
        logger.warn("MQTT connection lost");
        store.mqtt_status = 'disconnected';
        wasConnected = false;
      } else if (!isConnected && store.mqtt_status === 'connecting') {
        // Still connecting
        store.mqtt_status = 'connecting';
      } else if (isConnected) {
        // Stay connected
        store.mqtt_status = 'connected';
        store.mqtt_error = null;
      }
    };

    const setupConnectionMonitoring = () => {
      logger.debug("Setting up MQTT connection monitoring");

      // Initial check
      checkConnectionStatus();

      // Poll connection status every 2 seconds
      connectionCheckInterval = setInterval(checkConnectionStatus, 2000);
    };

    let cleanupIntervalId = null;

    onMounted(() => {
      logger.debug("MQTT component mounted");

      // Set initial status
      store.mqtt_status = 'connecting';

      // Setup connection monitoring
      setupConnectionMonitoring();

      cleanupIntervalId = setInterval(function () {
        for (let r in store.report_points) {
          let age = (Date.now() - store.report_points[r].timestamp) / 1000;
          if (age > store.report_ttl) {
            store.deletePoint(store.report_points[r].sequenceNumber);
          }
        }
        for (let r in store.global_report_points) {
          let age = (Date.now() - store.global_report_points[r].timestamp) / 1000;
          if (age > store.global_report_ttl) {
            store.deleteGlobalPoint(store.global_report_points[r].sequenceNumber);
          }
        }
      }, 10000);
    });

    onUnmounted(() => {
      logger.debug("MQTT component unmounted, cleaning up");

      // Clear the cleanup interval
      if (cleanupIntervalId !== null) {
        clearInterval(cleanupIntervalId);
      }

      // Clear the connection check interval
      if (connectionCheckInterval !== null) {
        clearInterval(connectionCheckInterval);
      }

      // Unsubscribe from all topics
      const topics = topicss.value;
      for (const t in topics) {
        mqttHook.unSubscribe(topics[t]);
        logger.info("Cleanup: unsubscribed from topic:", topics[t]);
      }
      if (store.global_mode) {
        mqttHook.unSubscribe(GLOBAL_TOPIC);
        logger.info("Cleanup: unsubscribed from global topic");
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

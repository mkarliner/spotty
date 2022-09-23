<template>
  <div></div>
</template>

<script>
import { useMQTT } from "mqtt-vue-hook";
import { locatorToLatLng } from "qth-locator";
import { computed } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
const mqttHook = useMQTT();

export default {
  // name: 'ComponentName',
  setup() {
    console.log("MQTT active");
    const store = useSettingsStore();
    const topic = computed(() => store.topic);
    const report_ttl = computed(() => store.report_ttl);
    return {
      store,
      topic,
      report_ttl
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
    console.log(this.store.topic);
    mqttHook.subscribe([this.store.topic]);
    mqttHook.registerEvent(this.store.topic, (topic, message) => {
      const rep = JSON.parse(message.toString());
      // console.log(rep, topic)
      const [receiverLat, receiverLon] = locatorToLatLng(rep.receiverLocator);
      const point = [receiverLon, receiverLat];
      // console.log("RP:", Object.keys(this.report_points).length);
      if (this.store.report_points.hasOwnProperty(rep.seqenceNumber)) {
        console.log("ALERT, Duplicate");
      } else {
        this.store.report_points[rep.sequenceNumber] = {
          sequenceNumber: rep.sequenceNumber,
          band: rep.band,
          coordinate: point,
        };
        setTimeout(() => {
          // console.log("bye bye", rep.sequenceNumber, this.store.report_ttl);
          delete this.store.report_points[rep.sequenceNumber];
        }, this.report_ttl * 1000);
      }
    });
  },

  watch: {
    topic(newt, oldt) {
      console.log("TT ", newt, oldt)
      mqttHook.unSubscribe(oldt)
      mqttHook.subscribe(newt)
      mqttHook.registerEvent(this.store.topic, (topic, message) => {
      const rep = JSON.parse(message.toString());
      // console.log(rep, topic)
      const [receiverLat, receiverLon] = locatorToLatLng(rep.receiverLocator);
      const point = [receiverLon, receiverLat];
      // console.log("RP:", Object.keys(this.report_points).length);
      if (this.store.report_points.hasOwnProperty(rep.seqenceNumber)) {
        console.log("ALERT, Duplicate");
      } else {
        this.store.report_points[rep.sequenceNumber] = {
          sequenceNumber: rep.sequenceNumber,
          band: rep.band,
          coordinate: point,
        };
        setTimeout(() => {
          console.log("bye bye", rep.sequenceNumber, this.store.report_ttl);
          delete this.store.report_points[rep.sequenceNumber];
        }, this.store.report_ttl * 1000);
      }
    });
    }
  }
};
</script>

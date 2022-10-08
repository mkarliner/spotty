<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      ref="view"
      @click="clicktt"
      style="
        margin-left: -50%;
        width: 100%;
        top: 0;
        bottom: 0;
        position: absolute;
      "
    >
      <ol-interaction-select @select="featureSelected">
        <ol-overlay :position="oposition">

            <div class="overlay-content">
              <div>
                TX: {{tcall}} RX: {{rcall}}
              </div>
              <div>
                LAT: {{ lat }} LON: {{lon}}
                BAND: {{band}}
              </div>

            </div>

        </ol-overlay>
      </ol-interaction-select>
      <ol-view
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature
            v-for="p in this.store.report_points"
            v-bind:key="p.seqenceNumber"
          >
            <!-- <ReportPoint ></ReportPoint> -->
            <report-point
              @delete="deleteRP"
              :sequenceNumber="p.sequenceNumber"
              :report="p"
              :coordinate="p.coordinate"
              :band="p.band"
              :callsign="p.callsign"
              @mapclick="clickty"
            ></report-point>
            <!-- <ReportPoint :key="p"></ReportPoint> -->
            <!-- <ol-geom-point :coordinates="coordinate"></ol-geom-point>
            <ol-style>
              <ol-style-circle :radius="radius">
                <ol-style-fill :color="fillColor"></ol-style-fill>
                <ol-style-stroke
                  :color="strokeColor"
                  :width="strokeWidth"
                ></ol-style-stroke>
              </ol-style-circle>
            </ol-style> -->
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
      <ol-attribution-control></ol-attribution-control>
    </ol-map>
  </div>
</template>

<script>
import { useMQTT } from "mqtt-vue-hook";
import { locatorToLatLng } from "qth-locator";
import { computed } from "vue";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";
const mqttHook = useMQTT();

import { ref, provide } from "vue";
import ReportPoint from "src/components/ReportPoint.vue";
import { STATEMENT_TYPES } from "@babel/types";
// import ReportPoint from "./ReportPoint.vue";
// import OpenLayersMap from 'vue3-openlayers'
export default {
  // name: 'OlMap',
  mounted() {
    // this.store.$subscribe((mutation, state) => {
    //   console.log(
    //     "state change ",
    //     mutation.events.oldValue,
    //     mutation.events.newValue
    //   );
    //   // mqttHook.unsubscribe([mutation.])
    //   // mqttHook.subscribe([this.store.topic]);
    // });
    // // this.$refs.view.updateSize();
    // // mqttHook.subscribe(["pskr/filter/+/+/+/+/IO91/#"]);
    // // mqttHook.registerEvent("pskr/filter/+/+/+/+/IO91/#", (topic, message) => {
    // console.log(this.store.topic);
    // mqttHook.subscribe([this.store.topic]);
    // mqttHook.registerEvent(this.store.topic, (topic, message) => {
    //   const rep = JSON.parse(message.toString());
    //   // console.log(rep, topic)
    //   const [receiverLat, receiverLon] = locatorToLatLng(rep.receiverLocator);
    //   const point = [receiverLon, receiverLat];
    //   // console.log("RP:", Object.keys(this.report_points).length);
    //   if (this.report_points.hasOwnProperty(rep.seqenceNumber)) {
    //     console.log("ALERT, Duplicate");
    //   } else {
    //     this.report_points[rep.sequenceNumber] = {
    //       sequenceNumber: rep.sequenceNumber,
    //       band: rep.band,
    //       coordinate: point,
    //     };
    //     setTimeout(() => {
    //       // console.log("bye bye", rep.sequenceNumber);
    //       delete this.report_points[rep.sequenceNumber];
    //     }, 15000);
    //   }
    // });
  },
  setup() {
    const center = ref([-0.224, 51.555]);
    const projection = ref("EPSG:4326");
    const zoom = ref(0);
    const rotation = ref(0);
    const radius = ref(5);
    const strokeWidth = ref(10);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    const coordinate = ref([-0.224, 51.555]);
    const rcall = "-"
    const tcall = "-"
    const grid = "-"
    const lat = 0
    const lon = 50
    const band = "-"

    const store = useSettingsStore();
    const topic = computed(() => store.topic);

    provide("bar", "foo");

    // const featureSelected = (event) => {
    //   console.log("XX", event.selected[0].values_.geometry.extent_[0]);
    //   oposition = event.selected[0].values_.geometry.extent_[0]

    // }
    // var instance = new ReportPoint({});
    // this.$refs.container.addComponent(instance);

    return {
      store,
      center,
      projection,
      zoom,
      rotation,
      radius,
      strokeWidth,
      strokeColor,
      fillColor,
      coordinate,
      rcall,
      tcall,
      grid,
      lat, lon,
      band
      // featureSelected,
    };
  },
  data() {
    // let report_points = [{ center: [-0.224, 51.555] }];
    // let report_points = [];
    return {
      oposition: [-1000, -5000],
      // report_points: reppoints,
      // report_points: [{ sequenceNumber: 1, coordinate: [-0.224, 51.555] }]
      report_points: {},
    };
  },

  methods: {
    clicktt(event) {
      // this.$refs.view.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
      //   console.log("FFF ", feature);
      // });
      console.log("rrr ", event);
    },
    deleteRP(payload) {
      console.log("Deletion", payload);
      delete this.report_points[payload];
    },
    clickty(event) {

    },
    featureSelected(event) {
      // console.log("XX", event.selected[0], );
      // console.log("SSS ", this.store.report_points[event.selected[0].values_.seqno])
      // console.log("XX", event.target.getFeatures().array_[0], );
      let rep = this.store.report_points[event.selected[0].values_.seqno].report
      console.log("eeee ", rep)
      this.oposition = event.selected[0].values_.geometry.extent_;
      this.lat = parseFloat(this.oposition[1]).toFixed(4)
      this.lon = parseFloat(this.oposition[0]).toFixed(4)
      this.rcall = rep.rc
      this.tcall = rep.sc
      this.band = rep.b

    },
    // featuresSelected(e) {
    //   console.log("FS", e)
    // }
    // report_points() {
    //   console.log(".....sss")
    //   return [
    //     this.report_points
    //   ]
    //   }
  },
  components: {
    ReportPoint,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      ref="view"
      style="
        margin-left: -50%;
        width: 100%;
        top: 0;
        bottom: 0;
        position: absolute;
      "
    >
      <ol-interaction-select @select="featureSelected">
        <ol-overlay :position="oposition" >
          <div class="overlay-content">
            <div>TX: {{ tcall }} RX: {{ rcall }}</div>
            <div>RX GRID: {{ rgrid }} BAND: {{ band }}</div>
          </div>
        </ol-overlay>
      </ol-interaction-select>
      <ol-view
        :center="center"
        :rotation="rotation"
        :zoom="zoom"
        :projection="projection"
        showFullExtent
      />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature
            v-for="p in this.store.report_points"
            v-bind:key="p.sequenceNumber"
          >
            <report-point
              @delete="deleteRP"
              :sequenceNumber="p.sequenceNumber"
              :report="p.report"
              :topic="p.topic"
              :rx_coordinate="p.rx_coordinate"
              :tx_coordinate="p.tx_coordinate"
              :band="p.band"
              :callsign="p.report.sc"
              :owncallsign="this.store.callsign"
            ></report-point>
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
import proj4 from "proj4";
const mqttHook = useMQTT();

import { ref, provide } from "vue";
import ReportPoint from "src/components/ReportPoint.vue";
import VueScreenSizeMixin from "vue-screen-size";
import { STATEMENT_TYPES } from "@babel/types";
// import ReportPoint from "./ReportPoint.vue";
// import OpenLayersMap from 'vue3-openlayers'
export default {
  // name: 'OlMap',
  mixins: [VueScreenSizeMixin],
  mounted() {},
  setup() {
    const center = ref(proj4("EPSG:3857",[0, 10]));
    const overlaydisplay = ref("display: block");
    const projection = ref("EPSG:3857");
    const zoom = ref(2);
    const rotation = ref(0);
    const radius = ref(5);
    const strokeWidth = ref(10);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    const coordinate = ref([-0.224, 51.555]);
    const rcall = ref( "-");
    const tcall = ref("-");
    const rgrid = ref("-");
    const sgrid = ref("-");
    // const lat = 0;
    // const lon = 50;
    const band = ref("-");

    const store = useSettingsStore();
    const topic = computed(() => store.topic);

    // const oposition = computed(() => {
    //   return null
    //     return proj4('EPSG:3857', [0, 0])
    //   })

    const oposition = ref(null);

    // p.rx_coordinate

    console.log("Map active");

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
      rgrid,
      sgrid,
      // lat,
      // lon,
      band,
      overlaydisplay,
      oposition,
      // featureSelected,
    };
  },
  data() {
    // let report_points = [{ center: [-0.224, 51.555] }];
    // let report_points = [];
    return {
      // report_points: reppoints,
      // report_points: [{ sequenceNumber: 1, coordinate: [-0.224, 51.555] }]
      //report_points: {},
    };
  },

  methods: {
    deleteRP(payload) {
      //console.log("Deletion", payload);
      delete this.report_points[payload];
    },

    rxc(rxp) {
      console.log("xxx", rxp)

      return proj4("EPSG:3857", rxp);
    },

    rxt(rxp) {
      //console.log(rxp)

      return proj4("EPSG:3857", rxp);
    },

    // overlaydisplay() {
    //     return {display: "block"}
    // },

    featureSelected(event) {
      // if(this.overlaydisplay == "none") {
      //   this.overlaydisplay = "block"
      // } else {
      //   this.overlaydisplay = "none"
      // }
      // console.log("XX", event.selected[0], );
      // console.log("SSS ", this.store.report_points[event.selected[0].values_.seqno])
      console.log("XX", event.selected[0]);
      //console.log("eeee ", rep)
      if (event.selected[0]) {
        let rep =
          this.store.report_points[event.selected[0].values_.seqno].report;
        this.p = event.selected[0].values_.geometry.extent_
        this.oposition = event.selected[0].values_.geometry.extent_;
        // this.lat = parseFloat(this.oposition[1]).toFixed(4);
        // this.lon = parseFloat(this.oposition[0]).toFixed(4);
        this.rcall = rep.rc;
        this.tcall = rep.sc;
        this.band = rep.b;
        this.rgrid = rep.rl;
        this.sgrid = rep.sl;
        console.log("eeee ",  this);
      } else {
        this.oposition = null;
      }
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

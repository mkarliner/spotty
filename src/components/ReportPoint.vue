<template>
  <div :data-seqno="sequenceNumber">
  <ol-feature ref="sss" :properties="things()">
    <!-- <ol-overlay :position="coordinate">
        <template v-slot="slotProps">
            <div class="overlay-content">
                Hello world!<br>
                Position: {{ slotProps.position }}
            </div>
        </template>
    </ol-overlay> -->
    <div :data-seqno="sequenceNumber"  @click="clickty"></div>
    <ol-geom-point :coordinates="coordinate"></ol-geom-point>
    <!-- <ol-interaction-select
      @select="featureSelected">
  </ol-interaction-select> -->
    <ol-style>
      <ol-style-icon v-if="owncall" :src="markerIcon" :color="fillColor" :scale="0.05"></ol-style-icon>
      <ol-style-circle v-else :radius="radius" >
        <ol-style-fill :color="fillColor"></ol-style-fill>
        <ol-style-stroke
          :color="strokeColor"
          :width="strokeWidth"
        ></ol-style-stroke>
      </ol-style-circle>
      <!-- <ol-style-text text="o" font="20px icons" ></ol-style-text> -->
      <ol-style-text :offsetX="offsetX" :font="fstyle" :text="snr" ></ol-style-text>
    </ol-style>
  </ol-feature>
</div>
</template>

<script>
// import { METHODS } from "http";
import {watch, ref, inject, computed, onMounted } from "vue";
import proj4 from "proj4";
import { useSettingsStore } from "stores/settings";
import { storeToRefs } from "pinia";

import markerIcon from '/src/assets/marker.png'
// import olFeatureP from "src/components/OlFeatureP.vue";
// import {unmount} from 'App'

// import OpenLayersMap from 'vue3-openlayers'

export default {
  name: "ReportPoint",
  props: ["topic", "report", "rx_coordinate", "tx_coordinate", "sequenceNumber", "band", "callsign", "owncallsign"],
  emits: ["delete", "mapclick", "click"],
  setup(props) {
    // const coordinate = ref([-0.224, 51.555]);
    //const radius = ref(10);

    const offsetX = 10
    const store = useSettingsStore()
    const { show_snr } = storeToRefs(store);


    const radius = computed(() => {
      //console.log("PTOP", props.topic)
      if(props.topic == "grid_tx_topic" || props.topic == "callsign_tx_topic") {
        return 8
      } else {
        return 5
      }

    })

    const snr = computed(() => {
        // console.log("PTOP", show_snr.value, props.report.rp)
        if(show_snr.value && props.report.sc == props.owncallsign) {
          return props.report.rp.toString()
        } else {
          return ""
        }

      } )



    const strokeWidth = computed(() => {
      //console.log("PTOP", props.topic)
      if(props.callsign == props.owncallsign) {
        return 3
      } else {
        return 1
      }

    })

    const fstyle = computed(() => {
      return "italic 30px  serif;"

    })

    const coordinate = computed(() => {
        if(props.topic == "grid_rx_topic" || props.topic ==  "callsign_rx_topic") {
          return proj4("EPSG:3857", props.tx_coordinate);
        } else {
          return proj4("EPSG:3857", props.rx_coordinate);
        }
    })

    const owncall = computed(() => {
      // console.log(props.callsign,props.owncallsign)
      if(props.callsign == props.owncallsign) {
        return true
      } else {
        return false
      }

    })

    const  fillColor = computed(() => {
      // console.log(this.band)
      switch (props.band) {
        case "80m":
          return "#e54be0"
        case "60m":
          return "#0D0067"
        case "40m":
          return "blue";
        case "30m":
          return "green";
        case "20m":
          return "orange";
        case "17m":
          return "yellow";
        case "15m":
          return "#CAA36A";
        case "12m":
          return "#B11A28"
        case "10m":
          return "pink";
        case "6m":
          return "#FD001D";
      }
      return "grey";
    })

    //const strokeWidth = ref(1);
    const strokeColor = ref("gray");
    //const fillColor = ref("white");
    const selectConditions = null;

    const selectCondition = null;

    // const featureSelected = (event) => {
    //   console.log(event.selected[0]);
    // };

    // const selectInteactionFilter = (feature) => {
    //   return feature.values_.name != undefined;
    // };

    watch(radius, (n,o) => {
      console.log("CHANGE", n, o)
    })

    onMounted(() => {
    // this.selectConditions = inject("ol-selectconditions");
    // this.selectCondition = this.selectConditions.pointerMove;
    //console.log("fff", this.band)
    // console.log("PROPS ", props)
  })

    return {
      store,
      markerIcon,
      fillColor,
      coordinate,
      selectConditions,
      selectCondition,
      //featureSelected,
      //selectInteactionFilter, // coordinate,
      radius,
      owncall,
      strokeWidth,
      strokeColor,
      snr,
      fstyle,
      offsetX
      //fillColor,
    };
  },


  data() {
    return {
      aaa: 123,
      to: null,
    };
  },
  // mounFFted() {
  //   // this.to = setTimeout(() => {
  //   //   this.$destroy();
  //   //   this.$el.parentNode.removeChild(this.$el);
  //   //   console.log("bye bye", this.sequenceNumber);
  //   //   this.$emit("delete", this.sequenceNumber);
  //   // }, 15000);
  // },
  methods: {
    // clearTo(){
    // if(this.to) {
    //   console.log("Clearing", this.to)
    //   clearTimeout(this.to)
    // }
    // }
     things() {
      return {seqno: this.sequenceNumber}
    },
     },
  components: {
    // olFeatureP
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

.overlay-content {
  background: #efefef;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 14px;
}
</style>

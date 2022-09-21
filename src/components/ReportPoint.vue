<template>
  <ol-feature>
    <!-- <ol-overlay :position="coordinate">
        <template v-slot="slotProps">
            <div class="overlay-content">
                Hello world!<br>
                Position: {{ slotProps.position }}
            </div>
        </template>
    </ol-overlay> -->
    <ol-geom-point :coordinates="coordinate"></ol-geom-point>
    <ol-style>
      <ol-style-circle :radius="radius">
        <ol-style-fill :color="fillColor()"></ol-style-fill>
        <ol-style-stroke
          :color="strokeColor"
          :width="strokeWidth"
        ></ol-style-stroke>
      </ol-style-circle>
    </ol-style>
  </ol-feature>
</template>

<script>
// import { METHODS } from "http";
import { ref } from "vue";
// import {unmount} from 'App'

// import OpenLayersMap from 'vue3-openlayers'

export default {
  name: "ReportPoint",
  props: ["coordinate", "sequenceNumber", "band"],
  emits: ["delete"],
  setup() {
    // const coordinate = ref([-0.224, 51.555]);
    const radius = ref(3);
    const strokeWidth = ref(1);
    const strokeColor = ref("gray");
    //const fillColor = ref("white");

    return {
      // coordinate,
      radius,
      strokeWidth,
      strokeColor,
      //fillColor,
    };
  },
  data() {
    return {
      to: null,
    };
  },
  mounted() {
    // this.to = setTimeout(() => {
    //   this.$destroy();
    //   this.$el.parentNode.removeChild(this.$el);
    //   console.log("bye bye", this.sequenceNumber);
    //   this.$emit("delete", this.sequenceNumber);
    // }, 15000);
  },
  methods: {
    // clearTo(){
    // if(this.to) {
    //   console.log("Clearing", this.to)
    //   clearTimeout(this.to)
    // }
    // }
    fillColor(){
      // console.log(this.band)
      switch(this.band) {
        case "20m":
          return "orange"
        case "40m":
          return "blue"
        case "17m":
          return "yellow"
          case "15m":
          return "brown"
        case "10m":
          return "pink"
      }
      return "grey"
    }
  },
  components() {},
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

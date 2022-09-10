<template>
  <ol-feature>
    <ol-geom-point :coordinates="coordinate"></ol-geom-point>
    <ol-style>
      <ol-style-circle :radius="radius">
        <ol-style-fill :color="fillColor"></ol-style-fill>
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

// import OpenLayersMap from 'vue3-openlayers'

export default {
  name: "ReportPoint",
  props: ['coordinate'],
  setup() {
    // const coordinate = ref([-0.224, 51.555]);
    const radius = ref(3);
    const strokeWidth = ref(1);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    console.log("SETUP!");

    return {
      // coordinate,
      radius,
      strokeWidth,
      strokeColor,
      fillColor,
    };
  },
  methods: {},
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
</style>

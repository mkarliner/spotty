<template>
  <div>
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 400px; width: 400px"
    >
      <ol-view
        ref="view"
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
          <ol-feature v-for="p in report_points" v-bind:key="p">
            <ReportPoint ></ReportPoint>
            <!-- <ReportPoint :center="p.name"></ReportPoint> -->
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
    </ol-map>
  </div>
</template>

<script>
import { useMQTT } from 'mqtt-vue-hook'
const mqttHook = useMQTT()
mqttHook.subscribe(["pskr/filter/+/+/+/+/IO91/#"])
mqttHook.registerEvent(
		'pskr/filter/+/+/+/+/IO91/#',
		(topic, message) => {
			const mesJson = JSON.parse(message.toString())
			console.log(mesJson, topic)
			// ElNotification({
			// 	title: `MQTT TOPIC: ${topic}`,
			// 	message: mesJson,
			// 	type: 'info',
			// })
		},
	)
import { ref } from "vue";
import ReportPoint from "src/components/ReportPoint.vue";
// import ReportPoint from "./ReportPoint.vue";
// import OpenLayersMap from 'vue3-openlayers'
export default {
  // name: 'OlMap',
  setup() {
    const center = ref([-0.224, 51.555]);
    const projection = ref("EPSG:4326");
    const zoom = ref(8);
    const rotation = ref(0);
    const radius = ref(5);
    const strokeWidth = ref(10);
    const strokeColor = ref("red");
    const fillColor = ref("white");
    const coordinate = ref([-0.224, 51.555]);
    console.log("Boo!");
    // var instance = new ReportPoint({});
    // this.$refs.container.addComponent(instance);

    return {
      center,
      projection,
      zoom,
      rotation,
      radius,
      strokeWidth,
      strokeColor,
      fillColor,
      coordinate,
    };
  },
  data() {
    const report_points = [{ center: [-0.224, 51.555] }];
    return {
      report_points: report_points,
    };
  },
  methods: {
    // report_points() {
    //   return [
    //     {center: [-0.224, 51.555]}
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

<template>
  <q-page class="map-page">
    <OlMap />
  </q-page>
</template>

<script>
// import OlMap from "OlMap";
import { defineComponent } from "vue";
import OlMap from "src/components/OlMap.vue";
// import OlMap from "../components/OlMap.vue";

export default defineComponent({
  name: "IndexPage",
  components: { OlMap },
});
</script>

<style scoped>
.map-page {
  padding: 0;
  height: 100%;
  overflow: hidden;
}
</style>

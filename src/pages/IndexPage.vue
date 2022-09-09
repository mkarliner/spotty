<template>
  <q-page class="flex flex-center">
    <div>foo</div>
    <OlMap></OlMap>
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

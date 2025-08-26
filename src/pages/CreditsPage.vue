<template>
  <div class="txtbody">
    <Markdown :source="source" />
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  components: {
    Markdown,
  },
  data() {
    return {
      source: `


## Credits

- Philip Gladstone - N1DQfor https://pskreporter.info/
- Tom Stanton - M0LTE - mqtt.pskreporter.info, the MQTT feed for this site

Thank you both, G8LKD - Mike Karliner, Spotty author.



      `,
    };
  },
};
</script>

<style scoped>
.txtbody {
  width: 50%;
  padding-top: 120px;
  min-height: 100vh;
  margin: 0 auto;
}

@media (max-width: 599px) {
  .txtbody {
    width: 90%;
    padding-top: 140px;
  }
}

h2 {
  font-size: 1rem;
}
</style>

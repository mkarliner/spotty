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


## Welcome to Spotty

Spotty is a web application that shows near real-time spots for data provided by Philip Gladstone at pskreporter.info and an MQTT broker provided by M0LTE - Tom Fanning.

### Map View
The initial view is a map showing signals transmitted from the grid square AA00
and the callsign MY8CALL.
Signals are shown for 60 seconds after they are first reported.
These can be changed on the settings tab.

Clicking on a spot brings up a overlay with details for the spot.
Clicking out of the overlay dismisses it.
Small spots are those heard by the specified location/callsign.
Large spots are tranmissions from the location.
Teardrop markers are spots for transmissions from the specified callsign.

### Log View
There is also a 'log' view which shows a scrolling list of spots.

### Settings
Settings are as follows, they are saved on your browser.
#### Track Callsign / Grid
Enables tracking of the specified callsign or grid

##### Callsign
Callsign to monitor
##### Grid
Grid to monitor

##### Time to Live
How long a spot is shown after first being reported. The default is 60 seconds.




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

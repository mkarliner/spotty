<template>
  <div>
    <Markdown :source="source" />
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
  components: {
    Markdown
  },
  data() {
    return {
      source:
`


## Welcome to Spotty

Spotty is a web application that shows near real-time spots for data provided by Philip Gladstone at pskreporter.info and an MQTT broker provided by M0LTE - Tom Fanning.

### Map View
The initial view is a map showing signals transmitted from the grid square IO91 (South East England). Signals are shown for 60 seconds after they are first reported. This can be changed on the settings tab.
Clicking on a spot brings up a overlay with details for the spot. Clicking out of the overlay dismisses it.
Small spots are those heard by the specified location/callsign. Large spots are tranmissions from the location.
Teardrop markers are spots for transmissions from the specified callsign.

### Log View
There is also a 'log' view which shows a scrolling list of spots.

### Settings
Settings are as follows, they are saved on your browser.
#### Callsign / Grid
Switches between single callsign monitoring and grid square monitoring
#### Broker
The URL of the broker to use as a feed. There is only one active broker at the moment, so leave this setting alone
##### Callsign
Callsign to monitor
##### Grid
Grid to monitor
##### Topic
MQTT topic for filtering the feed. Only use this if you are comfortable with MQTT. Note that excessive wildcarding will rapidly slow your computer and create excessive bandwidth use on the broker. Use with care.
##### Time to Live
How long a spot is shown after first being reported. The default is 60 seconds.




      `
    }
  }
}
</script>



<style scoped>
h2 {
  font-size: 1rem;
}

</style>

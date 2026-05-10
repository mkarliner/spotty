import{M as s}from"./vue3-markdown-it.umd.min-BB536XMS.js";import{_ as a,V as t,a as r,o as i,N as n}from"./index-CqwXFlI7.js";const l={components:{Markdown:s},data(){return{source:`


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

#### Modes
There are two modes for the map view, global and grid. Global view shows a 1% sample of all spots, while grid view shows all spots for the specified grid/callsign

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




      `}}},c={class:"txtbody"};function d(p,h,g,f,e,m){const o=t("Markdown");return i(),r("div",c,[n(o,{source:e.source},null,8,["source"])])}const u=a(l,[["render",d],["__scopeId","data-v-c66a3ceb"]]);export{u as default};

import{S as e}from"./index.b8d17992.js";const s=e("settings",{state:()=>({topic:"adfsf",report_points:{},report_ttl:60,callsign:"MY8CALL",grid:"AA91",mode:"grid",last_spot:Date.now(),track_callsign:!0,track_grid:!0}),persist:{afterRestore:t=>{t.store.$state.report_points={},console.log("REST: ",t.store.$state)}},getters:{getTopic(t){return t.topic},getReportPoints(t){return console.log("sss"),t.report_points}},actions:{deletePoint(t){delete this.report_points[t.toString()]},setTopic(t){this.topic=t}}});export{s as u};

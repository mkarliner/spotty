import{c as w,a as z}from"./render.b9a8b78e.js";import{i as x,f as C,m as B,E as F,F as j,y as I,_ as y,r as t,L as e,b as d,G as g,H as a,I as r,c as P,U as R,V as W,T as E,J as H}from"./index.a9265805.js";var M=w({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(l,{slots:i}){const{proxy:{$q:s}}=I(),o=x(F);x(j,()=>{console.error("QPage needs to be child of QPageContainer")});const c=C(()=>{const n=(o.header.space===!0?o.header.size:0)+(o.footer.space===!0?o.footer.size:0);if(typeof l.styleFn=="function"){const _=o.isContainer.value===!0?o.containerHeight.value:s.screen.height;return l.styleFn(n,_)}return{minHeight:o.isContainer.value===!0?o.containerHeight.value-n+"px":s.screen.height===0?n!==0?`calc(100vh - ${n}px)`:"100vh":s.screen.height-n+"px"}}),p=C(()=>`q-page ${l.padding===!0?" q-layout-padding":""}`);return()=>B("main",{class:p.value,style:c.value},z(i.default))}});const O={name:"ReportPoint",props:{},setup(){const l=t([-.224,51.555]),i=t(5),s=t(10),o=t("red"),c=t("white");return console.log("SETUP!"),{coordinate:l,radius:i,strokeWidth:s,strokeColor:o,fillColor:c}},methods:{},components(){}};function Q(l,i,s,o,c,p){const n=e("ol-geom-point"),_=e("ol-style-fill"),u=e("ol-style-stroke"),m=e("ol-style-circle"),f=e("ol-style"),h=e("ol-feature");return d(),g(h,null,{default:a(()=>[r(n,{coordinates:o.coordinate},null,8,["coordinates"]),r(f,null,{default:a(()=>[r(m,{radius:o.radius},{default:a(()=>[r(_,{color:o.fillColor},null,8,["color"]),r(u,{color:o.strokeColor,width:o.strokeWidth},null,8,["color","width"])]),_:1},8,["radius"])]),_:1})]),_:1})}var T=y(O,[["render",Q]]);const q={setup(){const l=t([-.224,51.555]),i=t("EPSG:4326"),s=t(8),o=t(0),c=t(5),p=t(10),n=t("red"),_=t("white"),u=t([-.224,51.555]);return console.log("Boo!"),{center:l,projection:i,zoom:s,rotation:o,radius:c,strokeWidth:p,strokeColor:n,fillColor:_,coordinate:u}},data(){return{report_points:[{center:[-.224,51.555]}]}},methods:{},components:{ReportPoint:T}};function S(l,i,s,o,c,p){const n=e("ol-view"),_=e("ol-source-osm"),u=e("ol-tile-layer"),m=e("ReportPoint"),f=e("ol-feature"),h=e("ol-source-vector"),k=e("ol-vector-layer"),$=e("ol-map",!0);return d(),P("div",null,[r($,{loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,style:{height:"400px",width:"400px"}},{default:a(()=>[r(n,{ref:"view",center:o.center,rotation:o.rotation,zoom:o.zoom,projection:o.projection},null,8,["center","rotation","zoom","projection"]),r(u,null,{default:a(()=>[r(_)]),_:1}),r(k,null,{default:a(()=>[r(h,null,{default:a(()=>[(d(!0),P(R,null,W(c.report_points,v=>(d(),g(f,{key:v},{default:a(()=>[r(m,{center:v.name},null,8,["center"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})])}var V=y(q,[["render",S]]);const b=E({name:"IndexPage",components:{OlMap:V}}),G=H("div",null,"foo",-1);function K(l,i,s,o,c,p){const n=e("OlMap");return d(),g(M,{class:"flex flex-center"},{default:a(()=>[G,r(n)]),_:1})}var U=y(b,[["render",K]]);export{U as default};
import{g as c,U as T,x as P,l as d,V as K,s as V,W as F,X as N,Y as Q,Z as U}from"./index.8fecc1f8.js";import{c as D,h as H,a as b,d as X}from"./render.74b52e82.js";function Y(e){return e.appContext.config.globalProperties.$router!==void 0}function E(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function w(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function W(e,t){for(const r in t){const s=t[r],a=e[r];if(typeof s=="string"){if(s!==a)return!1}else if(Array.isArray(a)===!1||a.length!==s.length||s.some((i,o)=>i!==a[o]))return!1}return!0}function C(e,t){return Array.isArray(t)===!0?e.length===t.length&&e.every((r,s)=>r===t[s]):e.length===1&&e[0]===t}function Z(e,t){return Array.isArray(e)===!0?C(e,t):Array.isArray(t)===!0?C(t,e):e===t}function G(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const r in e)if(Z(e[r],t[r])===!1)return!1;return!0}const de={to:[String,Object],replace:Boolean,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"},href:String,target:String,disable:Boolean};function ve(e){const t=P(),{props:r,proxy:s}=t,a=Y(t),i=c(()=>r.disable!==!0&&r.href!==void 0),o=c(()=>a===!0&&r.disable!==!0&&i.value!==!0&&r.to!==void 0&&r.to!==null&&r.to!==""),n=c(()=>{if(o.value===!0)try{return s.$router.resolve(r.to)}catch{}return null}),f=c(()=>n.value!==null),y=c(()=>i.value===!0||f.value===!0),u=c(()=>r.type==="a"||y.value===!0?"a":r.tag||e||"div"),v=c(()=>i.value===!0?{href:r.href,target:r.target}:f.value===!0?{href:n.value.href,target:r.target}:{}),g=c(()=>{if(f.value===!1)return null;const{matched:l}=n.value,{length:h}=l,$=l[h-1];if($===void 0)return-1;const m=s.$route.matched;if(m.length===0)return-1;const _=m.findIndex(w.bind(null,$));if(_>-1)return _;const q=E(l[h-2]);return h>1&&E($)===q&&m[m.length-1].path!==q?m.findIndex(w.bind(null,l[h-2])):_}),p=c(()=>f.value===!0&&g.value>-1&&W(s.$route.params,n.value.params)),k=c(()=>p.value===!0&&g.value===s.$route.matched.length-1&&G(s.$route.params,n.value.params)),x=c(()=>f.value===!0?k.value===!0?` ${r.exactActiveClass} ${r.activeClass}`:r.exact===!0?"":p.value===!0?` ${r.activeClass}`:"":"");function R(l){return r.disable===!0||l.metaKey||l.altKey||l.ctrlKey||l.shiftKey||l.__qNavigate!==!0&&l.defaultPrevented===!0||l.button!==void 0&&l.button!==0||r.target==="_blank"?!1:(T(l),s.$router[r.replace===!0?"replace":"push"](r.to).catch(h=>h))}return{hasRouterLink:f,hasHrefLink:i,hasLink:y,linkTag:u,linkRoute:n,linkIsActive:p,linkIsExactActive:k,linkClass:x,linkProps:v,navigateToRouterLink:R}}const J={xs:18,sm:24,md:32,lg:38,xl:46},ee={size:String};function te(e,t=J){return c(()=>e.size!==void 0?{fontSize:e.size in t?`${t[e.size]}px`:e.size}:null)}const A="0 0 24 24",O=e=>e,S=e=>`ionicons ${e}`,j={"mdi-":e=>`mdi ${e}`,"icon-":O,"bt-":e=>`bt ${e}`,"eva-":e=>`eva ${e}`,"ion-md":S,"ion-ios":S,"ion-logo":S,"iconfont ":O,"ti-":e=>`themify-icon ${e}`,"bi-":e=>`bootstrap-icons ${e}`},z={o_:"-outlined",r_:"-round",s_:"-sharp"},I={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},re=new RegExp("^("+Object.keys(j).join("|")+")"),ne=new RegExp("^("+Object.keys(z).join("|")+")"),B=new RegExp("^("+Object.keys(I).join("|")+")"),se=/^[Mm]\s?[-+]?\.?\d/,ae=/^img:/,oe=/^svguse:/,ie=/^ion-/,ue=/^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;var me=D({name:"QIcon",props:{...ee,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(e,{slots:t}){const{proxy:{$q:r}}=P(),s=te(e),a=c(()=>"q-icon"+(e.left===!0?" on-left":"")+(e.right===!0?" on-right":"")+(e.color!==void 0?` text-${e.color}`:"")),i=c(()=>{let o,n=e.name;if(n==="none"||!n)return{none:!0};if(r.iconMapFn!==null){const u=r.iconMapFn(n);if(u!==void 0)if(u.icon!==void 0){if(n=u.icon,n==="none"||!n)return{none:!0}}else return{cls:u.cls,content:u.content!==void 0?u.content:" "}}if(se.test(n)===!0){const[u,v=A]=n.split("|");return{svg:!0,viewBox:v,nodes:u.split("&&").map(g=>{const[p,k,x]=g.split("@@");return d("path",{style:k,d:p,transform:x})})}}if(ae.test(n)===!0)return{img:!0,src:n.substring(4)};if(oe.test(n)===!0){const[u,v=A]=n.split("|");return{svguse:!0,src:u.substring(7),viewBox:v}}let f=" ";const y=n.match(re);if(y!==null)o=j[y[1]](n);else if(ue.test(n)===!0)o=n;else if(ie.test(n)===!0)o=`ionicons ion-${r.platform.is.ios===!0?"ios":"md"}${n.substring(3)}`;else if(B.test(n)===!0){o="notranslate material-symbols";const u=n.match(B);u!==null&&(n=n.substring(6),o+=I[u[1]]),f=n}else{o="notranslate material-icons";const u=n.match(ne);u!==null&&(n=n.substring(2),o+=z[u[1]]),f=n}return{cls:o,content:f}});return()=>{const o={class:a.value,style:s.value,"aria-hidden":"true",role:"presentation"};return i.value.none===!0?d(e.tag,o,H(t.default)):i.value.img===!0?d("span",o,b(t.default,[d("img",{src:i.value.src})])):i.value.svg===!0?d("span",o,b(t.default,[d("svg",{viewBox:i.value.viewBox||"0 0 24 24"},i.value.nodes)])):i.value.svguse===!0?d("span",o,b(t.default,[d("svg",{viewBox:i.value.viewBox},[d("use",{"xlink:href":i.value.src})])])):(i.value.cls!==void 0&&(o.class+=" "+i.value.cls),d(e.tag,o,b(t.default,[i.value.content])))}}});function le(e,t){const r=e.style;for(const s in t)r[s]=t[s]}function ge(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const t=K(e)===!0?e.value:e;if(t)return t.$el||t}function ce(e,t=250){let r=!1,s;return function(){return r===!1&&(r=!0,setTimeout(()=>{r=!1},t),s=e.apply(this,arguments)),s}}function L(e,t,r,s){r.modifiers.stop===!0&&Q(e);const a=r.modifiers.color;let i=r.modifiers.center;i=i===!0||s===!0;const o=document.createElement("span"),n=document.createElement("span"),f=U(e),{left:y,top:u,width:v,height:g}=t.getBoundingClientRect(),p=Math.sqrt(v*v+g*g),k=p/2,x=`${(v-p)/2}px`,R=i?x:`${f.left-y-k}px`,l=`${(g-p)/2}px`,h=i?l:`${f.top-u-k}px`;n.className="q-ripple__inner",le(n,{height:`${p}px`,width:`${p}px`,transform:`translate3d(${R},${h},0) scale3d(.2,.2,1)`,opacity:0}),o.className=`q-ripple${a?" text-"+a:""}`,o.setAttribute("dir","ltr"),o.appendChild(n),t.appendChild(o);const $=()=>{o.remove(),clearTimeout(m)};r.abort.push($);let m=setTimeout(()=>{n.classList.add("q-ripple__inner--enter"),n.style.transform=`translate3d(${x},${l},0) scale3d(1,1,1)`,n.style.opacity=.2,m=setTimeout(()=>{n.classList.remove("q-ripple__inner--enter"),n.classList.add("q-ripple__inner--leave"),n.style.opacity=0,m=setTimeout(()=>{o.remove(),r.abort.splice(r.abort.indexOf($),1)},275)},250)},50)}function M(e,{modifiers:t,value:r,arg:s}){const a=Object.assign({},e.cfg.ripple,t,r);e.modifiers={early:a.early===!0,stop:a.stop===!0,center:a.center===!0,color:a.color||s,keyCodes:[].concat(a.keyCodes||13)}}var he=X({name:"ripple",beforeMount(e,t){const r=t.instance.$.appContext.config.globalProperties.$q.config||{};if(r.ripple===!1)return;const s={cfg:r,enabled:t.value!==!1,modifiers:{},abort:[],start(a){s.enabled===!0&&a.qSkipRipple!==!0&&a.type===(s.modifiers.early===!0?"pointerdown":"click")&&L(a,e,s,a.qKeyEvent===!0)},keystart:ce(a=>{s.enabled===!0&&a.qSkipRipple!==!0&&V(a,s.modifiers.keyCodes)===!0&&a.type===`key${s.modifiers.early===!0?"down":"up"}`&&L(a,e,s,!0)},300)};M(s,t),e.__qripple=s,F(s,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,t){if(t.oldValue!==t.value){const r=e.__qripple;r!==void 0&&(r.enabled=t.value!==!1,r.enabled===!0&&Object(t.value)===t.value&&M(r,t))}},beforeUnmount(e){const t=e.__qripple;t!==void 0&&(t.abort.forEach(r=>{r()}),N(t,"main"),delete e._qripple)}});export{me as Q,he as R,ve as a,te as b,le as c,ee as d,J as e,ge as g,de as u};

import{g as u,X as O,A as P,Y as S,x as E,Z as w,$ as T,a0 as I,a1 as K}from"./index.2fd01390.js";import{d as j}from"./render.bed6c657.js";function M(e){return e.appContext.config.globalProperties.$router!==void 0}function _(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function A(e,r){return(e.aliasOf||e)===(r.aliasOf||r)}function B(e,r){for(const t in r){const a=r[t],n=e[t];if(typeof a=="string"){if(a!==n)return!1}else if(Array.isArray(n)===!1||n.length!==a.length||a.some((i,l)=>i!==n[l]))return!1}return!0}function C(e,r){return Array.isArray(r)===!0?e.length===r.length&&e.every((t,a)=>t===r[a]):e.length===1&&e[0]===r}function N(e,r){return Array.isArray(e)===!0?C(e,r):Array.isArray(r)===!0?C(r,e):e===r}function V(e,r){if(Object.keys(e).length!==Object.keys(r).length)return!1;for(const t in e)if(N(e[t],r[t])===!1)return!1;return!0}const U={to:[String,Object],replace:Boolean,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"},href:String,target:String,disable:Boolean};function Z(e){const r=P(),{props:t,proxy:a}=r,n=M(r),i=u(()=>t.disable!==!0&&t.href!==void 0),l=u(()=>n===!0&&t.disable!==!0&&i.value!==!0&&t.to!==void 0&&t.to!==null&&t.to!==""),o=u(()=>{if(l.value===!0)try{return a.$router.resolve(t.to)}catch{}return null}),c=u(()=>o.value!==null),g=u(()=>i.value===!0||c.value===!0),$=u(()=>t.type==="a"||g.value===!0?"a":t.tag||e||"div"),y=u(()=>i.value===!0?{href:t.href,target:t.target}:c.value===!0?{href:o.value.href,target:t.target}:{}),v=u(()=>{if(c.value===!1)return null;const{matched:s}=o.value,{length:d}=s,m=s[d-1];if(m===void 0)return-1;const f=a.$route.matched;if(f.length===0)return-1;const R=f.findIndex(A.bind(null,m));if(R>-1)return R;const q=_(s[d-2]);return d>1&&_(m)===q&&f[f.length-1].path!==q?f.findIndex(A.bind(null,s[d-2])):R}),p=u(()=>c.value===!0&&v.value>-1&&B(a.$route.params,o.value.params)),h=u(()=>p.value===!0&&v.value===a.$route.matched.length-1&&V(a.$route.params,o.value.params)),k=u(()=>c.value===!0?h.value===!0?` ${t.exactActiveClass} ${t.activeClass}`:t.exact===!0?"":p.value===!0?` ${t.activeClass}`:"":"");function x(s){return t.disable===!0||s.metaKey||s.altKey||s.ctrlKey||s.shiftKey||s.__qNavigate!==!0&&s.defaultPrevented===!0||s.button!==void 0&&s.button!==0||t.target==="_blank"?!1:(O(s),a.$router[t.replace===!0?"replace":"push"](t.to).catch(d=>d))}return{hasRouterLink:c,hasHrefLink:i,hasLink:g,linkTag:$,linkRoute:o,linkIsActive:p,linkIsExactActive:h,linkClass:k,linkProps:y,navigateToRouterLink:x}}function H(e,r){const t=e.style;for(const a in r)t[a]=r[a]}function z(e){if(e==null)return;if(typeof e=="string")try{return document.querySelector(e)||void 0}catch{return}const r=S(e)===!0?e.value:e;if(r)return r.$el||r}function X(e,r=250){let t=!1,a;return function(){return t===!1&&(t=!0,setTimeout(()=>{t=!1},r),a=e.apply(this,arguments)),a}}function b(e,r,t,a){t.modifiers.stop===!0&&I(e);const n=t.modifiers.color;let i=t.modifiers.center;i=i===!0||a===!0;const l=document.createElement("span"),o=document.createElement("span"),c=K(e),{left:g,top:$,width:y,height:v}=r.getBoundingClientRect(),p=Math.sqrt(y*y+v*v),h=p/2,k=`${(y-p)/2}px`,x=i?k:`${c.left-g-h}px`,s=`${(v-p)/2}px`,d=i?s:`${c.top-$-h}px`;o.className="q-ripple__inner",H(o,{height:`${p}px`,width:`${p}px`,transform:`translate3d(${x},${d},0) scale3d(.2,.2,1)`,opacity:0}),l.className=`q-ripple${n?" text-"+n:""}`,l.setAttribute("dir","ltr"),l.appendChild(o),r.appendChild(l);const m=()=>{l.remove(),clearTimeout(f)};t.abort.push(m);let f=setTimeout(()=>{o.classList.add("q-ripple__inner--enter"),o.style.transform=`translate3d(${k},${s},0) scale3d(1,1,1)`,o.style.opacity=.2,f=setTimeout(()=>{o.classList.remove("q-ripple__inner--enter"),o.classList.add("q-ripple__inner--leave"),o.style.opacity=0,f=setTimeout(()=>{l.remove(),t.abort.splice(t.abort.indexOf(m),1)},275)},250)},50)}function L(e,{modifiers:r,value:t,arg:a}){const n=Object.assign({},e.cfg.ripple,r,t);e.modifiers={early:n.early===!0,stop:n.stop===!0,center:n.center===!0,color:n.color||a,keyCodes:[].concat(n.keyCodes||13)}}var F=j({name:"ripple",beforeMount(e,r){const t=r.instance.$.appContext.config.globalProperties.$q.config||{};if(t.ripple===!1)return;const a={cfg:t,enabled:r.value!==!1,modifiers:{},abort:[],start(n){a.enabled===!0&&n.qSkipRipple!==!0&&n.type===(a.modifiers.early===!0?"pointerdown":"click")&&b(n,e,a,n.qKeyEvent===!0)},keystart:X(n=>{a.enabled===!0&&n.qSkipRipple!==!0&&E(n,a.modifiers.keyCodes)===!0&&n.type===`key${a.modifiers.early===!0?"down":"up"}`&&b(n,e,a,!0)},300)};L(a,r),e.__qripple=a,w(a,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,r){if(r.oldValue!==r.value){const t=e.__qripple;t!==void 0&&(t.enabled=r.value!==!1,t.enabled===!0&&Object(r.value)===r.value&&L(t,r))}},beforeUnmount(e){const r=e.__qripple;r!==void 0&&(r.abort.forEach(t=>{t()}),T(r,"main"),delete e._qripple)}});export{F as R,Z as a,H as c,z as g,U as u};

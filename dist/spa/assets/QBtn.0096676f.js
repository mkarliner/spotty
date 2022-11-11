import{g as u,q as i,r as M,s as F,a8 as G,v as J,A as Y,z as f,x as _,W as Z,$ as p,D as ee}from"./index.21ac0c82.js";import{b as j,u as te,a as ne,Q as A}from"./QIcon.27348566.js";import{c as Q,a as ae}from"./render.d9ccab24.js";import{a as le,u as ue,R as ie}from"./Ripple.485cf342.js";const re={size:{type:[Number,String],default:"1em"},color:String};function oe(e){return{cSize:u(()=>e.size in j?`${j[e.size]}px`:e.size),classes:u(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}var se=Q({name:"QSpinner",props:{...re,thickness:{type:Number,default:5}},setup(e){const{cSize:o,classes:s}=oe(e);return()=>i("svg",{class:s.value+" q-spinner-mat",width:o.value,height:o.value,viewBox:"25 25 50 50"},[i("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});const K={left:"start",center:"center",right:"end",between:"between",around:"around",evenly:"evenly",stretch:"stretch"},ce=Object.keys(K),de={align:{type:String,validator:e=>ce.includes(e)}};function ve(e){return u(()=>{const o=e.align===void 0?e.vertical===!0?"stretch":"left":e.align;return`${e.vertical===!0?"items":"justify"}-${K[o]}`})}const O={none:0,xs:4,sm:8,md:16,lg:24,xl:32},fe={xs:8,sm:10,md:14,lg:20,xl:24},be=["button","submit","reset"],ge=/[^\s]\/[^\s]/,me={...ne,...ue,type:{type:String,default:"button"},label:[Number,String],icon:String,iconRight:String,round:Boolean,square:Boolean,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,fab:Boolean,fabMini:Boolean,padding:String,color:String,textColor:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,tabindex:[Number,String],ripple:{type:[Boolean,Object],default:!0},align:{...de.align,default:"center"},stack:Boolean,stretch:Boolean,loading:{type:Boolean,default:null},disable:Boolean};function he(e){const o=te(e,fe),s=ve(e),{hasRouterLink:q,hasLink:x,linkTag:L,linkProps:B,navigateToRouterLink:w}=le("button"),C=u(()=>{const a=e.fab===!1&&e.fabMini===!1?o.value:{};return e.padding!==void 0?Object.assign({},a,{padding:e.padding.split(/\s+/).map(v=>v in O?O[v]+"px":v).join(" "),minWidth:"0",minHeight:"0"}):a}),P=u(()=>e.rounded===!0||e.fab===!0||e.fabMini===!0),h=u(()=>e.disable!==!0&&e.loading!==!0),T=u(()=>h.value===!0?e.tabindex||0:-1),R=u(()=>e.flat===!0?"flat":e.outline===!0?"outline":e.push===!0?"push":e.unelevated===!0?"unelevated":"standard"),n=u(()=>{const a={tabindex:T.value};return x.value===!0?Object.assign(a,B.value):be.includes(e.type)===!0&&(a.type=e.type),L.value==="a"?(e.disable===!0?a["aria-disabled"]="true":a.href===void 0&&(a.role="button"),q.value!==!0&&ge.test(e.type)===!0&&(a.type=e.type)):e.disable===!0&&(a.disabled="",a["aria-disabled"]="true"),e.loading===!0&&e.percentage!==void 0&&Object.assign(a,{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percentage}),a}),E=u(()=>{let a;e.color!==void 0?e.flat===!0||e.outline===!0?a=`text-${e.textColor||e.color}`:a=`bg-${e.color} text-${e.textColor||"white"}`:e.textColor&&(a=`text-${e.textColor}`);const v=e.round===!0?"round":`rectangle${P.value===!0?" q-btn--rounded":e.square===!0?" q-btn--square":""}`;return`q-btn--${R.value} q-btn--${v}`+(a!==void 0?" "+a:"")+(h.value===!0?" q-btn--actionable q-focusable q-hoverable":e.disable===!0?" disabled":"")+(e.fab===!0?" q-btn--fab":e.fabMini===!0?" q-btn--fab-mini":"")+(e.noCaps===!0?" q-btn--no-uppercase":"")+(e.dense===!0?" q-btn--dense":"")+(e.stretch===!0?" no-border-radius self-stretch":"")+(e.glossy===!0?" glossy":"")+(e.square?" q-btn--square":"")}),d=u(()=>s.value+(e.stack===!0?" column":" row")+(e.noWrap===!0?" no-wrap text-no-wrap":"")+(e.loading===!0?" q-btn__content--hidden":""));return{classes:E,style:C,innerClasses:d,attributes:n,hasRouterLink:q,hasLink:x,linkTag:L,navigateToRouterLink:w,isActionable:h}}const{passiveCapture:r}=ee;let b=null,g=null,m=null;var Le=Q({name:"QBtn",props:{...me,percentage:Number,darkPercentage:Boolean},emits:["click","keydown","touchstart","mousedown","keyup"],setup(e,{slots:o,emit:s}){const{proxy:q}=Y(),{classes:x,style:L,innerClasses:B,attributes:w,hasRouterLink:C,hasLink:P,linkTag:h,navigateToRouterLink:T,isActionable:R}=he(e),n=M(null),E=M(null);let d=null,a,v;const z=u(()=>e.label!==void 0&&e.label!==null&&e.label!==""),N=u(()=>e.disable===!0||e.ripple===!1?!1:{keyCodes:P.value===!0?[13,32]:[13],...e.ripple===!0?{}:e.ripple}),W=u(()=>({center:e.round})),D=u(()=>{const t=Math.max(0,Math.min(100,e.percentage));return t>0?{transition:"transform 0.6s",transform:`translateX(${t-100}%)`}:{}}),I=u(()=>e.loading===!0?{onMousedown:k,onTouchstartPassive:k,onClick:k,onKeydown:k,onKeyup:k}:R.value===!0?{onClick:$,onKeydown:U,onMousedown:X,onTouchstart:V}:{onClick:f}),H=u(()=>({ref:n,class:"q-btn q-btn-item non-selectable no-outline "+x.value,style:L.value,...w.value,...I.value}));function $(t){if(n.value!==null){if(t!==void 0){if(t.defaultPrevented===!0)return;const l=document.activeElement;if(e.type==="submit"&&l!==document.body&&n.value.contains(l)===!1&&l.contains(n.value)===!1){n.value.focus();const S=()=>{document.removeEventListener("keydown",f,!0),document.removeEventListener("keyup",S,r),n.value!==null&&n.value.removeEventListener("blur",S,r)};document.addEventListener("keydown",f,!0),document.addEventListener("keyup",S,r),n.value.addEventListener("blur",S,r)}}if(C.value===!0){const l=()=>{t.__qNavigate=!0,T(t)};s("click",t,l),t.defaultPrevented!==!0&&l()}else s("click",t)}}function U(t){n.value!==null&&(s("keydown",t),_(t,[13,32])===!0&&g!==n.value&&(g!==null&&y(),t.defaultPrevented!==!0&&(n.value.focus(),g=n.value,n.value.classList.add("q-btn--active"),document.addEventListener("keyup",c,!0),n.value.addEventListener("blur",c,r)),f(t)))}function V(t){n.value!==null&&(s("touchstart",t),t.defaultPrevented!==!0&&(b!==n.value&&(b!==null&&y(),b=n.value,d=t.target,d.addEventListener("touchcancel",c,r),d.addEventListener("touchend",c,r)),a=!0,clearTimeout(v),v=setTimeout(()=>{a=!1},200)))}function X(t){n.value!==null&&(t.qSkipRipple=a===!0,s("mousedown",t),t.defaultPrevented!==!0&&m!==n.value&&(m!==null&&y(),m=n.value,n.value.classList.add("q-btn--active"),document.addEventListener("mouseup",c,r)))}function c(t){if(n.value!==null&&!(t!==void 0&&t.type==="blur"&&document.activeElement===n.value)){if(t!==void 0&&t.type==="keyup"){if(g===n.value&&_(t,[13,32])===!0){const l=new MouseEvent("click",t);l.qKeyEvent=!0,t.defaultPrevented===!0&&Z(l),t.cancelBubble===!0&&p(l),n.value.dispatchEvent(l),f(t),t.qKeyEvent=!0}s("keyup",t)}y()}}function y(t){const l=E.value;t!==!0&&(b===n.value||m===n.value)&&l!==null&&l!==document.activeElement&&(l.setAttribute("tabindex",-1),l.focus()),b===n.value&&(d!==null&&(d.removeEventListener("touchcancel",c,r),d.removeEventListener("touchend",c,r)),b=d=null),m===n.value&&(document.removeEventListener("mouseup",c,r),m=null),g===n.value&&(document.removeEventListener("keyup",c,!0),n.value!==null&&n.value.removeEventListener("blur",c,r),g=null),n.value!==null&&n.value.classList.remove("q-btn--active")}function k(t){f(t),t.qSkipRipple=!0}return F(()=>{y(!0)}),Object.assign(q,{click:$}),()=>{let t=[];e.icon!==void 0&&t.push(i(A,{name:e.icon,left:e.stack===!1&&z.value===!0,role:"img","aria-hidden":"true"})),z.value===!0&&t.push(i("span",{class:"block"},[e.label])),t=ae(o.default,t),e.iconRight!==void 0&&e.round===!1&&t.push(i(A,{name:e.iconRight,right:e.stack===!1&&z.value===!0,role:"img","aria-hidden":"true"}));const l=[i("span",{class:"q-focus-helper",ref:E})];return e.loading===!0&&e.percentage!==void 0&&l.push(i("span",{class:"q-btn__progress absolute-full overflow-hidden"+(e.darkPercentage===!0?" q-btn__progress--dark":"")},[i("span",{class:"q-btn__progress-indicator fit block",style:D.value})])),l.push(i("span",{class:"q-btn__content text-center col items-center q-anchor--skip "+B.value},t)),e.loading!==null&&l.push(i(G,{name:"q-transition--fade"},()=>e.loading===!0?[i("span",{key:"loading",class:"absolute-full flex flex-center"},o.loading!==void 0?o.loading():[i(se)])]:null)),J(i(h.value,H.value,l),[[ie,N.value,void 0,W.value]])}}});export{se as Q,Le as a};

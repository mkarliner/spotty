import{f as u,m as i,r as M,n as U,W as X,s as Y,y as Z,x as f,B as p,u as N,M as ee,Q as te,_ as ne,T as ae,c as le,J as $,I as ue,b as ie}from"./index.a9265805.js";import{e as j,a as re,c as oe,u as se,b as ce,Q as O,R as de}from"./Ripple.4a4ac5b7.js";import{c as A,b as ve}from"./render.b9a8b78e.js";const fe={size:{type:[Number,String],default:"1em"},color:String};function be(e){return{cSize:u(()=>e.size in j?`${j[e.size]}px`:e.size),classes:u(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}var ge=A({name:"QSpinner",props:{...fe,thickness:{type:Number,default:5}},setup(e){const{cSize:o,classes:s}=be(e);return()=>i("svg",{class:s.value+" q-spinner-mat",width:o.value,height:o.value,viewBox:"25 25 50 50"},[i("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});const K={left:"start",center:"center",right:"end",between:"between",around:"around",evenly:"evenly",stretch:"stretch"},me=Object.keys(K),he={align:{type:String,validator:e=>me.includes(e)}};function ye(e){return u(()=>{const o=e.align===void 0?e.vertical===!0?"stretch":"left":e.align;return`${e.vertical===!0?"items":"justify"}-${K[o]}`})}const Q={none:0,xs:4,sm:8,md:16,lg:24,xl:32},ke={xs:8,sm:10,md:14,lg:20,xl:24},xe=["button","submit","reset"],qe=/[^\s]\/[^\s]/,Ee={...se,...ce,type:{type:String,default:"button"},label:[Number,String],icon:String,iconRight:String,round:Boolean,square:Boolean,outline:Boolean,flat:Boolean,unelevated:Boolean,rounded:Boolean,push:Boolean,glossy:Boolean,size:String,fab:Boolean,fabMini:Boolean,padding:String,color:String,textColor:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,tabindex:[Number,String],ripple:{type:[Boolean,Object],default:!0},align:{...he.align,default:"center"},stack:Boolean,stretch:Boolean,loading:{type:Boolean,default:null},disable:Boolean};function Be(e){const o=re(e,ke),s=ye(e),{hasRouterLink:h,hasLink:y,linkTag:k,linkProps:S,navigateToRouterLink:_}=oe("button"),w=u(()=>{const a=e.fab===!1&&e.fabMini===!1?o.value:{};return e.padding!==void 0?Object.assign({},a,{padding:e.padding.split(/\s+/).map(v=>v in Q?Q[v]+"px":v).join(" "),minWidth:"0",minHeight:"0"}):a}),C=u(()=>e.rounded===!0||e.fab===!0||e.fabMini===!0),x=u(()=>e.disable!==!0&&e.loading!==!0),T=u(()=>x.value===!0?e.tabindex||0:-1),P=u(()=>e.flat===!0?"flat":e.outline===!0?"outline":e.push===!0?"push":e.unelevated===!0?"unelevated":"standard"),n=u(()=>{const a={tabindex:T.value};return y.value===!0?Object.assign(a,S.value):xe.includes(e.type)===!0&&(a.type=e.type),k.value==="a"?(e.disable===!0?a["aria-disabled"]="true":a.href===void 0&&(a.role="button"),h.value!==!0&&qe.test(e.type)===!0&&(a.type=e.type)):e.disable===!0&&(a.disabled="",a["aria-disabled"]="true"),e.loading===!0&&e.percentage!==void 0&&Object.assign(a,{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percentage}),a}),B=u(()=>{let a;e.color!==void 0?e.flat===!0||e.outline===!0?a=`text-${e.textColor||e.color}`:a=`bg-${e.color} text-${e.textColor||"white"}`:e.textColor&&(a=`text-${e.textColor}`);const v=e.round===!0?"round":`rectangle${C.value===!0?" q-btn--rounded":e.square===!0?" q-btn--square":""}`;return`q-btn--${P.value} q-btn--${v}`+(a!==void 0?" "+a:"")+(x.value===!0?" q-btn--actionable q-focusable q-hoverable":e.disable===!0?" disabled":"")+(e.fab===!0?" q-btn--fab":e.fabMini===!0?" q-btn--fab-mini":"")+(e.noCaps===!0?" q-btn--no-uppercase":"")+(e.dense===!0?" q-btn--dense":"")+(e.stretch===!0?" no-border-radius self-stretch":"")+(e.glossy===!0?" glossy":"")+(e.square?" q-btn--square":"")}),d=u(()=>s.value+(e.stack===!0?" column":" row")+(e.noWrap===!0?" no-wrap text-no-wrap":"")+(e.loading===!0?" q-btn__content--hidden":""));return{classes:B,style:w,innerClasses:d,attributes:n,hasRouterLink:h,hasLink:y,linkTag:k,navigateToRouterLink:_,isActionable:x}}const{passiveCapture:r}=p;let b=null,g=null,m=null;var Le=A({name:"QBtn",props:{...Ee,percentage:Number,darkPercentage:Boolean},emits:["click","keydown","touchstart","mousedown","keyup"],setup(e,{slots:o,emit:s}){const{proxy:h}=Z(),{classes:y,style:k,innerClasses:S,attributes:_,hasRouterLink:w,hasLink:C,linkTag:x,navigateToRouterLink:T,isActionable:P}=Be(e),n=M(null),B=M(null);let d=null,a,v;const R=u(()=>e.label!==void 0&&e.label!==null&&e.label!==""),I=u(()=>e.disable===!0||e.ripple===!1?!1:{keyCodes:C.value===!0?[13,32]:[13],...e.ripple===!0?{}:e.ripple}),W=u(()=>({center:e.round})),V=u(()=>{const t=Math.max(0,Math.min(100,e.percentage));return t>0?{transition:"transform 0.6s",transform:`translateX(${t-100}%)`}:{}}),D=u(()=>e.loading===!0?{onMousedown:E,onTouchstartPassive:E,onClick:E,onKeydown:E,onKeyup:E}:P.value===!0?{onClick:z,onKeydown:H,onMousedown:J,onTouchstart:G}:{onClick:f}),F=u(()=>({ref:n,class:"q-btn q-btn-item non-selectable no-outline "+y.value,style:k.value,..._.value,...D.value}));function z(t){if(n.value!==null){if(t!==void 0){if(t.defaultPrevented===!0)return;const l=document.activeElement;if(e.type==="submit"&&l!==document.body&&n.value.contains(l)===!1&&l.contains(n.value)===!1){n.value.focus();const L=()=>{document.removeEventListener("keydown",f,!0),document.removeEventListener("keyup",L,r),n.value!==null&&n.value.removeEventListener("blur",L,r)};document.addEventListener("keydown",f,!0),document.addEventListener("keyup",L,r),n.value.addEventListener("blur",L,r)}}if(w.value===!0){const l=()=>{t.__qNavigate=!0,T(t)};s("click",t,l),t.defaultPrevented!==!0&&l()}else s("click",t)}}function H(t){n.value!==null&&(s("keydown",t),N(t,[13,32])===!0&&g!==n.value&&(g!==null&&q(),t.defaultPrevented!==!0&&(n.value.focus(),g=n.value,n.value.classList.add("q-btn--active"),document.addEventListener("keyup",c,!0),n.value.addEventListener("blur",c,r)),f(t)))}function G(t){n.value!==null&&(s("touchstart",t),t.defaultPrevented!==!0&&(b!==n.value&&(b!==null&&q(),b=n.value,d=t.target,d.addEventListener("touchcancel",c,r),d.addEventListener("touchend",c,r)),a=!0,clearTimeout(v),v=setTimeout(()=>{a=!1},200)))}function J(t){n.value!==null&&(t.qSkipRipple=a===!0,s("mousedown",t),t.defaultPrevented!==!0&&m!==n.value&&(m!==null&&q(),m=n.value,n.value.classList.add("q-btn--active"),document.addEventListener("mouseup",c,r)))}function c(t){if(n.value!==null&&!(t!==void 0&&t.type==="blur"&&document.activeElement===n.value)){if(t!==void 0&&t.type==="keyup"){if(g===n.value&&N(t,[13,32])===!0){const l=new MouseEvent("click",t);l.qKeyEvent=!0,t.defaultPrevented===!0&&ee(l),t.cancelBubble===!0&&te(l),n.value.dispatchEvent(l),f(t),t.qKeyEvent=!0}s("keyup",t)}q()}}function q(t){const l=B.value;t!==!0&&(b===n.value||m===n.value)&&l!==null&&l!==document.activeElement&&(l.setAttribute("tabindex",-1),l.focus()),b===n.value&&(d!==null&&(d.removeEventListener("touchcancel",c,r),d.removeEventListener("touchend",c,r)),b=d=null),m===n.value&&(document.removeEventListener("mouseup",c,r),m=null),g===n.value&&(document.removeEventListener("keyup",c,!0),n.value!==null&&n.value.removeEventListener("blur",c,r),g=null),n.value!==null&&n.value.classList.remove("q-btn--active")}function E(t){f(t),t.qSkipRipple=!0}return U(()=>{q(!0)}),Object.assign(h,{click:z}),()=>{let t=[];e.icon!==void 0&&t.push(i(O,{name:e.icon,left:e.stack===!1&&R.value===!0,role:"img","aria-hidden":"true"})),R.value===!0&&t.push(i("span",{class:"block"},[e.label])),t=ve(o.default,t),e.iconRight!==void 0&&e.round===!1&&t.push(i(O,{name:e.iconRight,right:e.stack===!1&&R.value===!0,role:"img","aria-hidden":"true"}));const l=[i("span",{class:"q-focus-helper",ref:B})];return e.loading===!0&&e.percentage!==void 0&&l.push(i("span",{class:"q-btn__progress absolute-full overflow-hidden"+(e.darkPercentage===!0?" q-btn__progress--dark":"")},[i("span",{class:"q-btn__progress-indicator fit block",style:V.value})])),l.push(i("span",{class:"q-btn__content text-center col items-center q-anchor--skip "+S.value},t)),e.loading!==null&&l.push(i(X,{name:"q-transition--fade"},()=>e.loading===!0?[i("span",{key:"loading",class:"absolute-full flex flex-center"},o.loading!==void 0?o.loading():[i(ge)])]:null)),Y(i(x.value,F.value,l),[[de,I.value,void 0,W.value]])}}});const Se=ae({name:"ErrorNotFound"}),_e={class:"fullscreen bg-blue text-white text-center q-pa-md flex flex-center"},we=$("div",{style:{"font-size":"30vh"}}," 404 ",-1),Ce=$("div",{class:"text-h2",style:{opacity:".4"}}," Oops. Nothing here... ",-1);function Te(e,o,s,h,y,k){return ie(),le("div",_e,[$("div",null,[we,Ce,ue(Le,{class:"q-mt-xl",color:"white","text-color":"blue",unelevated:"",to:"/",label:"Go Home","no-caps":""})])])}var ze=ne(Se,[["render",Te]]);export{ze as default};

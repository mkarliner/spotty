import{u as P,a as j}from"./use-dark.1df3c040.js";import{u as w,a as R}from"./QIcon.27348566.js";import{r as I,g as l,q as f,A as D,a3 as i,z as x}from"./index.21ac0c82.js";import{a as N,h as K}from"./render.d9ccab24.js";function L(a,c){const e=I(null),s=l(()=>a.disable===!0?null:f("span",{ref:e,class:"no-outline",tabindex:-1}));function m(u){const n=c.value;u!==void 0&&u.type.indexOf("key")===0?n!==null&&document.activeElement!==n&&n.contains(document.activeElement)===!0&&n.focus():e.value!==null&&(u===void 0||n!==null&&n.contains(u.target)===!0)&&e.value.focus()}return{refocusTargetEl:s,refocusTarget:m}}const M={name:String};function G(a={}){return(c,e,s)=>{c[e](f("input",{class:"hidden"+(s||""),...a.value}))}}function X(a){return l(()=>a.name||a.for)}var H={xs:30,sm:35,md:40,lg:50,xl:60};const Y={...j,...R,...M,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:a=>a==="tf"||a==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},Z=["update:modelValue"];function ee(a,c){const{props:e,slots:s,emit:m,proxy:u}=D(),{$q:n}=u,S=P(e,n),p=I(null),{refocusTargetEl:k,refocusTarget:q}=L(e,p),C=w(e,H),d=l(()=>e.val!==void 0&&Array.isArray(e.modelValue)),g=l(()=>{const t=i(e.val);return d.value===!0?e.modelValue.findIndex(o=>i(o)===t):-1}),r=l(()=>d.value===!0?g.value>-1:i(e.modelValue)===i(e.trueValue)),v=l(()=>d.value===!0?g.value===-1:i(e.modelValue)===i(e.falseValue)),h=l(()=>r.value===!1&&v.value===!1),y=l(()=>e.disable===!0?-1:e.tabindex||0),$=l(()=>`q-${a} cursor-pointer no-outline row inline no-wrap items-center`+(e.disable===!0?" disabled":"")+(S.value===!0?` q-${a}--dark`:"")+(e.dense===!0?` q-${a}--dense`:"")+(e.leftLabel===!0?" reverse":"")),_=l(()=>{const t=r.value===!0?"truthy":v.value===!0?"falsy":"indet",o=e.color!==void 0&&(e.keepColor===!0||(a==="toggle"?r.value===!0:v.value!==!0))?` text-${e.color}`:"";return`q-${a}__inner relative-position non-selectable q-${a}__inner--${t}${o}`}),A=l(()=>{const t={type:"checkbox"};return e.name!==void 0&&Object.assign(t,{"^checked":r.value===!0?"checked":void 0,name:e.name,value:d.value===!0?e.val:e.trueValue}),t}),O=G(A),T=l(()=>{const t={tabindex:y.value,role:"checkbox","aria-label":e.label,"aria-checked":h.value===!0?"mixed":r.value===!0?"true":"false"};return e.disable===!0&&(t["aria-disabled"]="true"),t});function b(t){t!==void 0&&(x(t),q(t)),e.disable!==!0&&m("update:modelValue",z(),t)}function z(){if(d.value===!0){if(r.value===!0){const t=e.modelValue.slice();return t.splice(g.value,1),t}return e.modelValue.concat([e.val])}if(r.value===!0){if(e.toggleOrder!=="ft"||e.toggleIndeterminate===!1)return e.falseValue}else if(v.value===!0){if(e.toggleOrder==="ft"||e.toggleIndeterminate===!1)return e.trueValue}else return e.toggleOrder!=="ft"?e.trueValue:e.falseValue;return e.indeterminateValue}function B(t){(t.keyCode===13||t.keyCode===32)&&x(t)}function E(t){(t.keyCode===13||t.keyCode===32)&&b(t)}const F=c(r,h);return Object.assign(u,{toggle:b}),()=>{const t=F();e.disable!==!0&&O(t,"unshift",` q-${a}__native absolute q-ma-none q-pa-none`);const o=[f("div",{class:_.value,style:C.value},t)];k.value!==null&&o.push(k.value);const V=e.label!==void 0?N(s.default,[e.label]):K(s.default);return V!==void 0&&o.push(f("div",{class:`q-${a}__label q-anchor--skip`},V)),f("div",{ref:p,class:$.value,...T.value,onClick:b,onKeydown:B,onKeyup:E},o)}}export{Z as a,ee as b,M as c,X as d,Y as u};

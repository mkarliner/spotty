import{g as p,i as Ae,w as j,m as te,a0 as Me,x as Q,l as k,r as z,a1 as Be,a2 as Ee,a3 as $e,v as ae,z as Z,C as qe,D as Ve,o as ce,y as Te,T as W,a4 as Pe,u as Oe,a5 as Ie,X as me,p as ze,_ as je,H as Ne,c as De,I as Le,J as ge,P as re,K as J,a6 as Ue,a7 as Ke}from"./index.b51f76ff.js";import{b as Ze,d as Qe,Q as he}from"./Ripple.338f819e.js";import{Q as He}from"./QBtn.9b38350e.js";import{c as fe,e as We,h as H}from"./render.084770b6.js";import{Q as Je}from"./QPage.44086cae.js";import{u as Xe}from"./settings.81cc682c.js";const Ye={dark:{type:Boolean,default:null}};function Ge(e,t){return p(()=>e.dark===null?t.dark.isActive:e.dark)}function et({validate:e,resetValidation:t,requiresQForm:n}){const u=Ae(Me,!1);if(u!==!1){const{props:v,proxy:m}=Q();Object.assign(m,{validate:e,resetValidation:t}),j(()=>v.disable,i=>{i===!0?(typeof t=="function"&&t(),u.unbindComponent(m)):u.bindComponent(m)}),v.disable!==!0&&u.bindComponent(m),te(()=>{v.disable!==!0&&u.unbindComponent(m)})}else n===!0&&console.error("Parent QForm not found on useFormChild()!")}const be=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,pe=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,ye=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,X=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,Y=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,ke={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>be.test(e),hexaColor:e=>pe.test(e),hexOrHexaColor:e=>ye.test(e),rgbColor:e=>X.test(e),rgbaColor:e=>Y.test(e),rgbOrRgbaColor:e=>X.test(e)||Y.test(e),hexOrRgbColor:e=>be.test(e)||X.test(e),hexaOrRgbaColor:e=>pe.test(e)||Y.test(e),anyColor:e=>ye.test(e)||X.test(e)||Y.test(e)};"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(e=>{e.toLowerCase()});const tt={...Ze,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,thickness:{type:Number,default:.2,validator:e=>e>=0&&e<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean};function ot(e,t,n){return n<=t?t:Math.min(n,Math.max(t,e))}const ue=50,Re=2*ue,_e=Re*Math.PI,rt=Math.round(_e*1e3)/1e3;fe({name:"QCircularProgress",props:{...tt,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(e,{slots:t}){const{proxy:{$q:n}}=Q(),u=Qe(e),v=p(()=>{const _=(n.lang.rtl===!0?-1:1)*e.angle;return{transform:e.reverse!==(n.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-_}deg)`:`rotate3d(0, 0, 1, ${_-90}deg)`}}),m=p(()=>e.instantFeedback!==!0&&e.indeterminate!==!0?{transition:`stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease`}:""),i=p(()=>Re/(1-e.thickness/2)),q=p(()=>`${i.value/2} ${i.value/2} ${i.value} ${i.value}`),x=p(()=>ot(e.value,e.min,e.max)),y=p(()=>_e*(1-(x.value-e.min)/(e.max-e.min))),E=p(()=>e.thickness/2*i.value);function V({thickness:_,offset:g,color:C,cls:I}){return k("circle",{class:"q-circular-progress__"+I+(C!==void 0?` text-${C}`:""),style:m.value,fill:"transparent",stroke:"currentColor","stroke-width":_,"stroke-dasharray":rt,"stroke-dashoffset":g,cx:i.value,cy:i.value,r:ue})}return()=>{const _=[];e.centerColor!==void 0&&e.centerColor!=="transparent"&&_.push(k("circle",{class:`q-circular-progress__center text-${e.centerColor}`,fill:"currentColor",r:ue-E.value/2,cx:i.value,cy:i.value})),e.trackColor!==void 0&&e.trackColor!=="transparent"&&_.push(V({cls:"track",thickness:E.value,offset:0,color:e.trackColor})),_.push(V({cls:"circle",thickness:E.value,offset:y.value,color:e.color}));const g=[k("svg",{class:"q-circular-progress__svg",style:v.value,viewBox:q.value,"aria-hidden":"true"},_)];return e.showValue===!0&&g.push(k("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:e.fontSize}},t.default!==void 0?t.default():[k("div",x.value)])),k("div",{class:`q-circular-progress q-circular-progress--${e.indeterminate===!0?"in":""}determinate`,style:u.value,role:"progressbar","aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.indeterminate===!0?void 0:x.value},We(t.internal,g))}}});const nt=["rejected"],lt=[...nt,"start","finish","added","removed"],at=()=>!0;function ut(e){const t={};return e.forEach(n=>{t[n]=at}),t}ut(lt);let ne,G=0;const O=new Array(256);for(let e=0;e<256;e++)O[e]=(e+256).toString(16).substring(1);const it=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const n=new Uint8Array(t);return e.getRandomValues(n),n}}return t=>{const n=[];for(let u=t;u>0;u--)n.push(Math.floor(Math.random()*256));return n}})(),xe=4096;function st(){(ne===void 0||G+16>xe)&&(G=0,ne=it(xe));const e=Array.prototype.slice.call(ne,G,G+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,O[e[0]]+O[e[1]]+O[e[2]]+O[e[3]]+"-"+O[e[4]]+O[e[5]]+"-"+O[e[6]]+O[e[7]]+"-"+O[e[8]]+O[e[9]]+"-"+O[e[10]]+O[e[11]]+O[e[12]]+O[e[13]]+O[e[14]]+O[e[15]]}const dt=[!0,!1,"ondemand"],ct={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>dt.includes(e)}};function ft(e,t){const{props:n,proxy:u}=Q(),v=z(!1),m=z(null),i=z(null);et({validate:C,resetValidation:g});let q=0,x;const y=p(()=>n.rules!==void 0&&n.rules!==null&&n.rules.length>0),E=p(()=>n.disable!==!0&&y.value===!0),V=p(()=>n.error===!0||v.value===!0),_=p(()=>typeof n.errorMessage=="string"&&n.errorMessage.length>0?n.errorMessage:m.value);j(()=>n.modelValue,()=>{I()}),j(()=>n.reactiveRules,T=>{T===!0?x===void 0&&(x=j(()=>n.rules,()=>{I(!0)})):x!==void 0&&(x(),x=void 0)},{immediate:!0}),j(e,T=>{T===!0?i.value===null&&(i.value=!1):i.value===!1&&(i.value=!0,E.value===!0&&n.lazyRules!=="ondemand"&&t.value===!1&&A())});function g(){q++,t.value=!1,i.value=null,v.value=!1,m.value=null,A.cancel()}function C(T=n.modelValue){if(E.value!==!0)return!0;const $=++q;t.value!==!0&&n.lazyRules!==!0&&(i.value=!0);const w=(S,o)=>{v.value!==S&&(v.value=S);const a=o||void 0;m.value!==a&&(m.value=a),t.value=!1},B=[];for(let S=0;S<n.rules.length;S++){const o=n.rules[S];let a;if(typeof o=="function"?a=o(T):typeof o=="string"&&ke[o]!==void 0&&(a=ke[o](T)),a===!1||typeof a=="string")return w(!0,a),!1;a!==!0&&a!==void 0&&B.push(a)}return B.length===0?(w(!1),!0):(t.value=!0,Promise.all(B).then(S=>{if(S===void 0||Array.isArray(S)===!1||S.length===0)return $===q&&w(!1),!0;const o=S.find(a=>a===!1||typeof a=="string");return $===q&&w(o!==void 0,o),o===void 0},S=>($===q&&(console.error(S),w(!0)),!1)))}function I(T){E.value===!0&&n.lazyRules!=="ondemand"&&(i.value===!0||n.lazyRules!==!0&&T!==!0)&&A()}const A=Be(C,0);return te(()=>{x!==void 0&&x(),A.cancel()}),Object.assign(u,{resetValidation:g,validate:C}),Ee(u,"hasError",()=>V.value),{isDirtyModel:i,hasRules:y,hasError:V,errorMessage:_,validate:C,resetValidation:g}}const Ce=/^on[A-Z]/;function vt(e,t){const n={listeners:z({}),attributes:z({})};function u(){const v={},m={};for(const i in e)i!=="class"&&i!=="style"&&Ce.test(i)===!1&&(v[i]=e[i]);for(const i in t.props)Ce.test(i)===!0&&(m[i]=t.props[i]);n.attributes.value=v,n.listeners.value=m}return $e(u),u(),n}let ie=[],mt=[];function ve(e){mt.length===0?e():ie.push(e)}function gt(e){ie=ie.filter(t=>t!==e)}function se(e){return e===void 0?`f_${st()}`:e}function de(e){return e!=null&&(""+e).length>0}const ht={...Ye,...ct,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},bt=["update:modelValue","clear","focus","blur","popup-show","popup-hide"];function pt(){const{props:e,attrs:t,proxy:n,vnode:u}=Q();return{isDark:Ge(e,n.$q),editable:p(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:z(!1),focused:z(!1),hasPopupOpen:!1,splitAttrs:vt(t,u),targetUid:z(se(e.for)),rootRef:z(null),targetRef:z(null),controlRef:z(null)}}function yt(e){const{props:t,emit:n,slots:u,attrs:v,proxy:m}=Q(),{$q:i}=m;let q;e.hasValue===void 0&&(e.hasValue=p(()=>de(t.modelValue))),e.emitValue===void 0&&(e.emitValue=r=>{n("update:modelValue",r)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:d,onFocusout:c}),Object.assign(e,{clearValue:s,onControlFocusin:d,onControlFocusout:c,focus:a}),e.computedCounter===void 0&&(e.computedCounter=p(()=>{if(t.counter!==!1){const r=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,h=t.maxlength!==void 0?t.maxlength:t.maxValues;return r+(h!==void 0?" / "+h:"")}}));const{isDirtyModel:x,hasRules:y,hasError:E,errorMessage:V,resetValidation:_}=ft(e.focused,e.innerLoading),g=e.floatingLabel!==void 0?p(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):p(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),C=p(()=>t.bottomSlots===!0||t.hint!==void 0||y.value===!0||t.counter===!0||t.error!==null),I=p(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),A=p(()=>`q-field row no-wrap items-start q-field--${I.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(g.value===!0?" q-field--float":"")+($.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(E.value===!0?" q-field--error":"")+(E.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&C.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),T=p(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(E.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length>0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),$=p(()=>t.labelSlot===!0||t.label!==void 0),w=p(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&E.value!==!0?` text-${t.labelColor}`:"")),B=p(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:g.value,modelValue:t.modelValue,emitValue:e.emitValue})),S=p(()=>{const r={for:e.targetUid.value};return t.disable===!0?r["aria-disabled"]="true":t.readonly===!0&&(r["aria-readonly"]="true"),r});j(()=>t.for,r=>{e.targetUid.value=se(r)});function o(){const r=document.activeElement;let h=e.targetRef!==void 0&&e.targetRef.value;h&&(r===null||r.id!==e.targetUid.value)&&(h.hasAttribute("tabindex")===!0||(h=h.querySelector("[tabindex]")),h&&h!==r&&h.focus({preventScroll:!0}))}function a(){ve(o)}function f(){gt(o);const r=document.activeElement;r!==null&&e.rootRef.value.contains(r)&&r.blur()}function d(r){clearTimeout(q),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,n("focus",r))}function c(r,h){clearTimeout(q),q=setTimeout(()=>{document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1)||(e.focused.value===!0&&(e.focused.value=!1,n("blur",r)),h!==void 0&&h())})}function s(r){ae(r),i.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),n("update:modelValue",null),n("clear",t.modelValue),Z(()=>{_(),i.platform.is.mobile!==!0&&(x.value=!1)})}function M(){const r=[];return u.prepend!==void 0&&r.push(k("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:W},u.prepend())),r.push(k("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},b())),E.value===!0&&t.noErrorIcon===!1&&r.push(N("error",[k(he,{name:i.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?r.push(N("inner-loading-append",u.loading!==void 0?u.loading():[k(He,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&r.push(N("inner-clearable-append",[k(he,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||i.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:s})])),u.append!==void 0&&r.push(k("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:W},u.append())),e.getInnerAppend!==void 0&&r.push(N("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&r.push(e.getControlChild()),r}function b(){const r=[];return t.prefix!==void 0&&t.prefix!==null&&r.push(k("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&r.push(e.getShadowControl()),e.getControl!==void 0?r.push(e.getControl()):u.rawControl!==void 0?r.push(u.rawControl()):u.control!==void 0&&r.push(k("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},u.control(B.value))),$.value===!0&&r.push(k("div",{class:w.value},H(u.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&r.push(k("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),r.concat(H(u.default))}function F(){let r,h;E.value===!0?V.value!==null?(r=[k("div",{role:"alert"},V.value)],h=`q--slot-error-${V.value}`):(r=H(u.error),h="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(r=[k("div",t.hint)],h=`q--slot-hint-${t.hint}`):(r=H(u.hint),h="q--slot-hint"));const l=t.counter===!0||u.counter!==void 0;if(t.hideBottomSpace===!0&&l===!1&&r===void 0)return;const R=k("div",{key:h,class:"q-field__messages col"},r);return k("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale")},[t.hideBottomSpace===!0?R:k(Pe,{name:"q-transition--field-message"},()=>R),l===!0?k("div",{class:"q-field__counter"},u.counter!==void 0?u.counter():e.computedCounter.value):null])}function N(r,h){return h===null?null:k("div",{key:r,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},h)}Object.assign(m,{focus:a,blur:f});let L=!1;return qe(()=>{L=!0}),Ve(()=>{L===!0&&t.autofocus===!0&&m.focus()}),ce(()=>{Te.value===!0&&t.for===void 0&&(e.targetUid.value=se()),t.autofocus===!0&&m.focus()}),te(()=>{clearTimeout(q)}),function(){const h=e.getControl===void 0&&u.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...S.value}:S.value;return k("label",{ref:e.rootRef,class:[A.value,v.class],style:v.style,...h},[u.before!==void 0?k("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:W},u.before()):null,k("div",{class:"q-field__inner relative-position col self-stretch"},[k("div",{ref:e.controlRef,class:T.value,tabindex:-1,...e.controlEvents},M()),C.value===!0?F():null]),u.after!==void 0?k("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:W},u.after()):null])}}const we={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},ee={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Fe=Object.keys(ee);Fe.forEach(e=>{ee[e].regex=new RegExp(ee[e].pattern)});const kt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Fe.join("")+"])|(.)","g"),Se=/[.*+?^${}()|[\]\\]/g,P=String.fromCharCode(1),xt={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function Ct(e,t,n,u){let v,m,i,q;const x=z(null),y=z(V());function E(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}j(()=>e.type+e.autogrow,g),j(()=>e.mask,o=>{if(o!==void 0)C(y.value,!0);else{const a=B(y.value);g(),e.modelValue!==a&&t("update:modelValue",a)}}),j(()=>e.fillMask+e.reverseFillMask,()=>{x.value===!0&&C(y.value,!0)}),j(()=>e.unmaskedValue,()=>{x.value===!0&&C(y.value)});function V(){if(g(),x.value===!0){const o=$(B(e.modelValue));return e.fillMask!==!1?S(o):o}return e.modelValue}function _(o){if(o<v.length)return v.slice(-o);let a="",f=v;const d=f.indexOf(P);if(d>-1){for(let c=o-f.length;c>0;c--)a+=P;f=f.slice(0,d)+a+f.slice(d)}return f}function g(){if(x.value=e.mask!==void 0&&e.mask.length>0&&E(),x.value===!1){q=void 0,v="",m="";return}const o=we[e.mask]===void 0?e.mask:we[e.mask],a=typeof e.fillMask=="string"&&e.fillMask.length>0?e.fillMask.slice(0,1):"_",f=a.replace(Se,"\\$&"),d=[],c=[],s=[];let M=e.reverseFillMask===!0,b="",F="";o.replace(kt,(h,l,R,U,K)=>{if(U!==void 0){const D=ee[U];s.push(D),F=D.negate,M===!0&&(c.push("(?:"+F+"+)?("+D.pattern+"+)?(?:"+F+"+)?("+D.pattern+"+)?"),M=!1),c.push("(?:"+F+"+)?("+D.pattern+")?")}else if(R!==void 0)b="\\"+(R==="\\"?"":R),s.push(R),d.push("([^"+b+"]+)?"+b+"?");else{const D=l!==void 0?l:K;b=D==="\\"?"\\\\\\\\":D.replace(Se,"\\\\$&"),s.push(D),d.push("([^"+b+"]+)?"+b+"?")}});const N=new RegExp("^"+d.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?$"),L=c.length-1,r=c.map((h,l)=>l===0&&e.reverseFillMask===!0?new RegExp("^"+f+"*"+h):l===L?new RegExp("^"+h+"("+(F===""?".":F)+"+)?"+(e.reverseFillMask===!0?"$":f+"*")):new RegExp("^"+h));i=s,q=h=>{const l=N.exec(h);l!==null&&(h=l.slice(1).join(""));const R=[],U=r.length;for(let K=0,D=h;K<U;K++){const oe=r[K].exec(D);if(oe===null)break;D=D.slice(oe.shift().length),R.push(...oe)}return R.length>0?R.join(""):h},v=s.map(h=>typeof h=="string"?h:P).join(""),m=v.split(P).join(a)}function C(o,a,f){const d=u.value,c=d.selectionEnd,s=d.value.length-c,M=B(o);a===!0&&g();const b=$(M),F=e.fillMask!==!1?S(b):b,N=y.value!==F;d.value!==F&&(d.value=F),N===!0&&(y.value=F),document.activeElement===d&&Z(()=>{if(F===m){const r=e.reverseFillMask===!0?m.length:0;d.setSelectionRange(r,r,"forward");return}if(f==="insertFromPaste"&&e.reverseFillMask!==!0){const r=c-1;A.right(d,r,r);return}if(["deleteContentBackward","deleteContentForward"].indexOf(f)>-1){const r=e.reverseFillMask===!0?c===0?F.length>b.length?1:0:Math.max(0,F.length-(F===m?0:Math.min(b.length,s)+1))+1:c;d.setSelectionRange(r,r,"forward");return}if(e.reverseFillMask===!0)if(N===!0){const r=Math.max(0,F.length-(F===m?0:Math.min(b.length,s+1)));r===1&&c===1?d.setSelectionRange(r,r,"forward"):A.rightReverse(d,r,r)}else{const r=F.length-s;d.setSelectionRange(r,r,"backward")}else if(N===!0){const r=Math.max(0,v.indexOf(P),Math.min(b.length,c)-1);A.right(d,r,r)}else{const r=c-1;A.right(d,r,r)}});const L=e.unmaskedValue===!0?B(F):F;String(e.modelValue)!==L&&n(L,!0)}function I(o,a,f){const d=$(B(o.value));a=Math.max(0,v.indexOf(P),Math.min(d.length,a)),o.setSelectionRange(a,f,"forward")}const A={left(o,a,f,d){const c=v.slice(a-1).indexOf(P)===-1;let s=Math.max(0,a-1);for(;s>=0;s--)if(v[s]===P){a=s,c===!0&&a++;break}if(s<0&&v[a]!==void 0&&v[a]!==P)return A.right(o,0,0);a>=0&&o.setSelectionRange(a,d===!0?f:a,"backward")},right(o,a,f,d){const c=o.value.length;let s=Math.min(c,f+1);for(;s<=c;s++)if(v[s]===P){f=s;break}else v[s-1]===P&&(f=s);if(s>c&&v[f-1]!==void 0&&v[f-1]!==P)return A.left(o,c,c);o.setSelectionRange(d?a:f,f,"forward")},leftReverse(o,a,f,d){const c=_(o.value.length);let s=Math.max(0,a-1);for(;s>=0;s--)if(c[s-1]===P){a=s;break}else if(c[s]===P&&(a=s,s===0))break;if(s<0&&c[a]!==void 0&&c[a]!==P)return A.rightReverse(o,0,0);a>=0&&o.setSelectionRange(a,d===!0?f:a,"backward")},rightReverse(o,a,f,d){const c=o.value.length,s=_(c),M=s.slice(0,f+1).indexOf(P)===-1;let b=Math.min(c,f+1);for(;b<=c;b++)if(s[b-1]===P){f=b,f>0&&M===!0&&f--;break}if(b>c&&s[f-1]!==void 0&&s[f-1]!==P)return A.leftReverse(o,c,c);o.setSelectionRange(d===!0?a:f,f,"forward")}};function T(o){if(Oe(o)===!0)return;const a=u.value,f=a.selectionStart,d=a.selectionEnd;if(o.keyCode===37||o.keyCode===39){const c=A[(o.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];o.preventDefault(),c(a,f,d,o.shiftKey)}else o.keyCode===8&&e.reverseFillMask!==!0&&f===d?A.left(a,f,d,!0):o.keyCode===46&&e.reverseFillMask===!0&&f===d&&A.rightReverse(a,f,d,!0)}function $(o){if(o==null||o==="")return"";if(e.reverseFillMask===!0)return w(o);const a=i;let f=0,d="";for(let c=0;c<a.length;c++){const s=o[f],M=a[c];if(typeof M=="string")d+=M,s===M&&f++;else if(s!==void 0&&M.regex.test(s))d+=M.transform!==void 0?M.transform(s):s,f++;else return d}return d}function w(o){const a=i,f=v.indexOf(P);let d=o.length-1,c="";for(let s=a.length-1;s>=0&&d>-1;s--){const M=a[s];let b=o[d];if(typeof M=="string")c=M+c,b===M&&d--;else if(b!==void 0&&M.regex.test(b))do c=(M.transform!==void 0?M.transform(b):b)+c,d--,b=o[d];while(f===s&&b!==void 0&&M.regex.test(b));else return c}return c}function B(o){return typeof o!="string"||q===void 0?typeof o=="number"?q(""+o):o:q(o)}function S(o){return m.length-o.length<=0?o:e.reverseFillMask===!0&&o.length>0?m.slice(0,-o.length)+o:o+m.slice(o.length)}return{innerValue:y,hasMask:x,moveCursorForPaste:I,updateMaskValue:C,onMaskedKeydown:T}}const wt={name:String};function St(e){return p(()=>e.name||e.for)}function Mt(e,t){function n(){const u=e.modelValue;try{const v="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(u)===u&&("length"in u?Array.from(u):[u]).forEach(m=>{v.items.add(m)}),{files:v.files}}catch{return{files:void 0}}}return t===!0?p(()=>{if(e.type==="file")return n()}):p(n)}const qt=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,Vt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,Rt=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,_t=/[a-z0-9_ -]$/i;function Ft(e){return function(n){if(n.type==="compositionend"||n.type==="change"){if(n.target.qComposing!==!0)return;n.target.qComposing=!1,e(n)}else n.type==="compositionupdate"&&n.target.qComposing!==!0&&typeof n.data=="string"&&(Ie.is.firefox===!0?_t.test(n.data)===!1:qt.test(n.data)===!0||Vt.test(n.data)===!0||Rt.test(n.data)===!0)===!0&&(n.target.qComposing=!0)}}var le=fe({name:"QInput",inheritAttrs:!1,props:{...ht,...xt,...wt,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...bt,"paste","change"],setup(e,{emit:t,attrs:n}){const u={};let v=NaN,m,i,q,x;const y=z(null),E=St(e),{innerValue:V,hasMask:_,moveCursorForPaste:g,updateMaskValue:C,onMaskedKeydown:I}=Ct(e,t,M,y),A=Mt(e,!0),T=p(()=>de(V.value)),$=Ft(s),w=pt(),B=p(()=>e.type==="textarea"||e.autogrow===!0),S=p(()=>B.value===!0||["text","search","url","tel","password"].includes(e.type)),o=p(()=>{const l={...w.splitAttrs.listeners.value,onInput:s,onPaste:c,onChange:F,onBlur:N,onFocus:me};return l.onCompositionstart=l.onCompositionupdate=l.onCompositionend=$,_.value===!0&&(l.onKeydown=I),e.autogrow===!0&&(l.onAnimationend=b),l}),a=p(()=>{const l={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:E.value,...w.splitAttrs.attributes.value,id:w.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return B.value===!1&&(l.type=e.type),e.autogrow===!0&&(l.rows=1),l});j(()=>e.type,()=>{y.value&&(y.value.value=e.modelValue)}),j(()=>e.modelValue,l=>{if(_.value===!0){if(i===!0&&(i=!1,String(l)===v))return;C(l)}else V.value!==l&&(V.value=l,e.type==="number"&&u.hasOwnProperty("value")===!0&&(m===!0?m=!1:delete u.value));e.autogrow===!0&&Z(b)}),j(()=>e.autogrow,l=>{l===!0?Z(b):y.value!==null&&n.rows>0&&(y.value.style.height="auto")}),j(()=>e.dense,()=>{e.autogrow===!0&&Z(b)});function f(){ve(()=>{const l=document.activeElement;y.value!==null&&y.value!==l&&(l===null||l.id!==w.targetUid.value)&&y.value.focus({preventScroll:!0})})}function d(){y.value!==null&&y.value.select()}function c(l){if(_.value===!0&&e.reverseFillMask!==!0){const R=l.target;g(R,R.selectionStart,R.selectionEnd)}t("paste",l)}function s(l){if(!l||!l.target)return;if(e.type==="file"){t("update:modelValue",l.target.files);return}const R=l.target.value;if(l.target.qComposing===!0){u.value=R;return}if(_.value===!0)C(R,!1,l.inputType);else if(M(R),S.value===!0&&l.target===document.activeElement){const{selectionStart:U,selectionEnd:K}=l.target;U!==void 0&&K!==void 0&&Z(()=>{l.target===document.activeElement&&R.indexOf(l.target.value)===0&&l.target.setSelectionRange(U,K)})}e.autogrow===!0&&b()}function M(l,R){x=()=>{e.type!=="number"&&u.hasOwnProperty("value")===!0&&delete u.value,e.modelValue!==l&&v!==l&&(v=l,R===!0&&(i=!0),t("update:modelValue",l),Z(()=>{v===l&&(v=NaN)})),x=void 0},e.type==="number"&&(m=!0,u.value=l),e.debounce!==void 0?(clearTimeout(q),u.value=l,q=setTimeout(x,e.debounce)):x()}function b(){const l=y.value;if(l!==null){const R=l.parentNode.style,{overflow:U}=l.style;R.marginBottom=l.scrollHeight-1+"px",l.style.height="1px",l.style.overflow="hidden",l.style.height=l.scrollHeight+"px",l.style.overflow=U,R.marginBottom=""}}function F(l){$(l),clearTimeout(q),x!==void 0&&x(),t("change",l.target.value)}function N(l){l!==void 0&&me(l),clearTimeout(q),x!==void 0&&x(),m=!1,i=!1,delete u.value,e.type!=="file"&&setTimeout(()=>{y.value!==null&&(y.value.value=V.value!==void 0?V.value:"")})}function L(){return u.hasOwnProperty("value")===!0?u.value:V.value!==void 0?V.value:""}te(()=>{N()}),ce(()=>{e.autogrow===!0&&b()}),Object.assign(w,{innerValue:V,fieldClass:p(()=>`q-${B.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:p(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length>0),inputRef:y,emitValue:M,hasValue:T,floatingLabel:p(()=>T.value===!0||de(e.displayValue)),getControl:()=>k(B.value===!0?"textarea":"input",{ref:y,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...a.value,...o.value,...e.type!=="file"?{value:L()}:A.value}),getShadowControl:()=>k("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(B.value===!0?"":" text-no-wrap")},[k("span",{class:"invisible"},L()),k("span",e.shadowText)])});const r=yt(w),h=Q();return Object.assign(h.proxy,{focus:f,select:d,getNativeElement:()=>y.value}),r}}),At=fe({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validation-success","validation-error"],setup(e,{slots:t,emit:n}){const u=Q(),v=z(null);let m=0;const i=[];function q(g){const C=[],I=typeof g=="boolean"?g:e.noErrorFocus!==!0,A=++m,T=($,w)=>{n("validation-"+($===!0?"success":"error"),w)};for(let $=0;$<i.length;$++){const w=i[$],B=w.validate();if(typeof B.then=="function")C.push(B.then(S=>({valid:S,comp:w}),S=>({valid:!1,comp:w,err:S})));else if(B!==!0){if(e.greedy===!1)return T(!1,w),I===!0&&typeof w.focus=="function"&&w.focus(),Promise.resolve(!1);C.push({valid:!1,comp:w})}}return C.length===0?(T(!0),Promise.resolve(!0)):Promise.all(C).then($=>{const w=$.filter(a=>a.valid!==!0);if(w.length===0)return A===m&&T(!0),!0;const{valid:B,comp:S,err:o}=w[0];return A===m&&(o!==void 0&&console.error(o),T(!1,S),I===!0&&B!==!0&&typeof S.focus=="function"&&S.focus()),!1})}function x(){m++,i.forEach(g=>{typeof g.resetValidation=="function"&&g.resetValidation()})}function y(g){g!==void 0&&ae(g);const C=m+1;q().then(I=>{C===m&&I===!0&&(e.onSubmit!==void 0?n("submit",g):g!==void 0&&g.target!==void 0&&typeof g.target.submit=="function"&&g.target.submit())})}function E(g){g!==void 0&&ae(g),n("reset"),Z(()=>{x(),e.autofocus===!0&&e.noResetFocus!==!0&&V()})}function V(){ve(()=>{if(v.value===null)return;const g=v.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(v.value.querySelectorAll("[tabindex]"),C=>C.tabIndex>-1);g!=null&&g.focus({preventScroll:!0})})}ze(Me,{bindComponent(g){i.push(g)},unbindComponent(g){const C=i.indexOf(g);C>-1&&i.splice(C,1)}});let _=!1;return qe(()=>{_=!0}),Ve(()=>{_===!0&&e.autofocus===!0&&V()}),ce(()=>{e.autofocus===!0&&V()}),Object.assign(u.proxy,{validate:q,resetValidation:x,submit:y,reset:E,focus:V,getValidationComponents:()=>i}),()=>k("form",{class:"q-form",ref:v,onSubmit:y,onReset:E},H(t.default))}});const Bt=Ne({name:"SettingsPage",setup(){return{store:Xe()}},mounted(){},methods:{changeTopic(){console.log("change!"),this.store.topic=this.topic},changeTTL(){console.log("TTL"),this.store.report_ttl=this.report_ttl}},data(){return{broker:"mqtt.pskreporter.info",topic:"pskr/filter/+/+/+/+/IO91/#",report_ttl:"55"}}}),Et={class:"q-pa-md"},$t={class:"q-gutter-md",style:{"max-width":"300px"}},Tt={class:"q-pa-md"};function Pt(e,t,n,u,v,m){return De(),Le(Je,{class:"flex flex-center"},{default:ge(()=>[re("div",Et,[re("div",$t,[J(le,{modelValue:e.broker,"onUpdate:modelValue":t[0]||(t[0]=i=>e.broker=i),label:"Broker"},null,8,["modelValue"])]),J(At,{onKeydown:Ue(Ke(e.changeTopic,["prevent"]),["enter"])},{default:ge(()=>[J(le,{label:"Topic",type:"text",modelValue:e.topic,"onUpdate:modelValue":t[1]||(t[1]=i=>e.topic=i)},null,8,["modelValue"])]),_:1},8,["onKeydown"]),re("div",Tt,[J(le,{modelValue:e.report_ttl,"onUpdate:modelValue":t[2]||(t[2]=i=>e.report_ttl=i),modelModifiers:{number:!0},onChange:e.changeTTL,label:"Time to Live",type:"number",style:{"max-width":"200px"}},null,8,["modelValue","onChange"])])])]),_:1})}var Lt=je(Bt,[["render",Pt]]);export{Lt as default};

import{b as _e,d as Re,Q as ie}from"./Ripple.47fcbbc0.js";import{a as Ne,h as J,c as oe,e as ze}from"./render.c3e942a6.js";import{u as Fe,a as Ae}from"./use-dark.111e8de5.js";import{r as P,g as p,l as y,x as Z,a1 as W,v as Y,i as je,w as z,m as ne,a2 as Be,a3 as De,a4 as Ue,a5 as Le,z as Q,C as Ee,D as $e,o as me,y as Ke,U as G,a6 as Qe,u as Ze,a7 as He,Y as he,p as We,_ as Je,I as Ye,H as Ge,c as Xe,J as et,K as be,Q as se,L as H,a8 as tt}from"./index.b8d17992.js";import{Q as lt,a as ot}from"./QBtn.e1ff615e.js";import{Q as nt}from"./QPage.7c42e947.js";import{u as pe}from"./settings.0c115324.js";function rt(e,t){const l=P(null),r=p(()=>e.disable===!0?null:y("span",{ref:l,class:"no-outline",tabindex:-1}));function s(m){const a=t.value;m!==void 0&&m.type.indexOf("key")===0?a!==null&&document.activeElement!==a&&a.contains(document.activeElement)===!0&&a.focus():l.value!==null&&(m===void 0||a!==null&&a.contains(m.target)===!0)&&l.value.focus()}return{refocusTargetEl:r,refocusTarget:s}}const Ie={name:String};function at(e={}){return(t,l,r)=>{t[l](y("input",{class:"hidden"+(r||""),...e.value}))}}function ut(e){return p(()=>e.name||e.for)}var it={xs:30,sm:35,md:40,lg:50,xl:60};const st={...Ae,...Re,...Ie,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:e=>e==="tf"||e==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},dt=["update:modelValue"];function ct(e,t){const{props:l,slots:r,emit:s,proxy:m}=Z(),{$q:a}=m,M=Fe(l,a),w=P(null),{refocusTargetEl:C,refocusTarget:E}=rt(l,w),_=_e(l,it),q=p(()=>l.val!==void 0&&Array.isArray(l.modelValue)),h=p(()=>{const c=W(l.val);return q.value===!0?l.modelValue.findIndex(b=>W(b)===c):-1}),x=p(()=>q.value===!0?h.value>-1:W(l.modelValue)===W(l.trueValue)),O=p(()=>q.value===!0?h.value===-1:W(l.modelValue)===W(l.falseValue)),F=p(()=>x.value===!1&&O.value===!1),I=p(()=>l.disable===!0?-1:l.tabindex||0),$=p(()=>`q-${e} cursor-pointer no-outline row inline no-wrap items-center`+(l.disable===!0?" disabled":"")+(M.value===!0?` q-${e}--dark`:"")+(l.dense===!0?` q-${e}--dense`:"")+(l.leftLabel===!0?" reverse":"")),S=p(()=>{const c=x.value===!0?"truthy":O.value===!0?"falsy":"indet",b=l.color!==void 0&&(l.keepColor===!0||(e==="toggle"?x.value===!0:O.value!==!0))?` text-${l.color}`:"";return`q-${e}__inner relative-position non-selectable q-${e}__inner--${c}${b}`}),A=p(()=>{const c={type:"checkbox"};return l.name!==void 0&&Object.assign(c,{"^checked":x.value===!0?"checked":void 0,name:l.name,value:q.value===!0?l.val:l.trueValue}),c}),V=at(A),o=p(()=>{const c={tabindex:I.value,role:"checkbox","aria-label":l.label,"aria-checked":F.value===!0?"mixed":x.value===!0?"true":"false"};return l.disable===!0&&(c["aria-disabled"]="true"),c});function u(c){c!==void 0&&(Y(c),E(c)),l.disable!==!0&&s("update:modelValue",g(),c)}function g(){if(q.value===!0){if(x.value===!0){const c=l.modelValue.slice();return c.splice(h.value,1),c}return l.modelValue.concat([l.val])}if(x.value===!0){if(l.toggleOrder!=="ft"||l.toggleIndeterminate===!1)return l.falseValue}else if(O.value===!0){if(l.toggleOrder==="ft"||l.toggleIndeterminate===!1)return l.trueValue}else return l.toggleOrder!=="ft"?l.trueValue:l.falseValue;return l.indeterminateValue}function f(c){(c.keyCode===13||c.keyCode===32)&&Y(c)}function v(c){(c.keyCode===13||c.keyCode===32)&&u(c)}const d=t(x,F);return Object.assign(m,{toggle:u}),()=>{const c=d();l.disable!==!0&&V(c,"unshift",` q-${e}__native absolute q-ma-none q-pa-none`);const b=[y("div",{class:S.value,style:_.value},c)];C.value!==null&&b.push(C.value);const R=l.label!==void 0?Ne(r.default,[l.label]):J(r.default);return R!==void 0&&b.push(y("div",{class:`q-${e}__label q-anchor--skip`},R)),y("div",{ref:w,class:$.value,...o.value,onClick:u,onKeydown:f,onKeyup:v},b)}}const ft=y("div",{key:"svg",class:"q-checkbox__bg absolute"},[y("svg",{class:"q-checkbox__svg fit absolute-full",viewBox:"0 0 24 24","aria-hidden":"true"},[y("path",{class:"q-checkbox__truthy",fill:"none",d:"M1.73,12.91 8.1,19.28 22.79,4.59"}),y("path",{class:"q-checkbox__indet",d:"M4,14H20V10H4"})])]);var ye=oe({name:"QCheckbox",props:st,emits:dt,setup(e){function t(l,r){const s=p(()=>(l.value===!0?e.checkedIcon:r.value===!0?e.indeterminateIcon:e.uncheckedIcon)||null);return()=>s.value!==null?[y("div",{key:"icon",class:"q-checkbox__icon-container absolute-full flex flex-center no-wrap"},[y(ie,{class:"q-checkbox__icon",name:s.value})])]:[ft]}return ct("checkbox",t)}});function vt({validate:e,resetValidation:t,requiresQForm:l}){const r=je(Be,!1);if(r!==!1){const{props:s,proxy:m}=Z();Object.assign(m,{validate:e,resetValidation:t}),z(()=>s.disable,a=>{a===!0?(typeof t=="function"&&t(),r.unbindComponent(m)):r.bindComponent(m)}),s.disable!==!0&&r.bindComponent(m),ne(()=>{s.disable!==!0&&r.unbindComponent(m)})}else l===!0&&console.error("Parent QForm not found on useFormChild()!")}const ke=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,xe=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,Ce=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,X=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,ee=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,we={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>ke.test(e),hexaColor:e=>xe.test(e),hexOrHexaColor:e=>Ce.test(e),rgbColor:e=>X.test(e),rgbaColor:e=>ee.test(e),rgbOrRgbaColor:e=>X.test(e)||ee.test(e),hexOrRgbColor:e=>ke.test(e)||X.test(e),hexaOrRgbaColor:e=>xe.test(e)||ee.test(e),anyColor:e=>Ce.test(e)||X.test(e)||ee.test(e)};"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(e=>{e.toLowerCase()});const mt={...Re,min:{type:Number,default:0},max:{type:Number,default:100},color:String,centerColor:String,trackColor:String,fontSize:String,thickness:{type:Number,default:.2,validator:e=>e>=0&&e<=1},angle:{type:Number,default:0},showValue:Boolean,reverse:Boolean,instantFeedback:Boolean};function gt(e,t,l){return l<=t?t:Math.min(l,Math.max(t,e))}const de=50,Oe=2*de,Te=Oe*Math.PI,ht=Math.round(Te*1e3)/1e3;oe({name:"QCircularProgress",props:{...mt,value:{type:Number,default:0},animationSpeed:{type:[String,Number],default:600},indeterminate:Boolean},setup(e,{slots:t}){const{proxy:{$q:l}}=Z(),r=_e(e),s=p(()=>{const q=(l.lang.rtl===!0?-1:1)*e.angle;return{transform:e.reverse!==(l.lang.rtl===!0)?`scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90-q}deg)`:`rotate3d(0, 0, 1, ${q-90}deg)`}}),m=p(()=>e.instantFeedback!==!0&&e.indeterminate!==!0?{transition:`stroke-dashoffset ${e.animationSpeed}ms ease 0s, stroke ${e.animationSpeed}ms ease`}:""),a=p(()=>Oe/(1-e.thickness/2)),M=p(()=>`${a.value/2} ${a.value/2} ${a.value} ${a.value}`),w=p(()=>gt(e.value,e.min,e.max)),C=p(()=>Te*(1-(w.value-e.min)/(e.max-e.min))),E=p(()=>e.thickness/2*a.value);function _({thickness:q,offset:h,color:x,cls:O}){return y("circle",{class:"q-circular-progress__"+O+(x!==void 0?` text-${x}`:""),style:m.value,fill:"transparent",stroke:"currentColor","stroke-width":q,"stroke-dasharray":ht,"stroke-dashoffset":h,cx:a.value,cy:a.value,r:de})}return()=>{const q=[];e.centerColor!==void 0&&e.centerColor!=="transparent"&&q.push(y("circle",{class:`q-circular-progress__center text-${e.centerColor}`,fill:"currentColor",r:de-E.value/2,cx:a.value,cy:a.value})),e.trackColor!==void 0&&e.trackColor!=="transparent"&&q.push(_({cls:"track",thickness:E.value,offset:0,color:e.trackColor})),q.push(_({cls:"circle",thickness:E.value,offset:C.value,color:e.color}));const h=[y("svg",{class:"q-circular-progress__svg",style:s.value,viewBox:M.value,"aria-hidden":"true"},q)];return e.showValue===!0&&h.push(y("div",{class:"q-circular-progress__text absolute-full row flex-center content-center",style:{fontSize:e.fontSize}},t.default!==void 0?t.default():[y("div",w.value)])),y("div",{class:`q-circular-progress q-circular-progress--${e.indeterminate===!0?"in":""}determinate`,style:r.value,role:"progressbar","aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.indeterminate===!0?void 0:w.value},ze(t.internal,h))}}});const bt=["rejected"],pt=[...bt,"start","finish","added","removed"],yt=()=>!0;function kt(e){const t={};return e.forEach(l=>{t[l]=yt}),t}kt(pt);let ae,te=0;const N=new Array(256);for(let e=0;e<256;e++)N[e]=(e+256).toString(16).substring(1);const xt=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const l=new Uint8Array(t);return e.getRandomValues(l),l}}return t=>{const l=[];for(let r=t;r>0;r--)l.push(Math.floor(Math.random()*256));return l}})(),Se=4096;function Ct(){(ae===void 0||te+16>Se)&&(te=0,ae=xt(Se));const e=Array.prototype.slice.call(ae,te,te+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,N[e[0]]+N[e[1]]+N[e[2]]+N[e[3]]+"-"+N[e[4]]+N[e[5]]+"-"+N[e[6]]+N[e[7]]+"-"+N[e[8]]+N[e[9]]+"-"+N[e[10]]+N[e[11]]+N[e[12]]+N[e[13]]+N[e[14]]+N[e[15]]}const wt=[!0,!1,"ondemand"],St={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>wt.includes(e)}};function Vt(e,t){const{props:l,proxy:r}=Z(),s=P(!1),m=P(null),a=P(null);vt({validate:x,resetValidation:h});let M=0,w;const C=p(()=>l.rules!==void 0&&l.rules!==null&&l.rules.length>0),E=p(()=>l.disable!==!0&&C.value===!0),_=p(()=>l.error===!0||s.value===!0),q=p(()=>typeof l.errorMessage=="string"&&l.errorMessage.length>0?l.errorMessage:m.value);z(()=>l.modelValue,()=>{O()}),z(()=>l.reactiveRules,I=>{I===!0?w===void 0&&(w=z(()=>l.rules,()=>{O(!0)})):w!==void 0&&(w(),w=void 0)},{immediate:!0}),z(e,I=>{I===!0?a.value===null&&(a.value=!1):a.value===!1&&(a.value=!0,E.value===!0&&l.lazyRules!=="ondemand"&&t.value===!1&&F())});function h(){M++,t.value=!1,a.value=null,s.value=!1,m.value=null,F.cancel()}function x(I=l.modelValue){if(E.value!==!0)return!0;const $=++M;t.value!==!0&&l.lazyRules!==!0&&(a.value=!0);const S=(V,o)=>{s.value!==V&&(s.value=V);const u=o||void 0;m.value!==u&&(m.value=u),t.value=!1},A=[];for(let V=0;V<l.rules.length;V++){const o=l.rules[V];let u;if(typeof o=="function"?u=o(I):typeof o=="string"&&we[o]!==void 0&&(u=we[o](I)),u===!1||typeof u=="string")return S(!0,u),!1;u!==!0&&u!==void 0&&A.push(u)}return A.length===0?(S(!1),!0):(t.value=!0,Promise.all(A).then(V=>{if(V===void 0||Array.isArray(V)===!1||V.length===0)return $===M&&S(!1),!0;const o=V.find(u=>u===!1||typeof u=="string");return $===M&&S(o!==void 0,o),o===void 0},V=>($===M&&(console.error(V),S(!0)),!1)))}function O(I){E.value===!0&&l.lazyRules!=="ondemand"&&(a.value===!0||l.lazyRules!==!0&&I!==!0)&&F()}const F=De(x,0);return ne(()=>{w!==void 0&&w(),F.cancel()}),Object.assign(r,{resetValidation:h,validate:x}),Ue(r,"hasError",()=>_.value),{isDirtyModel:a,hasRules:C,hasError:_,errorMessage:q,validate:x,resetValidation:h}}const Ve=/^on[A-Z]/;function qt(e,t){const l={listeners:P({}),attributes:P({})};function r(){const s={},m={};for(const a in e)a!=="class"&&a!=="style"&&Ve.test(a)===!1&&(s[a]=e[a]);for(const a in t.props)Ve.test(a)===!0&&(m[a]=t.props[a]);l.attributes.value=s,l.listeners.value=m}return Le(r),r(),l}let ce=[],Mt=[];function ge(e){Mt.length===0?e():ce.push(e)}function _t(e){ce=ce.filter(t=>t!==e)}function fe(e){return e===void 0?`f_${Ct()}`:e}function ve(e){return e!=null&&(""+e).length>0}const Rt={...Ae,...St,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},Ft=["update:modelValue","clear","focus","blur","popup-show","popup-hide"];function At(){const{props:e,attrs:t,proxy:l,vnode:r}=Z();return{isDark:Fe(e,l.$q),editable:p(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:P(!1),focused:P(!1),hasPopupOpen:!1,splitAttrs:qt(t,r),targetUid:P(fe(e.for)),rootRef:P(null),targetRef:P(null),controlRef:P(null)}}function Bt(e){const{props:t,emit:l,slots:r,attrs:s,proxy:m}=Z(),{$q:a}=m;let M;e.hasValue===void 0&&(e.hasValue=p(()=>ve(t.modelValue))),e.emitValue===void 0&&(e.emitValue=n=>{l("update:modelValue",n)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:f,onFocusout:v}),Object.assign(e,{clearValue:d,onControlFocusin:f,onControlFocusout:v,focus:u}),e.computedCounter===void 0&&(e.computedCounter=p(()=>{if(t.counter!==!1){const n=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,k=t.maxlength!==void 0?t.maxlength:t.maxValues;return n+(k!==void 0?" / "+k:"")}}));const{isDirtyModel:w,hasRules:C,hasError:E,errorMessage:_,resetValidation:q}=Vt(e.focused,e.innerLoading),h=e.floatingLabel!==void 0?p(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):p(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),x=p(()=>t.bottomSlots===!0||t.hint!==void 0||C.value===!0||t.counter===!0||t.error!==null),O=p(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),F=p(()=>`q-field row no-wrap items-start q-field--${O.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(h.value===!0?" q-field--float":"")+($.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(E.value===!0?" q-field--error":"")+(E.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&x.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),I=p(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(E.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length>0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),$=p(()=>t.labelSlot===!0||t.label!==void 0),S=p(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&E.value!==!0?` text-${t.labelColor}`:"")),A=p(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:h.value,modelValue:t.modelValue,emitValue:e.emitValue})),V=p(()=>{const n={for:e.targetUid.value};return t.disable===!0?n["aria-disabled"]="true":t.readonly===!0&&(n["aria-readonly"]="true"),n});z(()=>t.for,n=>{e.targetUid.value=fe(n)});function o(){const n=document.activeElement;let k=e.targetRef!==void 0&&e.targetRef.value;k&&(n===null||n.id!==e.targetUid.value)&&(k.hasAttribute("tabindex")===!0||(k=k.querySelector("[tabindex]")),k&&k!==n&&k.focus({preventScroll:!0}))}function u(){ge(o)}function g(){_t(o);const n=document.activeElement;n!==null&&e.rootRef.value.contains(n)&&n.blur()}function f(n){clearTimeout(M),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,l("focus",n))}function v(n,k){clearTimeout(M),M=setTimeout(()=>{document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1)||(e.focused.value===!0&&(e.focused.value=!1,l("blur",n)),k!==void 0&&k())})}function d(n){Y(n),a.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),l("update:modelValue",null),l("clear",t.modelValue),Q(()=>{q(),a.platform.is.mobile!==!0&&(w.value=!1)})}function c(){const n=[];return r.prepend!==void 0&&n.push(y("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:G},r.prepend())),n.push(y("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},b())),E.value===!0&&t.noErrorIcon===!1&&n.push(j("error",[y(ie,{name:a.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?n.push(j("inner-loading-append",r.loading!==void 0?r.loading():[y(lt,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&n.push(j("inner-clearable-append",[y(ie,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||a.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:d})])),r.append!==void 0&&n.push(y("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:G},r.append())),e.getInnerAppend!==void 0&&n.push(j("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&n.push(e.getControlChild()),n}function b(){const n=[];return t.prefix!==void 0&&t.prefix!==null&&n.push(y("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&n.push(e.getShadowControl()),e.getControl!==void 0?n.push(e.getControl()):r.rawControl!==void 0?n.push(r.rawControl()):r.control!==void 0&&n.push(y("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},r.control(A.value))),$.value===!0&&n.push(y("div",{class:S.value},J(r.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&n.push(y("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),n.concat(J(r.default))}function R(){let n,k;E.value===!0?_.value!==null?(n=[y("div",{role:"alert"},_.value)],k=`q--slot-error-${_.value}`):(n=J(r.error),k="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(n=[y("div",t.hint)],k=`q--slot-hint-${t.hint}`):(n=J(r.hint),k="q--slot-hint"));const i=t.counter===!0||r.counter!==void 0;if(t.hideBottomSpace===!0&&i===!1&&n===void 0)return;const B=y("div",{key:k,class:"q-field__messages col"},n);return y("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale")},[t.hideBottomSpace===!0?B:y(Qe,{name:"q-transition--field-message"},()=>B),i===!0?y("div",{class:"q-field__counter"},r.counter!==void 0?r.counter():e.computedCounter.value):null])}function j(n,k){return k===null?null:y("div",{key:n,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},k)}Object.assign(m,{focus:u,blur:g});let U=!1;return Ee(()=>{U=!0}),$e(()=>{U===!0&&t.autofocus===!0&&m.focus()}),me(()=>{Ke.value===!0&&t.for===void 0&&(e.targetUid.value=fe()),t.autofocus===!0&&m.focus()}),ne(()=>{clearTimeout(M)}),function(){const k=e.getControl===void 0&&r.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...V.value}:V.value;return y("label",{ref:e.rootRef,class:[F.value,s.class],style:s.style,...k},[r.before!==void 0?y("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:G},r.before()):null,y("div",{class:"q-field__inner relative-position col self-stretch"},[y("div",{ref:e.controlRef,class:I.value,tabindex:-1,...e.controlEvents},c()),x.value===!0?R():null]),r.after!==void 0?y("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:G},r.after()):null])}}const qe={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},le={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Pe=Object.keys(le);Pe.forEach(e=>{le[e].regex=new RegExp(le[e].pattern)});const Et=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Pe.join("")+"])|(.)","g"),Me=/[.*+?^${}()|[\]\\]/g,T=String.fromCharCode(1),$t={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function It(e,t,l,r){let s,m,a,M;const w=P(null),C=P(_());function E(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}z(()=>e.type+e.autogrow,h),z(()=>e.mask,o=>{if(o!==void 0)x(C.value,!0);else{const u=A(C.value);h(),e.modelValue!==u&&t("update:modelValue",u)}}),z(()=>e.fillMask+e.reverseFillMask,()=>{w.value===!0&&x(C.value,!0)}),z(()=>e.unmaskedValue,()=>{w.value===!0&&x(C.value)});function _(){if(h(),w.value===!0){const o=$(A(e.modelValue));return e.fillMask!==!1?V(o):o}return e.modelValue}function q(o){if(o<s.length)return s.slice(-o);let u="",g=s;const f=g.indexOf(T);if(f>-1){for(let v=o-g.length;v>0;v--)u+=T;g=g.slice(0,f)+u+g.slice(f)}return g}function h(){if(w.value=e.mask!==void 0&&e.mask.length>0&&E(),w.value===!1){M=void 0,s="",m="";return}const o=qe[e.mask]===void 0?e.mask:qe[e.mask],u=typeof e.fillMask=="string"&&e.fillMask.length>0?e.fillMask.slice(0,1):"_",g=u.replace(Me,"\\$&"),f=[],v=[],d=[];let c=e.reverseFillMask===!0,b="",R="";o.replace(Et,(k,i,B,L,K)=>{if(L!==void 0){const D=le[L];d.push(D),R=D.negate,c===!0&&(v.push("(?:"+R+"+)?("+D.pattern+"+)?(?:"+R+"+)?("+D.pattern+"+)?"),c=!1),v.push("(?:"+R+"+)?("+D.pattern+")?")}else if(B!==void 0)b="\\"+(B==="\\"?"":B),d.push(B),f.push("([^"+b+"]+)?"+b+"?");else{const D=i!==void 0?i:K;b=D==="\\"?"\\\\\\\\":D.replace(Me,"\\\\$&"),d.push(D),f.push("([^"+b+"]+)?"+b+"?")}});const j=new RegExp("^"+f.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?$"),U=v.length-1,n=v.map((k,i)=>i===0&&e.reverseFillMask===!0?new RegExp("^"+g+"*"+k):i===U?new RegExp("^"+k+"("+(R===""?".":R)+"+)?"+(e.reverseFillMask===!0?"$":g+"*")):new RegExp("^"+k));a=d,M=k=>{const i=j.exec(k);i!==null&&(k=i.slice(1).join(""));const B=[],L=n.length;for(let K=0,D=k;K<L;K++){const re=n[K].exec(D);if(re===null)break;D=D.slice(re.shift().length),B.push(...re)}return B.length>0?B.join(""):k},s=d.map(k=>typeof k=="string"?k:T).join(""),m=s.split(T).join(u)}function x(o,u,g){const f=r.value,v=f.selectionEnd,d=f.value.length-v,c=A(o);u===!0&&h();const b=$(c),R=e.fillMask!==!1?V(b):b,j=C.value!==R;f.value!==R&&(f.value=R),j===!0&&(C.value=R),document.activeElement===f&&Q(()=>{if(R===m){const n=e.reverseFillMask===!0?m.length:0;f.setSelectionRange(n,n,"forward");return}if(g==="insertFromPaste"&&e.reverseFillMask!==!0){const n=v-1;F.right(f,n,n);return}if(["deleteContentBackward","deleteContentForward"].indexOf(g)>-1){const n=e.reverseFillMask===!0?v===0?R.length>b.length?1:0:Math.max(0,R.length-(R===m?0:Math.min(b.length,d)+1))+1:v;f.setSelectionRange(n,n,"forward");return}if(e.reverseFillMask===!0)if(j===!0){const n=Math.max(0,R.length-(R===m?0:Math.min(b.length,d+1)));n===1&&v===1?f.setSelectionRange(n,n,"forward"):F.rightReverse(f,n,n)}else{const n=R.length-d;f.setSelectionRange(n,n,"backward")}else if(j===!0){const n=Math.max(0,s.indexOf(T),Math.min(b.length,v)-1);F.right(f,n,n)}else{const n=v-1;F.right(f,n,n)}});const U=e.unmaskedValue===!0?A(R):R;String(e.modelValue)!==U&&l(U,!0)}function O(o,u,g){const f=$(A(o.value));u=Math.max(0,s.indexOf(T),Math.min(f.length,u)),o.setSelectionRange(u,g,"forward")}const F={left(o,u,g,f){const v=s.slice(u-1).indexOf(T)===-1;let d=Math.max(0,u-1);for(;d>=0;d--)if(s[d]===T){u=d,v===!0&&u++;break}if(d<0&&s[u]!==void 0&&s[u]!==T)return F.right(o,0,0);u>=0&&o.setSelectionRange(u,f===!0?g:u,"backward")},right(o,u,g,f){const v=o.value.length;let d=Math.min(v,g+1);for(;d<=v;d++)if(s[d]===T){g=d;break}else s[d-1]===T&&(g=d);if(d>v&&s[g-1]!==void 0&&s[g-1]!==T)return F.left(o,v,v);o.setSelectionRange(f?u:g,g,"forward")},leftReverse(o,u,g,f){const v=q(o.value.length);let d=Math.max(0,u-1);for(;d>=0;d--)if(v[d-1]===T){u=d;break}else if(v[d]===T&&(u=d,d===0))break;if(d<0&&v[u]!==void 0&&v[u]!==T)return F.rightReverse(o,0,0);u>=0&&o.setSelectionRange(u,f===!0?g:u,"backward")},rightReverse(o,u,g,f){const v=o.value.length,d=q(v),c=d.slice(0,g+1).indexOf(T)===-1;let b=Math.min(v,g+1);for(;b<=v;b++)if(d[b-1]===T){g=b,g>0&&c===!0&&g--;break}if(b>v&&d[g-1]!==void 0&&d[g-1]!==T)return F.leftReverse(o,v,v);o.setSelectionRange(f===!0?u:g,g,"forward")}};function I(o){if(Ze(o)===!0)return;const u=r.value,g=u.selectionStart,f=u.selectionEnd;if(o.keyCode===37||o.keyCode===39){const v=F[(o.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];o.preventDefault(),v(u,g,f,o.shiftKey)}else o.keyCode===8&&e.reverseFillMask!==!0&&g===f?F.left(u,g,f,!0):o.keyCode===46&&e.reverseFillMask===!0&&g===f&&F.rightReverse(u,g,f,!0)}function $(o){if(o==null||o==="")return"";if(e.reverseFillMask===!0)return S(o);const u=a;let g=0,f="";for(let v=0;v<u.length;v++){const d=o[g],c=u[v];if(typeof c=="string")f+=c,d===c&&g++;else if(d!==void 0&&c.regex.test(d))f+=c.transform!==void 0?c.transform(d):d,g++;else return f}return f}function S(o){const u=a,g=s.indexOf(T);let f=o.length-1,v="";for(let d=u.length-1;d>=0&&f>-1;d--){const c=u[d];let b=o[f];if(typeof c=="string")v=c+v,b===c&&f--;else if(b!==void 0&&c.regex.test(b))do v=(c.transform!==void 0?c.transform(b):b)+v,f--,b=o[f];while(g===d&&b!==void 0&&c.regex.test(b));else return v}return v}function A(o){return typeof o!="string"||M===void 0?typeof o=="number"?M(""+o):o:M(o)}function V(o){return m.length-o.length<=0?o:e.reverseFillMask===!0&&o.length>0?m.slice(0,-o.length)+o:o+m.slice(o.length)}return{innerValue:C,hasMask:w,moveCursorForPaste:O,updateMaskValue:x,onMaskedKeydown:I}}function Ot(e,t){function l(){const r=e.modelValue;try{const s="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(r)===r&&("length"in r?Array.from(r):[r]).forEach(m=>{s.items.add(m)}),{files:s.files}}catch{return{files:void 0}}}return t===!0?p(()=>{if(e.type==="file")return l()}):p(l)}const Tt=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,Pt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,Nt=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,zt=/[a-z0-9_ -]$/i;function jt(e){return function(l){if(l.type==="compositionend"||l.type==="change"){if(l.target.qComposing!==!0)return;l.target.qComposing=!1,e(l)}else l.type==="compositionupdate"&&l.target.qComposing!==!0&&typeof l.data=="string"&&(He.is.firefox===!0?zt.test(l.data)===!1:Tt.test(l.data)===!0||Pt.test(l.data)===!0||Nt.test(l.data)===!0)===!0&&(l.target.qComposing=!0)}}var ue=oe({name:"QInput",inheritAttrs:!1,props:{...Rt,...$t,...Ie,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Ft,"paste","change"],setup(e,{emit:t,attrs:l}){const r={};let s=NaN,m,a,M,w;const C=P(null),E=ut(e),{innerValue:_,hasMask:q,moveCursorForPaste:h,updateMaskValue:x,onMaskedKeydown:O}=It(e,t,c,C),F=Ot(e,!0),I=p(()=>ve(_.value)),$=jt(d),S=At(),A=p(()=>e.type==="textarea"||e.autogrow===!0),V=p(()=>A.value===!0||["text","search","url","tel","password"].includes(e.type)),o=p(()=>{const i={...S.splitAttrs.listeners.value,onInput:d,onPaste:v,onChange:R,onBlur:j,onFocus:he};return i.onCompositionstart=i.onCompositionupdate=i.onCompositionend=$,q.value===!0&&(i.onKeydown=O),e.autogrow===!0&&(i.onAnimationend=b),i}),u=p(()=>{const i={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:E.value,...S.splitAttrs.attributes.value,id:S.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return A.value===!1&&(i.type=e.type),e.autogrow===!0&&(i.rows=1),i});z(()=>e.type,()=>{C.value&&(C.value.value=e.modelValue)}),z(()=>e.modelValue,i=>{if(q.value===!0){if(a===!0&&(a=!1,String(i)===s))return;x(i)}else _.value!==i&&(_.value=i,e.type==="number"&&r.hasOwnProperty("value")===!0&&(m===!0?m=!1:delete r.value));e.autogrow===!0&&Q(b)}),z(()=>e.autogrow,i=>{i===!0?Q(b):C.value!==null&&l.rows>0&&(C.value.style.height="auto")}),z(()=>e.dense,()=>{e.autogrow===!0&&Q(b)});function g(){ge(()=>{const i=document.activeElement;C.value!==null&&C.value!==i&&(i===null||i.id!==S.targetUid.value)&&C.value.focus({preventScroll:!0})})}function f(){C.value!==null&&C.value.select()}function v(i){if(q.value===!0&&e.reverseFillMask!==!0){const B=i.target;h(B,B.selectionStart,B.selectionEnd)}t("paste",i)}function d(i){if(!i||!i.target)return;if(e.type==="file"){t("update:modelValue",i.target.files);return}const B=i.target.value;if(i.target.qComposing===!0){r.value=B;return}if(q.value===!0)x(B,!1,i.inputType);else if(c(B),V.value===!0&&i.target===document.activeElement){const{selectionStart:L,selectionEnd:K}=i.target;L!==void 0&&K!==void 0&&Q(()=>{i.target===document.activeElement&&B.indexOf(i.target.value)===0&&i.target.setSelectionRange(L,K)})}e.autogrow===!0&&b()}function c(i,B){w=()=>{e.type!=="number"&&r.hasOwnProperty("value")===!0&&delete r.value,e.modelValue!==i&&s!==i&&(s=i,B===!0&&(a=!0),t("update:modelValue",i),Q(()=>{s===i&&(s=NaN)})),w=void 0},e.type==="number"&&(m=!0,r.value=i),e.debounce!==void 0?(clearTimeout(M),r.value=i,M=setTimeout(w,e.debounce)):w()}function b(){const i=C.value;if(i!==null){const B=i.parentNode.style,{overflow:L}=i.style;B.marginBottom=i.scrollHeight-1+"px",i.style.height="1px",i.style.overflow="hidden",i.style.height=i.scrollHeight+"px",i.style.overflow=L,B.marginBottom=""}}function R(i){$(i),clearTimeout(M),w!==void 0&&w(),t("change",i.target.value)}function j(i){i!==void 0&&he(i),clearTimeout(M),w!==void 0&&w(),m=!1,a=!1,delete r.value,e.type!=="file"&&setTimeout(()=>{C.value!==null&&(C.value.value=_.value!==void 0?_.value:"")})}function U(){return r.hasOwnProperty("value")===!0?r.value:_.value!==void 0?_.value:""}ne(()=>{j()}),me(()=>{e.autogrow===!0&&b()}),Object.assign(S,{innerValue:_,fieldClass:p(()=>`q-${A.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:p(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length>0),inputRef:C,emitValue:c,hasValue:I,floatingLabel:p(()=>I.value===!0||ve(e.displayValue)),getControl:()=>y(A.value===!0?"textarea":"input",{ref:C,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...u.value,...o.value,...e.type!=="file"?{value:U()}:F.value}),getShadowControl:()=>y("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(A.value===!0?"":" text-no-wrap")},[y("span",{class:"invisible"},U()),y("span",e.shadowText)])});const n=Bt(S),k=Z();return Object.assign(k.proxy,{focus:g,select:f,getNativeElement:()=>C.value}),n}}),Dt=oe({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validation-success","validation-error"],setup(e,{slots:t,emit:l}){const r=Z(),s=P(null);let m=0;const a=[];function M(h){const x=[],O=typeof h=="boolean"?h:e.noErrorFocus!==!0,F=++m,I=($,S)=>{l("validation-"+($===!0?"success":"error"),S)};for(let $=0;$<a.length;$++){const S=a[$],A=S.validate();if(typeof A.then=="function")x.push(A.then(V=>({valid:V,comp:S}),V=>({valid:!1,comp:S,err:V})));else if(A!==!0){if(e.greedy===!1)return I(!1,S),O===!0&&typeof S.focus=="function"&&S.focus(),Promise.resolve(!1);x.push({valid:!1,comp:S})}}return x.length===0?(I(!0),Promise.resolve(!0)):Promise.all(x).then($=>{const S=$.filter(u=>u.valid!==!0);if(S.length===0)return F===m&&I(!0),!0;const{valid:A,comp:V,err:o}=S[0];return F===m&&(o!==void 0&&console.error(o),I(!1,V),O===!0&&A!==!0&&typeof V.focus=="function"&&V.focus()),!1})}function w(){m++,a.forEach(h=>{typeof h.resetValidation=="function"&&h.resetValidation()})}function C(h){h!==void 0&&Y(h);const x=m+1;M().then(O=>{x===m&&O===!0&&(e.onSubmit!==void 0?l("submit",h):h!==void 0&&h.target!==void 0&&typeof h.target.submit=="function"&&h.target.submit())})}function E(h){h!==void 0&&Y(h),l("reset"),Q(()=>{w(),e.autofocus===!0&&e.noResetFocus!==!0&&_()})}function _(){ge(()=>{if(s.value===null)return;const h=s.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(s.value.querySelectorAll("[tabindex]"),x=>x.tabIndex>-1);h!=null&&h.focus({preventScroll:!0})})}We(Be,{bindComponent(h){a.push(h)},unbindComponent(h){const x=a.indexOf(h);x>-1&&a.splice(x,1)}});let q=!1;return Ee(()=>{q=!0}),$e(()=>{q===!0&&e.autofocus===!0&&_()}),me(()=>{e.autofocus===!0&&_()}),Object.assign(r.proxy,{validate:M,resetValidation:w,submit:C,reset:E,focus:_,getValidationComponents:()=>a}),()=>y("form",{class:"q-form",ref:s,onSubmit:C,onReset:E},J(t.default))}});const Ut=Ye({name:"SettingsPage",setup(){const e=pe(),{gridw:t,callsignw:l}=Ge(pe),r=P(e.callsign),s=P(e.grid);return{store:e,callsign:r,callsignw:l,gridw:t,grid:s,mode:"callsign",onSubmit:a};function a(M){e.grid=s.value,e.callsign=r.value}},mounted(){},methods:{fooo(e){console.log(e)}},data(){return{}}}),Lt={class:"q-pa-md"},Kt=se("div",{class:"q-pa-md"},null,-1);function Qt(e,t,l,r,s,m){return Xe(),et(nt,{class:"flex flex-center"},{default:be(()=>[se("div",Lt,[H(Dt,{onSubmit:tt(e.onSubmit,["prevent"]),class:"q-gutter-md"},{default:be(()=>[H(ye,{modelValue:e.store.track_callsign,"onUpdate:modelValue":t[0]||(t[0]=a=>e.store.track_callsign=a),label:"Track callsign"},null,8,["modelValue"]),H(ue,{label:"Callsign",type:"text",mask:"NNNNNNNN","model-value":e.store.callsign,onInput:t[1]||(t[1]=a=>{e.callsign=a.target.value,e.console.log("ddd")}),"onUpdate:modelValue":t[2]||(t[2]=a=>e.callsign=a)},null,8,["model-value"]),H(ye,{modelValue:e.store.track_grid,"onUpdate:modelValue":t[3]||(t[3]=a=>e.store.track_grid=a),label:"Track grid"},null,8,["modelValue"]),H(ue,{label:"Grid",type:"text",mask:"AA##","model-value":e.store.grid,"onUpdate:modelValue":t[4]||(t[4]=a=>e.grid=a)},null,8,["model-value"]),H(ue,{modelValue:e.store.report_ttl,"onUpdate:modelValue":t[5]||(t[5]=a=>e.store.report_ttl=a),modelModifiers:{number:!0},label:"Time to Live",type:"number",style:{"max-width":"200px"}},null,8,["modelValue"]),se("div",null,[H(ot,{label:"OK",type:"submit",color:"primary"})])]),_:1},8,["onSubmit"]),Kt])]),_:1})}var el=Je(Ut,[["render",Qt]]);export{el as default};

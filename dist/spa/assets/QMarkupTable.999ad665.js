import{a as s,u as n}from"./use-dark.f3633fc8.js";import{c as u,h as d}from"./render.ee7eb639.js";import{g as b,l as e,x as c}from"./index.a41dfe7f.js";const q=["horizontal","vertical","cell","none"];var f=u({name:"QMarkupTable",props:{...s,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:a=>q.includes(a)}},setup(a,{slots:r}){const t=c(),l=n(a,t.proxy.$q),o=b(()=>`q-markup-table q-table__container q-table__card q-table--${a.separator}-separator`+(l.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(a.dense===!0?" q-table--dense":"")+(a.flat===!0?" q-table--flat":"")+(a.bordered===!0?" q-table--bordered":"")+(a.square===!0?" q-table--square":"")+(a.wrapCells===!1?" q-table--no-wrap":""));return()=>e("div",{class:o.value},[e("table",{class:"q-table"},d(r.default))])}});export{f as Q};

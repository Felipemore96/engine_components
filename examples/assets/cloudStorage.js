import{C as c,S as r,P as l,a as i,b as d,c as m,F as p}from"./index-CizoHJPb.js";import{C as w}from"./index-CGzn00vr.js";const g=document.getElementById("container"),e=new c,s=new r(e);s.setup();e.scene=s;const u=new l(e,g);e.renderer=u;const t=new i(e);e.camera=t;e.raycaster=new d(e);e.init();t.controls.setLookAt(10,10,10,0,0,0);new m(e);const o=new w(e);o.token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiNjUwNmYyZjk0NWM4YmM2YTk0Mzg0NjM4IiwiYSI6IjY1NTRjMTJjODRmZTUwOTk4Yzk2YWViYyJ9.orL8C6hAS4Lj6D_kDAeUiGytNVqgpPL2wV9a7sTMpAg";await o.update();const a=o.get();console.log(a);for(const n of a)o.delete(n._id);window.ondblclick=async()=>{await o.upload("../../../resources/small.ifc"),console.log("Model uploaded! Starting processing...")};new p(e);async function C(n){console.log("Model process successful!"),console.log(n)}o.modelProcessed.add(C);
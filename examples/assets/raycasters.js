import{M as u,B as p,a as i}from"./web-ifc-api-CwSt8Jc1.js";import{S as w}from"./stats.min-BpIepu9J.js";import{p as b,C as f,s as y,i as g,H as x,z as M}from"./index-DPXwPaYJ.js";const h=document.getElementById("container"),o=new b,B=o.get(f),e=B.create();e.scene=new y(o);e.renderer=new g(o,h);e.camera=new x(o);o.init();e.camera.controls.setLookAt(10,10,10,0,0,0);e.scene.setup();e.scene.three.background=null;const d=new u({color:"#6528D7"}),z=new u({color:"#BCF124"}),m=new p(3,3,3),c=new i(m,d),s=new i(m,d),a=new i(m,d);e.scene.three.add(c,s,a);const C=[c,s,a];s.position.x=5;a.position.x=-5;const t=Math.PI/180;function S(){c.rotation.x+=t,c.rotation.y+=t,s.rotation.x+=t,s.rotation.z+=t,a.rotation.y+=t,a.rotation.z+=t}e.renderer.onBeforeUpdate.add(S);const j=o.get(M),I=j.get(e);let l=null;window.onmousemove=()=>{const r=I.castRay(C);l&&(l.material=d),!(!r||!(r.object instanceof i))&&(r.object.material=z,l=r.object)};const n=new w;n.showPanel(2);document.body.append(n.dom);n.dom.style.left="0px";n.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>n.begin());e.renderer.onAfterUpdate.add(()=>n.end());

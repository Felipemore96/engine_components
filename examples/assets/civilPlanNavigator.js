import"./web-ifc-api-CwSt8Jc1.js";import{p as g,C as l,s as u,n as f,d as h,u as w}from"./index-DPXwPaYJ.js";import{U as y,g as b,c as v}from"./index-DGnK434s.js";import{p as B}from"./index-K5IA6oiZ.js";import{s as S}from"./index-CrwBh_hv.js";import{S as U}from"./stats.min-BpIepu9J.js";B.init();S.init();const i=document.getElementById("container"),t=new g,x=t.get(l),e=x.create();e.scene=new u(t);e.renderer=new y(t,i);e.camera=new f(t);t.init();e.scene.setup();e.camera.controls.setLookAt(5,5,5,0,0,0);i.appendChild(e.renderer.three2D.domElement);const A=t.get(h);A.create(e);e.scene.three.background=null;const C=t.get(w),E=await fetch("https://thatopen.github.io/engine_components/resources/road.frag"),I=await E.arrayBuffer(),k=new Uint8Array(I),r=C.load(k);e.scene.three.add(r);const a=t.get(b);a.world=e;a.draw(r);const m=document.getElementById("scene-2d"),s=t.get(v);m.components=t;s.world=m.world;await s.draw(r);s.onHighlight.add(({mesh:o})=>{a.highlighter.select(o);const p=o.curve.index,d=o.curve.alignment.absolute[p];d.mesh.geometry.computeBoundingSphere();const c=d.mesh.geometry.boundingSphere;c&&e.camera.controls.fitToSphere(c,!0)});const n=new U;n.showPanel(2);document.body.append(n.dom);n.dom.style.left="0px";n.dom.style.zIndex="unset";e.renderer.onBeforeUpdate.add(()=>n.begin());e.renderer.onAfterUpdate.add(()=>n.end());

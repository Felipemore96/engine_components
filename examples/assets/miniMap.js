import{D as p,A as f,C as l}from"./index-chvdFvuw.js";import{S as g}from"./stats.min-GTpOrGrX.js";import{g as u}from"./lil-gui.module.min-Bc0DeA9g.js";import{a as w,S as h,b}from"./simple-camera-B_AjQ3IU.js";import{F as C}from"./index-BpaUgoW5.js";import"./_commonjsHelpers-Cpj98o6Y.js";const y=document.getElementById("container"),e=new w,i=new h(e);i.setup();e.scene=i;const o=new(void 0)(e,y);e.renderer=o;const r=new b(e);e.camera=r;e.raycaster=new(void 0)(e);e.init();o.postproduction.enabled=!0;const m=e.scene.get();r.controls.setLookAt(10,10,10,0,0,0);const d=new p;d.position.set(5,10,3);d.intensity=.5;m.add(d);const c=new f;c.intensity=.5;m.add(c);const x=new(void 0)(e,new l(6710886)),S=x.get();o.postproduction.customEffects.excludedMeshes.push(S);const z=new C(e),L=await fetch("../../../resources/small.frag"),k=await L.arrayBuffer(),A=new Uint8Array(k);z.load(A);const n=new(void 0)(e);e.ui.add(n.uiElement.get("canvas"));n.lockRotation=!1;n.zoom=.2;const a=new g;a.showPanel(2);document.body.append(a.dom);a.dom.style.left="0px";o.onBeforeUpdate.add(()=>a.begin());o.onAfterUpdate.add(()=>a.end());const t=new u,s=n.getSize();t.add(n,"enabled").name("Map enabled");t.add(n,"lockRotation").name("Lock rotation");t.add(n,"zoom").name("Zoom").min(.01).max(.5).step(.01);t.add(n,"frontOffset").name("Front offset").min(0).max(10).step(.5);t.add(s,"x").name("Width").min(100).max(500).step(10).onChange(()=>n.resize(s));t.add(s,"y").name("Height").min(100).max(500).step(10).onChange(()=>n.resize(s));t.addColor(n,"backgroundColor");

import{C as g}from"./index-chvdFvuw.js";import{S as p}from"./stats.min-GTpOrGrX.js";import"./N8AO-ICbsPPfP.js";import{P as w}from"./index-d_s4H9yV.js";import"./_commonjsHelpers-Cpj98o6Y.js";const h=document.getElementById("container"),e=new(void 0),f=new(void 0)(e);f.setup();e.scene=f;const n=new w(e,h);e.renderer=n;const a=new(void 0)(e);e.camera=a;e.raycaster=new(void 0)(e);e.init();n.postproduction.enabled=!0;n.postproduction.customEffects.outlineEnabled=!0;a.controls.setLookAt(12,6,8,0,0,-10);const v=new(void 0)(e,new g(6710886)),b=n.postproduction.customEffects;b.excludedMeshes.push(v.get());const y=new(void 0)(e),c=new(void 0)(e);c.settings.wasm={path:"https://unpkg.com/web-ifc@0.0.50/",absolute:!0};c.settings.webIfc.COORDINATE_TO_ORIGIN=!0;c.settings.webIfc.OPTIMIZE_PROFILES=!0;const E=await fetch("../../../resources/asdf.frag"),I=await E.arrayBuffer(),C=new Uint8Array(I),d=await y.load(C),o=new(void 0)(e);o.draw(d);o.setup();o.highlighter.hoverCurve.material.color.set(1,1,1);const{material:i}=o.highlighter.hoverPoints;if(Array.isArray(i)){const t=i[0];"color"in t&&t.color.set(1,1,1)}else"color"in i&&i.color.set(1,1,1);const u=new(void 0)(e),P=u.uiElement.get("floatingWindow");P.visible=!0;u.draw(d);const s=new(void 0)(e),A=s.uiElement.get("drawer");A.visible=!0;u.onHighlight.add(({mesh:t})=>{s.clear(),s.draw(d,[t.curve.alignment]),s.highlighter.select(t),o.highlighter.select(t);const m=t.curve.index,l=t.curve.alignment.absolute[m];l.mesh.geometry.computeBoundingSphere(),a.controls.fitToSphere(l.mesh.geometry.boundingSphere,!0)});const r=new p;r.showPanel(2);document.body.append(r.dom);r.dom.style.left="0px";n.onBeforeUpdate.add(()=>r.begin());n.onAfterUpdate.add(()=>r.end());

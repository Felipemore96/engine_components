var k=Object.defineProperty;var G=(t,o,e)=>o in t?k(t,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[o]=e;var a=(t,o,e)=>(G(t,typeof o!="symbol"?o+"":o,e),e);import{a8 as B,aj as R,ak as v,al as O,i as T,ab as D}from"./web-ifc-api-BC8YMRiS.js";import{S as j}from"./stats.min-GTpOrGrX.js";import{p as W,a as $,m as z}from"./index-DyM33b1I.js";import{C as M,E as N,a as J,W as q,S as Y,b as _,c as H}from"./index-B99Vyz6D.js";import{G as K}from"./index-vdN6D13n.js";import{I as U}from"./index-Cy4SZRUH.js";import{A as F}from"./async-event-D8tC9awa.js";import{P as Q}from"./streaming-settings-CK_tvevt.js";import{G as V}from"./ifc-geometry-types-C3SKrzrZ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./ifc-fragment-settings-CiVry-YT.js";class A extends M{constructor(){super(...arguments);a(this,"onPropertiesStreamed",new F);a(this,"onProgress",new F);a(this,"onIndicesStreamed",new F);a(this,"onDisposed",new N);a(this,"enabled",!0);a(this,"settings",new Q);a(this,"webIfc",new B)}async dispose(){this.onIndicesStreamed.reset(),this.onPropertiesStreamed.reset(),this.webIfc=null,this.onDisposed.reset()}async streamFromBuffer(e){const s=performance.now();await this.readIfcFile(e),await this.streamAllProperties(),this.cleanUp(),console.log(`Streaming the IFC took ${performance.now()-s} ms!`)}async streamFromCallBack(e){const s=performance.now();await this.streamIfcFile(e),await this.streamAllProperties(),this.cleanUp(),console.log(`Streaming the IFC took ${performance.now()-s} ms!`)}async readIfcFile(e){const{path:s,absolute:i,logLevel:n}=this.settings.wasm;this.webIfc.SetWasmPath(s,i),await this.webIfc.Init(),n&&this.webIfc.SetLogLevel(n),this.webIfc.OpenModel(e,this.settings.webIfc)}async streamIfcFile(e){const{path:s,absolute:i,logLevel:n}=this.settings.wasm;this.webIfc.SetWasmPath(s,i),await this.webIfc.Init(),n&&this.webIfc.SetLogLevel(n),this.webIfc.OpenModelFromCallback(e,this.settings.webIfc)}async streamAllProperties(){const{propertiesSize:e}=this.settings,s=new Set(this.webIfc.GetIfcEntityList(0)),i=new Set([R,v,O,T,D]);for(const c of i)s.add(c);let n=.01,C=0;for(const c of s){if(C++,V.has(c))continue;const L=i.has(c),u=this.webIfc.GetLineIDsWithType(0,c),y=u.size();let S=0;for(let p=0;p<y-e;p+=e){const m={};for(let d=0;d<e;d++){S++;const f=u.get(p+d);try{const P=this.webIfc.GetLine(0,f,L);m[P.expressID]=P}catch{console.log(`Could not get property: ${f}`)}}await this.onPropertiesStreamed.trigger({type:c,data:m})}if(S!==y){const p={};for(let m=S;m<y;m++){const d=u.get(m);try{const f=this.webIfc.GetLine(0,d,L);p[f.expressID]=f}catch{console.log(`Could not get property: ${d}`)}}await this.onPropertiesStreamed.trigger({type:c,data:p})}const x=C/s.size;x>n&&(n+=.01,n=Math.max(n,x),await this.onProgress.trigger(Math.round(n*100)/100))}const E=await this.components.get(U).processFromWebIfc(this.webIfc,0);await this.onIndicesStreamed.trigger(E)}cleanUp(){this.webIfc=null,this.webIfc=new B}}a(A,"uuid","88d2c89c-ce32-47d7-8cb6-d51e4b311a0b");const X=document.getElementById("container"),r=new J,Z=r.get(q),l=Z.create();l.scene=new Y(r);l.renderer=new _(r,X);l.camera=new H(r);r.init();l.camera.controls.setLookAt(12,6,8,0,0,-10);const ee=r.get(K);ee.create(l);function te(t,o){const e=new File([o],t),s=document.createElement("a"),i=URL.createObjectURL(e);s.href=i,s.download=e.name,s.click(),URL.revokeObjectURL(i)}async function se(t){for(const{name:o,bits:e}of t)te(o,e),await new Promise(s=>{setTimeout(s,100)})}const h=new A(r);h.settings.wasm={path:"https://unpkg.com/web-ifc@0.0.53/",absolute:!0};const w={types:{},ids:{},indexesFile:"small.ifc-processed-properties-indexes"};let b=0;const g=[];h.onPropertiesStreamed.add(async t=>{w.types[t.type]||(w.types[t.type]=[]),w.types[t.type].push(b);for(const s in t.data)w.ids[s]=b;const o=`small.ifc-processed-properties-${b}`,e=new Blob([JSON.stringify(t.data)]);g.push({bits:e,name:o}),b++});h.onProgress.add(async t=>{console.log(t)});h.onIndicesStreamed.add(async t=>{g.push({name:"small.ifc-processed-properties.json",bits:new Blob([JSON.stringify(w)])});const e=r.get(U).serializeRelations(t);g.push({name:"small.ifc-processed-properties-indexes",bits:new Blob([e])}),await se(g)});async function oe(){const o=await(await fetch("https://thatopen.github.io/engine_components/resources/small.ifc")).arrayBuffer(),e=new Uint8Array(o);await h.streamFromBuffer(e)}W.init();const ne=$.create(()=>z`
    <bim-panel active label="IFC Properties Tiler Tutorial" 
      style="position: fixed; top: 5px; right: 5px">
      
      <bim-panel-section style="padding-top: 12px;">
      
        <bim-button label="Load IFC"
          @click="${()=>{oe()}}">
        </bim-button>  
      
      </bim-panel-section>
      
    </bim-panel>
  `);document.body.append(ne);const I=new j;I.showPanel(2);document.body.append(I.dom);I.dom.style.left="0px";l.renderer.onBeforeUpdate.add(()=>I.begin());l.renderer.onAfterUpdate.add(()=>I.end());

import{j as i}from"./jsx-runtime-BjG_zV1W.js";import{g as Ee,r}from"./index-DGOumNSj.js";var ke={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var d={}.hasOwnProperty;function a(){for(var t="",s=0;s<arguments.length;s++){var c=arguments[s];c&&(t=h(t,v(c)))}return t}function v(t){if(typeof t=="string"||typeof t=="number")return t;if(typeof t!="object")return"";if(Array.isArray(t))return a.apply(null,t);if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]"))return t.toString();var s="";for(var c in t)d.call(t,c)&&t[c]&&(s=h(s,c));return s}function h(t,s){return s?t?t+" "+s:t+s:t}o.exports?(a.default=a,o.exports=a):window.classNames=a})()})(ke);var Ke=ke.exports;const R=Ee(Ke),Ie="_container_j42wa_1",Re="_childWrapper_j42wa_5",qe="_slider_j42wa_12",Be="_toggleButton_j42wa_24",Le="_right_j42wa_28",Me="_left_j42wa_28",We="_top_j42wa_40",Ae="_bottom_j42wa_40",Pe="_resizer_j42wa_58",Oe="_animating_j42wa_74",$e="_shadow_j42wa_78",Fe="_hidden_j42wa_109",b={container:Ie,childWrapper:Re,slider:qe,toggleButton:Be,right:Le,left:Me,top:We,bottom:Ae,resizer:Pe,animating:Oe,shadow:$e,hidden:Fe},Ve=({direction:o="right",initialSize:d,minSize:a,maxSize:v,boundSize:h,onResize:t,storageKey:s,toggleKey:c})=>{const F=r.useRef(null),x=d!==void 0?parseInt(d,10):200,S=(e,n=0)=>{if(typeof e=="number")return e;if(typeof e=="string"){const w=parseInt(e,10);return isNaN(w)?n:w}return n},l=S(a,0),j=v!==void 0?S(v):void 0,k=S(h,0),T=()=>{if(typeof window>"u")return x;try{const e=localStorage.getItem(s);if(e)return JSON.parse(e).currentSize||x}catch(e){console.error("Error reading stored size:",e)}return x},[V,y]=r.useState(()=>T()),[E,_]=r.useState(!1),u=r.useRef(null),g=r.useRef(T()),f=r.useRef(null),C=r.useRef(null),D=o==="right"||o==="left",z=r.useCallback((e,n)=>{try{localStorage.setItem(s,JSON.stringify({currentSize:e,previousSize:n}))}catch(w){console.error("Error saving size to localStorage:",w)}},[s]),m=r.useCallback((e,n)=>{u.current={x:e,y:n}},[]),U=e=>{let n=e.target;for(;n;){if(n.getAttribute("data-ignore-resize")==="true")return!0;n=n.parentElement}return!1},De=r.useCallback(e=>{U(e.nativeEvent)||(e.preventDefault(),m(e.clientX,e.clientY))},[m]),Ne=r.useCallback(e=>{U(e.nativeEvent)||(e.preventDefault(),e.currentTarget&&e.currentTarget.setPointerCapture&&e.currentTarget.setPointerCapture(e.pointerId),m(e.clientX,e.clientY))},[m]),G=r.useCallback((e,n)=>{if(!u.current)return;const w=e-u.current.x,Q=n-u.current.y;y(J=>{let p=J;return D?p=J+(o==="right"?w:-w):p=J+(o==="top"?Q:-Q),p=Math.max(p,l),j!==void 0&&(p=Math.min(p,j)),p>l&&(g.current=p),t&&t(p),p}),u.current={x:e,y:n}},[D,o,l,j,t]),N=r.useCallback(e=>{C.current=e,f.current===null&&(f.current=requestAnimationFrame(()=>{C.current&&G(C.current.clientX,C.current.clientY),f.current=null}))},[G]),K=r.useCallback(()=>{u.current&&(y(e=>{const n=e<k?l:e;return n>l&&(g.current=n),z(n,g.current),e<k&&_(!0),n}),u.current=null)},[k,l,z]),I=r.useCallback(()=>{K()},[K]),X=r.useCallback(()=>{K()},[K]),Y=r.useCallback(()=>{y(e=>{const n=e===l?g.current:l;return console.log(e,n),_(!0),z(n,g.current),n})},[l,z]),H=r.useCallback(e=>{e.ctrlKey&&e.key===c&&(e.preventDefault(),Y())},[Y,c]);r.useEffect(()=>(document.addEventListener("mousemove",N),document.addEventListener("mouseup",I),document.addEventListener("pointermove",N),document.addEventListener("pointerup",X),document.addEventListener("keydown",H),()=>{document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",I),document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",X),document.removeEventListener("keydown",H),f.current&&cancelAnimationFrame(f.current)}),[N,I,X,H]);const Te=r.useCallback(()=>{_(!1)},[]);return{containerRef:F,size:V,isAnimating:E,handleMouseDown:De,handlePointerDown:Ne,toggleCollapse:Y,isHorizontal:D,handleMouseUp:I,isResizing:!!u.current,handleTransitionEnd:Te}},_e=({children:o,direction:d="right",initialSize:a,maxSize:v,minSize:h,boundSize:t,onResize:s,toggleKey:c="[",animationDuration:F=300,storageKey:x,ariaLabel:S,containerClassName:l,sliderClassName:j,toggleButtonClassName:k,toggleButtonIcon:T})=>{const{containerRef:V,size:y,isAnimating:E,handleMouseDown:_,handlePointerDown:u,toggleCollapse:g,isHorizontal:f,isResizing:C,handleTransitionEnd:D}=Ve({direction:d,initialSize:a,minSize:h,maxSize:v,boundSize:t,onResize:s,storageKey:x,toggleKey:c}),z=r.useCallback(m=>{(m.key==="Enter"||m.key===" ")&&(m.preventDefault(),g())},[g]);return i.jsxs("div",{ref:V,className:R(b.container,l,{[b.animating]:E}),style:{[f?"width":"height"]:`${y}px`,transition:E?`${f?"width":"height"} ${F}ms ease-in-out`:"none"},onTransitionEnd:D,role:"region","aria-label":S,children:[o,i.jsxs("div",{className:R(b.slider,b[d],j),onMouseDown:_,onPointerDown:u,onKeyDown:z,role:"separator","aria-valuenow":Number(y),"aria-valuemin":Number(h),"aria-valuemax":Number(v),"aria-orientation":f?"horizontal":"vertical",tabIndex:0,children:[i.jsx("div",{className:b.resizer,"aria-hidden":"true"}),i.jsx("button",{className:R(b.toggleButton,k),onClick:m=>{console.log("click"),m.stopPropagation(),g()},"data-ignore-resize":"true","aria-label":`Toggle ${d} panel`,"aria-expanded":y!==Number(h),children:T}),i.jsx("div",{className:R(b.shadow,y<=Number(t||0)&&C&&b.infoShadow),"aria-hidden":"true"})]})]})};_e.__docgenInfo={description:"",methods:[],displayName:"ResizableContainer",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},direction:{required:!1,tsType:{name:"union",raw:'"right" | "left" | "top" | "bottom"',elements:[{name:"literal",value:'"right"'},{name:"literal",value:'"left"'},{name:"literal",value:'"top"'},{name:"literal",value:'"bottom"'}]},description:"",defaultValue:{value:'"right"',computed:!1}},toggleKey:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"["',computed:!1}},initialSize:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},maxSize:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},minSize:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},boundSize:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},onResize:{required:!1,tsType:{name:"signature",type:"function",raw:"(size: number) => void",signature:{arguments:[{type:{name:"number"},name:"size"}],return:{name:"void"}}},description:""},animationDuration:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"300",computed:!1}},storageKey:{required:!0,tsType:{name:"string"},description:""},ariaLabel:{required:!1,tsType:{name:"string"},description:""},containerClassName:{required:!1,tsType:{name:"string"},description:""},sliderClassName:{required:!1,tsType:{name:"string"},description:""},toggleButtonClassName:{required:!1,tsType:{name:"string"},description:""},toggleButtonIcon:{required:!1,tsType:{name:"ReactNode"},description:""}}};const He={title:"Components/ResizableContainer",component:_e,parameters:{layout:"fullscreen",docs:{description:{component:"A resizable and collapsible container component for React applications."}}},tags:["autodocs"],argTypes:{direction:{control:"select",options:["right","left","top","bottom"],description:"Direction in which the container can be resized"},initialSize:{control:"number",description:"Initial size of the container in pixels"},minSize:{control:"number",description:"Minimum size the container can be resized to"},maxSize:{control:"number",description:"Maximum size the container can be resized to"},boundSize:{control:"number",description:"Size below which the container will snap to minSize"},toggleKey:{control:"text",description:"Keyboard key that when pressed with Ctrl will toggle the panel"},animationDuration:{control:"number",description:"Duration of the collapse/expand animation in milliseconds"},storageKey:{control:"text",description:"Key used to store the container size in localStorage",required:!0},toggleButtonIcon:{control:!1,description:"Custom icon for the toggle button"},children:{control:!1,description:"Content to be placed inside the container"}},args:{direction:"right",initialSize:300,minSize:0,maxSize:500,boundSize:100,animationDuration:300,toggleKey:"[",storageKey:"storybook-resizable-container",children:i.jsx("div",{style:{height:"99dvh",backgroundColor:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:"Resizable Container Content"})}},q={},B={args:{direction:"left",storageKey:"storybook-resizable-container-left",children:i.jsx("div",{style:{height:"100dvh",backgroundColor:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:"Left Direction Content"})},decorators:[o=>i.jsx("div",{style:{display:"grid",width:"100dvw",justifyContent:"end",overflow:"hidden"},children:i.jsx(o,{})})]},L={args:{direction:"top",storageKey:"storybook-resizable-container-top",children:i.jsx("div",{style:{width:"100dvw",height:"inherit",backgroundColor:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:"Top Direction Content"})},decorators:[o=>i.jsx("div",{style:{display:"grid",height:"100dvh",width:"100dvw",justifyContent:"start",overflow:"hidden"},children:i.jsx(o,{})})]},M={args:{direction:"bottom",storageKey:"storybook-resizable-container-bottom",children:i.jsx("div",{style:{width:"100dvw",height:"inherit",backgroundColor:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"},children:"Bottom Direction Content"})},decorators:[o=>i.jsx("div",{style:{display:"grid",height:"100dvh",justifyContent:"end",alignContent:"end",overflow:"hidden"},children:i.jsx(o,{})})]},W={args:{storageKey:"storybook-resizable-container-styled",containerClassName:"custom-container",childrenWrapperClassName:"custom-wrapper",sliderClassName:"custom-slider",toggleButtonClassName:"custom-toggle"},decorators:[o=>i.jsxs("div",{children:[i.jsx("style",{children:`
            .custom-container {
              border: 2px solid #3498db;
              border-radius: 8px;
            }
          
            .custom-slider {
            }
            .custom-toggle {
              background-color: #2980b9 !important;
              top: 50% !important;
            }
          `}),i.jsx(o,{})]})]},A={args:{storageKey:"storybook-resizable-container-custom-icon",toggleButtonIcon:i.jsx("span",{children:"⇄"})}},P={args:{storageKey:"storybook-resizable-container-slow-animation",animationDuration:1e3}},O={args:{storageKey:"storybook-resizable-container-constraints",minSize:200,maxSize:400,initialSize:300}},$={args:{storageKey:"storybook-resizable-container-toggle"},play:async({canvasElement:o,step:d})=>{const a=o.querySelector("button");a&&await d("Toggle collapse",async()=>{a.click()})}};var Z,ee,te;q.parameters={...q.parameters,docs:{...(Z=q.parameters)==null?void 0:Z.docs,source:{originalSource:"{}",...(te=(ee=q.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ne,re,oe;B.parameters={...B.parameters,docs:{...(ne=B.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  args: {
    direction: "left",
    storageKey: "storybook-resizable-container-left",
    children: <div style={{
      height: "100dvh",
      backgroundColor: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
        Left Direction Content
      </div>
  },
  decorators: [Story => <div style={{
    display: "grid",
    width: "100dvw",
    justifyContent: "end",
    overflow: "hidden"
  }}>
        <Story />
      </div>]
}`,...(oe=(re=B.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ie,se,ae;L.parameters={...L.parameters,docs:{...(ie=L.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    direction: "top",
    storageKey: "storybook-resizable-container-top",
    children: <div style={{
      width: "100dvw",
      height: "inherit",
      backgroundColor: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
        Top Direction Content
      </div>
  },
  decorators: [Story => <div style={{
    display: "grid",
    height: "100dvh",
    width: "100dvw",
    justifyContent: "start",
    overflow: "hidden"
  }}>
        <Story />
      </div>]
}`,...(ae=(se=L.parameters)==null?void 0:se.docs)==null?void 0:ae.source}}};var ce,le,de;M.parameters={...M.parameters,docs:{...(ce=M.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {
    direction: "bottom",
    storageKey: "storybook-resizable-container-bottom",
    children: <div style={{
      width: "100dvw",
      height: "inherit",
      backgroundColor: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    }}>
        Bottom Direction Content
      </div>
  },
  decorators: [Story => <div style={{
    display: "grid",
    height: "100dvh",
    justifyContent: "end",
    alignContent: "end",
    overflow: "hidden"
  }}>
        <Story />
      </div>]
}`,...(de=(le=M.parameters)==null?void 0:le.docs)==null?void 0:de.source}}};var ue,me,pe;W.parameters={...W.parameters,docs:{...(ue=W.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    storageKey: "storybook-resizable-container-styled",
    containerClassName: "custom-container",
    childrenWrapperClassName: "custom-wrapper",
    sliderClassName: "custom-slider",
    toggleButtonClassName: "custom-toggle"
  },
  decorators: [Story => <div>
        <style>
          {\`
            .custom-container {
              border: 2px solid #3498db;
              border-radius: 8px;
            }
          
            .custom-slider {
            }
            .custom-toggle {
              background-color: #2980b9 !important;
              top: 50% !important;
            }
          \`}
        </style>
        <Story />
      </div>]
}`,...(pe=(me=W.parameters)==null?void 0:me.docs)==null?void 0:pe.source}}};var ge,fe,he;A.parameters={...A.parameters,docs:{...(ge=A.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  args: {
    storageKey: "storybook-resizable-container-custom-icon",
    toggleButtonIcon: <span>⇄</span>
  }
}`,...(he=(fe=A.parameters)==null?void 0:fe.docs)==null?void 0:he.source}}};var ye,be,ve;P.parameters={...P.parameters,docs:{...(ye=P.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  args: {
    storageKey: "storybook-resizable-container-slow-animation",
    animationDuration: 1000
  }
}`,...(ve=(be=P.parameters)==null?void 0:be.docs)==null?void 0:ve.source}}};var we,Ce,ze;O.parameters={...O.parameters,docs:{...(we=O.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    storageKey: "storybook-resizable-container-constraints",
    minSize: 200,
    maxSize: 400,
    initialSize: 300
  }
}`,...(ze=(Ce=O.parameters)==null?void 0:Ce.docs)==null?void 0:ze.source}}};var xe,Se,je;$.parameters={...$.parameters,docs:{...(xe=$.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    storageKey: "storybook-resizable-container-toggle"
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const toggleButton = canvasElement.querySelector("button");
    if (toggleButton) {
      await step("Toggle collapse", async () => {
        toggleButton.click();
      });
    }
  }
}`,...(je=(Se=$.parameters)==null?void 0:Se.docs)==null?void 0:je.source}}};const Je=["Default","LeftDirection","TopDirection","BottomDirection","WithCustomStyle","WithCustomToggleIcon","SlowAnimation","WithMinMaxConstraints","WithToggleCollapse"];export{M as BottomDirection,q as Default,B as LeftDirection,P as SlowAnimation,L as TopDirection,W as WithCustomStyle,A as WithCustomToggleIcon,O as WithMinMaxConstraints,$ as WithToggleCollapse,Je as __namedExportsOrder,He as default};

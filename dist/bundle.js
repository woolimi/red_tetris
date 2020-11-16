/*! For license information please see bundle.js.LICENSE.txt */
	width: 100%;
	height: 100%;
	background: rgba(${A=>A.color}, 0.8);
	border: 4px solid;
	border-bottom-color: rgba(${A=>A.color}, 0.1);
	border-right-color: rgba(${A=>A.color}, 1);
	border-top-color: rgba(${A=>A.color}, 1);
	border-left-color: rgba(${A=>A.color}, 0.3);
	opacity: ${A=>"S"===A.type?.2:1};
`,Pc=({type:e,status:t})=>A.createElement(Tc,{"data-testid":"cell",color:0===e||Zr().isUndefined(t)||2===t?sa[e].color:sa.B.color,type:e.length&&e.length>1?"S":"N"}),Wc=A.memo(Pc),Lc=Sc.div`
	display: grid;
	grid-template-columns: repeat(10, 1fr);
	grid-gap: 2px;
	border: 4px solid #333;
	width: calc(20vw * ${A=>A.scale});
	height: calc(40vw * ${A=>A.scale});
	min-width: calc(250px * ${A=>A.scale});
	min-height: calc(500px * ${A=>A.scale});
	background: #111;
	margin: auto;
	position: relative;
`,Oc=Sc.div`
	position: absolute;
	top: 50%;
	right: 50%;
	font-size: 4vmin;
	transform: translateX(50%);
	font-family: Pixel;
`,Xc=({screen:e,scale:t,pstatus:i,pid:o})=>{const{isStarted:n,winner:r}=ma();let a=(0,A.useMemo)((()=>n||1!==i?n||3!==i?void 0:r===o?"WIN":"LOSE":"READY"),[n,r,i,o]);return A.createElement(Lc,{scale:t},e&&e.map(((e,t)=>0===t?null:e.map(((e,t)=>A.createElement(Wc,{key:t,type:e,status:i}))))),A.createElement(Oc,null,a))},Kc=A.memo(Xc),qc=Sc.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	margin: 0 0 20px 0;
	padding: 20px;
	border: 3px solid #333;
	min-height: 30px;
	width: 100%;
	border-radius: 20px;
	font-family: Pixel, Arial, Helvetica, sans-serif;
	font-size: 1rem;
	align-items: center;

	& .title {
		margin-bottom: 5px;
	}
`,Vc=({score:e})=>A.createElement(qc,null,A.createElement("div",{className:"title"},"score"),A.createElement("div",null,e)),Zc=A.memo(Vc),_c=({isOwner:e,name:t})=>A.createElement("div",null,e&&A.createElement(Ii,{color:"red",name:"star","data-testid":"icon"}),t),$c=A.memo(_c),As=Sc.div`
	box-sizing: border-box;
	margin-top: 3em;
	margin-bottom: 1em;
	padding: 20px;
	border: 3px solid #333;
	background: #000;
	font-family: Pixel, Arial, Helvetica, sans-serif;
	font-size: 1rem;
	align-items: center;
	width: 100%;
	border-radius: 20px;
`,es=Sc.div`
	display: grid;
	grid-template-columns: repeat(${A=>A.columns}, 1fr);
	grid-gap: 1px;
	width: 5vw;
	height: 5vw;
	margin: auto;
`,ts=({type:e})=>A.createElement(As,null,A.createElement("div",null,"NEXT"),A.createElement(es,{columns:e&&sa[e].matrix[0].length},e&&sa[e].matrix.map((e=>e.map(((e,t)=>A.createElement(Wc,{key:t,type:e}))))))),is=A.memo(ts),os=({isOwner:e,disabled:t,wrapperRef:i})=>{const o=fa(),n=(0,A.useCallback)((()=>{o.emit("PLAYER:READY")}),[o]),r=(0,A.useCallback)((()=>{i.current.focus(),o.emit("GAME:START")}),[o,i]);return A.createElement(A.Fragment,null,A.createElement(No,{color:e?"red":"blue",onClick:e?r:n,disabled:t},e?"start":"ready"))},ns=A.memo(os),rs=({isOwner:e})=>{const t=fa(),{mapIdx:i,isStarted:o}=ma();let n=(0,A.useMemo)((()=>0===i?"basic":1===i?"heart":2===i?"zigzag":3===i?"tree":void 0),[i]);const r=(0,A.useCallback)((A=>{const e=A.currentTarget.dataset.direction;t.emit("GAME:CHANGE_MAP",{dir:e})}),[]);return A.createElement(qc,null,A.createElement("div",{className:"title"},"Map"),A.createElement(No.Group,null,A.createElement(No,{floated:"left",color:"red",icon:"left chevron",onClick:r,"data-direction":"left",disabled:!!o||!e}),A.createElement(No,{content:n,color:"black",disabled:!0}),A.createElement(No,{floated:"right",color:"red",icon:"right chevron","data-direction":"right",onClick:r,disabled:!!o||!e})))},as=A.memo(rs),cs=({wrapperRef:e})=>{const{players:t,owner:i,dropTime:o,isStarted:n}=ma(),r=fa(),a=t[r.id],c=!i||a&&a.id===i,s=(0,A.useMemo)((()=>Object.values(Zr().omit(t,[r.id]))),[t,r.id]);return function(e,t){const i=(0,A.useRef)();(0,A.useEffect)((()=>{i.current=e}),[e]),(0,A.useEffect)((()=>{if(null!==t){const A=setInterval((function(){i.current()}),t);return()=>{clearInterval(A)}}}),[t])}((()=>{r.emit("PLAYER:DROPDOWN",{type:"DOWN"})}),o),A.createElement(Xr,null,A.createElement(Gr,null,A.createElement(Gr.Column,{width:10},A.createElement(Xr,{fluid:!0},A.createElement($c,{isOwner:c,name:a?a.name:""}),A.createElement(Kc,{screen:a?a.screen:null,scale:1,pstatus:a?a.status:null,pid:a?a.id:null}))),A.createElement(Gr.Column,{width:6},A.createElement(is,{type:a?a.nextPiece:""}),A.createElement(Zc,{score:a?a.score:""}),A.createElement(as,{isOwner:c}),A.createElement(ns,{isOwner:c,wrapperRef:e,disabled:c?!0===n||s&&!!s.find((A=>1!==A.status)):!0===n||a&&1===a.status}))))},ss=Sc.div`
	height: 60%;
`,ls=()=>{const{players:e,owner:t}=ma(),i=fa(),o=(0,A.useMemo)((()=>Object.values(Zr().omit(e,[i.id]))),[e,i.id]);return A.createElement(ss,null,A.createElement(Xr,{fluid:!0},A.createElement(Gr,{centered:!0},o&&o.map((e=>A.createElement(Gr.Column,{width:6,key:e.id},A.createElement(Xr,{textAlign:"center",fluid:!0},A.createElement($c,{isOwner:e.id===t,name:e.name}),A.createElement(Kc,{screen:e.screen,scale:.5,pid:e.id,pstatus:e.status}))))))))};var us=t(5687),Cs=t.n(us);const ds=Sc.div`
	height: 30vh;
	width: 100%;
	box-sizing: border-box;
	border: 3px solid #333;
	background-color: #35353538;
	border-radius: 3px;
	overflow-y: scroll;
	overflow-x: hidden;
	padding: 0 1em 0 1em;
`,Bs=Sc.div`
	text-align: left;
`,gs=Sc.p`
	color: ${A=>Cs()(A.color)};
	margin-bottom: 3px !important;
`,bs=({list:e})=>{const t=(0,A.useRef)(null);return(0,A.useEffect)((()=>{t.current.scrollTop=t.current.scrollHeight}),[e]),A.createElement(ds,{ref:t},e.map(((e,t)=>A.createElement(Bs,{key:t},A.createElement(gs,{color:e.userName},e.userName," : ",e.content)))))},ms=A.memo(bs),fs=Sc.div`
	height: 15%;
	width: 100%;
	margin-bottom: 10px;
`,ws=({onSubmit:e,onChange:t,content:i})=>A.createElement(fs,null,A.createElement("form",{onSubmit:e},A.createElement(gr,{fluid:!0,action:{color:"red",icon:"send"},value:i,onChange:t,placeholder:"some message..."}))),ps=A.memo(ws),hs=Sc.div`
	height: 40%;
	width: 80%;
	padding: 0;
	margin: auto;
`,Qs=()=>{const[e,t]=(0,A.useState)([]),[i,o]=(0,A.useState)(""),n=fa();(0,A.useEffect)((()=>{n.emit("CHAT:ENTER")}),[n]),(0,A.useEffect)((()=>{n.on("CHAT",(A=>{t((e=>{const t=e.concat(A);return t.length>50&&t.shift(),t}))}))}),[n]);const r=(0,A.useCallback)((A=>{A.preventDefault(),o((A=>(n.emit("CHAT",{content:A}),"")))})),a=(0,A.useCallback)((A=>{o(A.target.value)}),[]);return A.createElement(hs,null,A.createElement(ms,{list:e}),A.createElement(ps,{onSubmit:r,onChange:a,content:i}))};function Es(e){var t=e.active,i=e.children,o=e.className,n=e.content,a=e.disabled,c=e.indeterminate,s=e.inline,l=e.inverted,u=ge("ui",e.size,fe(t,"active"),fe(a,"disabled"),fe(c,"indeterminate"),fe(l,"inverted"),fe(i||n,"text"),pe(s,"inline"),"loader",o),C=ke(Es,e),d=ye(Es,e);return A.createElement(d,r({},C,{className:u}),oi(i)?n:i)}Es.handledProps=["active","as","children","className","content","disabled","indeterminate","inline","inverted","size"],Es.propTypes={};const xs=Es,ks=Sc.div`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	align-items: center;
`,ys=({history:e,match:t})=>{const{roomName:i,userName:o}=t.params,n=fa(),{isStarted:r}=ma(),a=(0,A.useRef)(null),c=(0,A.useContext)(ua);(function(e,t,i,o){(0,A.useEffect)((()=>((async(A,e,t,i)=>{const o=await fetch(`${ta}/api/room?roomName=${A}&userName=${e}`,{method:"GET"}),{error:n}=await o.json();n?(alert(n),t.push("/")):i.emit("ROOM:ADD_PLAYER",{roomName:A,userName:e})})(e,t,i,o),()=>(ca.offSound(),o&&o.close()))),[e,t,o])})(i,o,e,n),function(e,t,i,o){(0,A.useEffect)((()=>{if(!e)throw Error("socket connection error");e.on("ROOM:PLAYERS",(A=>{t({type:"ROOM:PLAYERS",...A})})),e.on("ROOM:OWNER",(A=>{t({type:"ROOM:OWNER",...A})})),e.on("GAME:CHANGE_MAP",(A=>{t({type:"GAME:CHANGE_MAP",...A})})),e.on("GAME:START",(A=>{t({type:"GAME:START",...A})})),e.on("GAME:FINISH",(A=>{t({type:"GAME:FINISH",...A})})),e.on("PLAYER:GAMEOVER",(A=>{t({type:"PLAYER:GAMEOVER",...A})})),e.on("PLAYER:QUIT",(A=>{t({type:"PLAYER:QUIT",...A})})),e.on("PLAYER:READY",(A=>{t({type:"PLAYER:READY",...A})})),e.on("PLAYER:MOVE",(A=>{t({type:"PLAYER:MOVE",...A})})),e.on("PLAYER:ROTATE",(A=>{t({type:"PLAYER:ROTATE",...A})})),e.on("PLAYER:DROPDOWN",(A=>{A.isPenalty&&A.id===e.id&&ca.penaltySound.play(),t({type:"PLAYER:DROPDOWN",...A})}))}),[i,o])}(n,c,i,o);const s=(0,A.useCallback)((A=>{if(r)switch(A.key){case"ArrowUp":n.emit("PLAYER:ROTATE"),A.preventDefault();break;case"ArrowDown":n.emit("PLAYER:DROPDOWN",{type:"DOWN"}),c({type:"GAME:DROPTIME",dropTime:null}),A.preventDefault();break;case"ArrowLeft":n.emit("PLAYER:MOVE",{dir:-1}),A.preventDefault();break;case"ArrowRight":n.emit("PLAYER:MOVE",{dir:1}),A.preventDefault();break;case" ":n.emit("PLAYER:DROPDOWN",{type:"DROP"}),ca.fallSound.play(),c({type:"GAME:DROPTIME",dropTime:null}),A.preventDefault()}}),[n,r]);return A.createElement(ks,{role:"tetris",tabIndex:"0",onKeyDown:s,ref:a},A.createElement(Xr,{textAlign:"center",fluid:!0},n.connected?A.createElement(Gr,null,A.createElement(Gr.Column,{width:8},A.createElement(cs,{wrapperRef:a})),A.createElement(Gr.Column,{width:8},A.createElement(ls,null),A.createElement(Qs,null))):A.createElement(go,{active:!0},A.createElement(xs,{content:"Loading"}))))},vs=({history:e,match:t})=>A.createElement(ga,null,A.createElement(ba,null,A.createElement(ys,{history:e,match:t}))),Is=()=>A.createElement(S,{hashType:"noslash"},A.createElement(j,{path:"/",exact:!0,component:Lr}),A.createElement(j,{path:"/:roomName[:userName]",component:vs}));var Ds=t(3379),Ys=t.n(Ds),Fs=t(2275);Ys()(Fs.Z,{insert:"head",singleton:!1}),Fs.Z.locals;var Ms=t(2578);Ys()(Ms.Z,{insert:"head",singleton:!1}),Ms.Z.locals,e.render(A.createElement(Is,null),document.getElementById("root"))})()})();
//# sourceMappingURL=bundle.js.map
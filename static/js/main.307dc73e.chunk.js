(this.webpackJsonpcyclog=this.webpackJsonpcyclog||[]).push([[0],{203:function(e,t){},210:function(e,t){},258:function(e,t,n){e.exports=n.p+"static/media/directions_bike_24px.64beea8c.svg"},296:function(e,t,n){e.exports=n(705)},301:function(e,t,n){},307:function(e,t,n){},701:function(e,t){},705:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(32),o=n.n(i),c=(n(301),n(115)),l=n(69),s=n(62),u=n(12),p=n(254),d=n(57),m=n(790),f=n(766),g=n(768),b=n(135),O=n(767),h=n(765),j=n(205),y=n.n(j),v=n(256),w=n.n(v),E=n(769),P=n(772),S=n(770),C=n(257),k=n.n(C),D=n(771),x=n(762),N=n(764),I=n(204),R=n.n(I),B=n(185),L="pk.eyJ1IjoibmF0aGFua2lwcCIsImEiOiJjazNid2k3enIwN2QzM2Nucmp5b3NmaXY0In0.cMIErB8-bLVio-MGSeXlfg",z={latitude:39,longitude:-97,zoom:3.25,transitionDuration:"auto",transitionInterpolator:new B.a},M={black:[0,0,0],red:[150,50,50],green:[50,150,50],blue:[50,50,150]},F=Object(p.a)((function(e){return{appBar:{backgroundColor:"#323296",transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},avatars:{display:"flex",alignItems:"flex-end",position:"absolute",right:e.spacing(2)},avatar:{marginRight:e.spacing(2)},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"}}}));var A=function(e){var t=e.open,n=e.handleDrawerOpen,a=(e.handleDrawerClose,F());return Object(d.a)(),r.a.createElement(x.a,{position:"fixed",className:Object(u.a)(a.appBar,Object(s.a)({},a.appBarShift,t))},r.a.createElement(N.a,null,r.a.createElement(h.a,{color:"inherit","aria-label":"open drawer",onClick:n,edge:"start",className:Object(u.a)(a.menuButton,t&&a.hide)},r.a.createElement(R.a,null)),r.a.createElement(b.a,{variant:"h6",noWrap:!0},"Chroncycle \u2022 A cycling chronical, brah")))};function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var T=Object(p.a)((function(e){return{root:{display:"flex"},appBar:{backgroundColor:"#323296",transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(240,"px)"),marginLeft:240,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},avatars:{display:"flex",alignItems:"flex-end",position:"absolute",right:e.spacing(2)},avatar:{marginRight:e.spacing(2)},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:J({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar,{justifyContent:"space-between"}),loadingRides:{padding:e.spacing(0,2)},content:{position:"relative",flexGrow:1,height:"100vh",padding:e.spacing(0),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0},mainContent:{position:"absolute",top:0,right:0,bottom:0,left:0}}}));var W=function(e){var t=e.rides,n=e.selectRide,a=e.children,i=T(),o=Object(d.a)(),c=r.a.useState(!0),p=Object(l.a)(c,2),j=p[0],v=p[1],C=r.a.useState(null),x=Object(l.a)(C,2),N=x[0],I=x[1],R=function(){v(!1)};return r.a.createElement("div",{className:i.root},r.a.createElement(f.a,null),r.a.createElement(A,{open:j,handleDrawerOpen:function(){v(!0)},handleDrawerClose:R}),r.a.createElement(m.a,{className:i.drawer,variant:"persistent",anchor:"left",open:j,classes:{paper:i.drawerPaper}},r.a.createElement("div",{className:i.drawerHeader},r.a.createElement(b.a,{variant:"h6",noWrap:!0},"Rides"),r.a.createElement(h.a,{onClick:R},"ltr"===o.direction?r.a.createElement(y.a,null):r.a.createElement(w.a,null))),r.a.createElement(O.a,null),r.a.createElement(g.a,null,!t.length&&r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,null,r.a.createElement(S.a,{primary:"Loading..."})),r.a.createElement("div",{className:i.loadingRides},r.a.createElement(D.a,null))),t.map((function(e){return r.a.createElement(E.a,{button:!0,key:e.name,onClick:function(){return function(e){n(e),I(e.id)}(e)},selected:e.id===N},r.a.createElement(P.a,null,r.a.createElement(k.a,null)),r.a.createElement(S.a,{primary:e.name}))})))),r.a.createElement("main",{className:Object(u.a)(i.content,Object(s.a)({},i.contentShift,j))},r.a.createElement("div",{className:i.drawerHeader}),r.a.createElement("div",{className:i.mainContent},a)))},H=n(786),X=(n(306),n(307),n(151)),V=n.n(X);function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}V.a.config.region="us-east-2",V.a.config.credentials=new V.a.CognitoIdentityCredentials({IdentityPoolId:"us-east-2:1056edee-e9e2-4c61-8f7e-45d31a5ab8a4"});var Q=new V.a.DynamoDB.DocumentClient;function Y(){return new Promise((function(e,t){Q.scan({TableName:"cyclog"},(function(n,a){n?t("ride list cannot be retrieved"):e(a.Items.map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{color:M.black})})))}))}))}var q=n(788),K=n(787),U=n(258),Z=n.n(U);function $(e){return new q.a({id:e.name,data:[{coordinates:e.path}],iconAtlas:Z.a,iconMapping:{rider:{x:0,y:0,width:24,height:24,mask:!0}},getIcon:function(){return"rider"},getColor:function(){return e.color},getPosition:function(e){return e.coordinates},sizeMinPixels:28})}function ee(e){return new K.a({id:e.name,data:[{path:e.path}],getColor:function(){return e.color},rounded:!0,widthMinPixels:2})}function te(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function ne(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?te(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):te(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ae(e){if(!e)return[];var t=[];return t.push(ne({},e,{name:"".concat(e.name,"-start"),color:M.green,path:e.path[0]})),e.path.length>1&&t.push(ne({},e,{name:"".concat(e.name,"-end"),color:M.red,path:e.path[e.path.length-1]})),t}var re=n(263),ie=n.n(re),oe=n(782),ce=n(783),le=n(264),se=n.n(le),ue=n(265),pe=n.n(ue),de=n(266),me=n.n(de),fe=n(780),ge=n(785),be=n(775),Oe=n(779),he=n(777),je=n(778),ye=n(776),ve=n(781),we=Object(p.a)((function(e){return{wrapper:{margin:e.spacing(1),position:"relative"},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}}));var Ee=function(e){var t=e.open,n=e.handleClose,i=e.handleClickSave,o=Object(a.useState)(""),c=Object(l.a)(o,2),s=c[0],u=c[1],p=Object(a.useState)(!1),d=Object(l.a)(p,2),m=d[0],f=d[1],g=we();return r.a.createElement(be.a,{open:t,onClose:n,"aria-labelledby":"form-dialog-title"},r.a.createElement(ye.a,{id:"form-dialog-title",style:{minWidth:300}},"Ride Details"),r.a.createElement(he.a,null,r.a.createElement(je.a,null,"Give your ride a name"),r.a.createElement(ge.a,{autoFocus:!0,margin:"dense",id:"name",label:"Name",type:"text",fullWidth:!0,onChange:function(e){var t=e.target.value;return u(t)},value:s})),r.a.createElement(Oe.a,null,r.a.createElement(fe.a,{variant:"contained",color:"primary",onClick:n,disabled:m},"Cancel"),r.a.createElement("div",{className:g.wrapper},r.a.createElement(fe.a,{variant:"contained",color:"primary",onClick:function(){f(!0),i(s)},disabled:m},"Save"),m&&r.a.createElement(ve.a,{className:g.buttonProgress,size:24}))))};function Pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var Se=Object(p.a)((function(e){return{card:{position:"absolute",bottom:e.spacing(3),right:"50%",transform:"translateX(50%)",width:200},cardContent:{display:"flex",justifyContent:"space-around",padding:e.spacing(1),"&:last-child":{paddingBottom:e.spacing(1)}},undo:{color:"#323296"},save:{color:"#329632"},delete:{color:"#963232"}}}));var Ce=function(e){var t=e.open,n=e.setOpen,a=(e.viewport,e.path),i=e.setPath,o=e.newRide,c=e.saveRide,l=Se();return Object(d.a)(),r.a.createElement(r.a.Fragment,null,r.a.createElement(oe.a,{className:l.card},r.a.createElement(ce.a,{className:l.cardContent},r.a.createElement(h.a,{"aria-label":"undo",className:l.undo,onClick:function(){return i(a.slice(0,-1))}},r.a.createElement(se.a,null)),r.a.createElement(h.a,{"aria-label":"save",className:l.save,onClick:function(){n(!0)}},r.a.createElement(pe.a,null)),r.a.createElement(h.a,{"aria-label":"trash",className:l.delete,onClick:function(){window.confirm("are you sure?")&&i([])}},r.a.createElement(me.a,null)))),r.a.createElement(Ee,{open:t,handleClickSave:function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Pe(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},o,{id:o.id||ie()(),name:e});c(t).then((function(){n(!1)}))},handleClose:function(){n(!1)}}))};function ke(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function De(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ke(n,!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ke(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function xe(e,t){return[{color:M.blue,path:e,viewport:t}]}var Ne=function(e,t){return e.map((function(e){return De({},e,{color:e.id===t.id?M.blue:M.black})}))},Ie=function(e){var t=e.longitude,n=e.latitude,a=e.zoom;return De({},z,{longitude:t,latitude:n,zoom:a})},Re=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],i=t[1],o=Object(a.useState)([]),s=Object(l.a)(o,2),u=s[0],p=s[1],d=Object(a.useState)([]),m=Object(l.a)(d,2),f=m[0],g=m[1],b=Object(a.useState)(!1),O=Object(l.a)(b,2),h=O[0],j=O[1],y=Object(a.useState)(z),v=Object(l.a)(y,2),w=v[0],E=v[1];function P(e){var t=Ne(n,e),a=e.id?ae(e):[],r=Ie(e.viewport);i(t),p(a),E(r)}Object(a.useEffect)((function(){Y().then(i)}),[]),Object(a.useEffect)((function(){if(f.length){var e=xe(f,w),t=f.length-1,n=De({},w,{longitude:f[t][0],latitude:f[t][1]});P(e[0]),E(n)}}),[f]);var S=[],C=[];f.length&&(C=ae((S=xe(f,w))[0]));var k=[].concat(Object(c.a)(n.map(ee)),Object(c.a)(u.map($)),Object(c.a)(S.map(ee)),Object(c.a)(C.map($)));return r.a.createElement(W,{rides:n,selectRide:P},r.a.createElement(B.b,Object.assign({},w,{onClick:function(e){g([].concat(Object(c.a)(f),[e.lngLat])),E(De({},w,{longitude:e.lngLat[0],latitude:e.lngLat[1]}))},onViewportChange:E,mapboxApiAccessToken:L,mapStyle:"mapbox://styles/mapbox/outdoors-v11",height:"100%",width:"100%"}),r.a.createElement(H.a,{viewState:w,layers:k})),!!f.length&&r.a.createElement(Ce,{open:h,setOpen:j,viewport:w,path:f,setPath:g,newRide:S[0],saveRide:function(e){return function(e){return new Promise((function(t,n){Q.put({Item:e,TableName:"cyclog"},(function(e,a){e?n("ride was not saved"):t()}))}))}(e).then((function(){var t=[].concat(Object(c.a)(n),[De({},e,{color:M.black})]);i(t),g([])}))}}))};o.a.render(r.a.createElement(Re,null),document.getElementById("root"))}},[[296,1,2]]]);
//# sourceMappingURL=main.307dc73e.chunk.js.map
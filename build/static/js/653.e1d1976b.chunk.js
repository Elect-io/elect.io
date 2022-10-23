"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[653],{4497:function(e,n,t){var s=t(4165),r=t(1413),i=t(5861),a=t(885),o=t(2791),c=t(4569),l=t.n(c),d=t(6871),u=t(8687),p=t(184);n.Z=(0,u.$j)((function(e){return{generalQuestions:e.poll}}))((function(e){var n=o.useState({answers:[],partyName:e.partyName,showMoreAdvocate:!1,loaded:!1,showMoreOppose:!1,matchesBy:null}),t=(0,a.Z)(n,2),c=t[0],u=t[1],h=(0,d.s0)();return o.useEffect((function(){(0,i.Z)((0,s.Z)().mark((function n(){var t,i,a,o,d;return(0,s.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l().get("/api/answer-politician-general-question/"+e._id);case 2:if(i=n.sent,u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{answers:i.data.answers,loaded:!0})})),0!==(null===(t=c.partyName)||void 0===t?void 0:t.length)&&c.partyName){n.next=10;break}return n.next=7,l().get("/api/party/"+e.partyAffiliation);case 7:a=n.sent,console.log(a.data),u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{partyName:a.data.party.name})}));case 10:return n.next=12,l().get("/api/analyze/"+e._id);case 12:o=n.sent,d=Math.round(100*o.data.matchingQuestions*100/o.data.totalQuestions)/100,u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{matchesBy:d})}));case 15:case"end":return n.stop()}}),n)})))()}),[]),console.log(e),c.loaded?(0,p.jsxs)("div",{className:"candidate-snippet",children:[(0,p.jsxs)("div",{onClick:function(){h("/candidate/"+e._id)},className:"candidate-snippet-header",children:[(0,p.jsx)("img",{alt:e.name,src:e.picture}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h3",{children:e.name}),(0,p.jsxs)("h3",{children:[c.partyName?c.partyName+",":""," ",e.state,", ",e.country]})]})]}),(0,p.jsxs)("div",{className:"candidate-snippet-heading",children:[(0,p.jsxs)("svg",{width:"19",height:"19",viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,p.jsxs)("g",{"clip-path":"url(#clip0_229_2566)",children:[(0,p.jsx)("path",{d:"M14.25 6.33301C14.8799 6.33301 15.484 6.58323 15.9294 7.02863C16.3748 7.47403 16.625 8.07812 16.625 8.70801C16.625 9.3379 16.3748 9.94199 15.9294 10.3874C15.484 10.8328 14.8799 11.083 14.25 11.083",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}),(0,p.jsx)("path",{d:"M7.91666 6.33301V15.0413C7.91666 15.2513 7.83325 15.4527 7.68478 15.6011C7.53632 15.7496 7.33495 15.833 7.12499 15.833H6.33332C6.12336 15.833 5.922 15.7496 5.77353 15.6011C5.62506 15.4527 5.54166 15.2513 5.54166 15.0413V11.083",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"}),(0,p.jsx)("path",{d:"M9.5 6.33321L13.0815 3.34863C13.1856 3.26195 13.3122 3.20672 13.4465 3.18943C13.5808 3.17213 13.7173 3.19348 13.84 3.25098C13.9626 3.30847 14.0663 3.39972 14.1389 3.51405C14.2115 3.62837 14.2501 3.76102 14.25 3.89646V13.52C14.2501 13.6554 14.2115 13.7881 14.1389 13.9024C14.0663 14.0167 13.9626 14.108 13.84 14.1654C13.7173 14.2229 13.5808 14.2443 13.4465 14.227C13.3122 14.2097 13.1856 14.1545 13.0815 14.0678L9.5 11.0832H3.16667C2.9567 11.0832 2.75534 10.9998 2.60687 10.8513C2.45841 10.7029 2.375 10.5015 2.375 10.2915V7.12488C2.375 6.91491 2.45841 6.71355 2.60687 6.56508C2.75534 6.41662 2.9567 6.33321 3.16667 6.33321H9.5",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"})]}),(0,p.jsx)("defs",{children:(0,p.jsx)("clipPath",{id:"clip0_229_2566",children:(0,p.jsx)("rect",{width:"19",height:"19",fill:"white"})})})]}),(0,p.jsx)("p",{children:"Advocates"})]}),(0,p.jsxs)("div",{className:"candidate-snippet-advocates",children:[(c.showMoreAdvocate?c.answers.filter((function(e){return e.answer<=0})):c.answers.filter((function(e){return e.answer<=0})).slice(0,5)).map((function(n){var t;return e.generalQuestions.questions.find((function(e){return e._id.toString()===n.question.toString()}))?(0,p.jsxs)("div",{children:[" ",(0,p.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,p.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M10 1.66699C5.40001 1.66699 1.66667 5.40033 1.66667 10.0003C1.66667 14.6003 5.40001 18.3337 10 18.3337C14.6 18.3337 18.3333 14.6003 18.3333 10.0003C18.3333 5.40033 14.6 1.66699 10 1.66699ZM9.16667 5.83366V9.16699H5.83334V10.8337H9.16667V14.167H10.8333V10.8337H14.1667V9.16699H10.8333V5.83366H9.16667ZM3.33334 10.0003C3.33334 13.6753 6.32501 16.667 10 16.667C13.675 16.667 16.6667 13.6753 16.6667 10.0003C16.6667 6.32533 13.675 3.33366 10 3.33366C6.32501 3.33366 3.33334 6.32533 3.33334 10.0003Z",fill:"#6BE193"})}),(0,p.jsx)("p",{children:null===(t=e.generalQuestions.questions.find((function(e){return e._id.toString()===n.question.toString()})))||void 0===t?void 0:t.hook})]}):null})),c.answers.filter((function(e){return e.answer<=0})).length>5?c.showMoreAdvocate?(0,p.jsx)("p",{onClick:function(e){return u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{showMoreAdvocate:!1})}))},className:"candidate-snippet-advocates-more",children:"Show Less"}):(0,p.jsx)("p",{className:"candidate-snippet-advocates-more",onClick:function(e){return u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{showMoreAdvocate:!0})}))},children:"View More"}):null]}),(0,p.jsxs)("div",{className:"candidate-snippet-heading",children:[(0,p.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,p.jsx)("path",{d:"M4.16667 8.12881V1.79548C4.16667 1.58552 4.08326 1.38415 3.93479 1.23569C3.78633 1.08722 3.58496 1.00381 3.375 1.00381H1.79167C1.5817 1.00381 1.38034 1.08722 1.23187 1.23569C1.08341 1.38415 1 1.58552 1 1.79548V7.33715C1 7.54711 1.08341 7.74847 1.23187 7.89694C1.38034 8.0454 1.5817 8.12881 1.79167 8.12881H4.16667ZM4.16667 8.12881C5.00652 8.12881 5.81197 8.46244 6.40584 9.05631C6.9997 9.65017 7.33333 10.4556 7.33333 11.2955V12.0871C7.33333 12.5071 7.50015 12.9098 7.79708 13.2067C8.09401 13.5037 8.49674 13.6705 8.91667 13.6705C9.33659 13.6705 9.73932 13.5037 10.0363 13.2067C10.3332 12.9098 10.5 12.5071 10.5 12.0871V8.12881H12.875C13.2949 8.12881 13.6977 7.962 13.9946 7.66506C14.2915 7.36813 14.4583 6.9654 14.4583 6.54548L13.6667 2.58715C13.5528 2.10148 13.3368 1.68445 13.0513 1.39888C12.7657 1.11331 12.426 0.97466 12.0833 1.00381H6.54167C5.91178 1.00381 5.30769 1.25403 4.86229 1.69943C4.41689 2.14483 4.16667 2.74892 4.16667 3.37881",stroke:"black","stroke-linecap":"round","stroke-linejoin":"round"})}),(0,p.jsx)("p",{children:"Opposes"})]}),(0,p.jsxs)("div",{className:"candidate-snippet-opposes",children:[(c.showMoreOppose?c.answers.filter((function(e){return e.answer>2})):c.answers.filter((function(e){return e.answer>2})).slice(0,5)).map((function(n){var t;return(0,p.jsx)(p.Fragment,{children:e.generalQuestions.questions.find((function(e){return e._id.toString()===n.question.toString()}))?(0,p.jsxs)("div",{children:["    ",(0,p.jsx)("svg",{width:"13",height:"12",viewBox:"0 0 13 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,p.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6.625 1C3.865 1 1.625 3.24 1.625 6C1.625 8.76 3.865 11 6.625 11C9.385 11 11.625 8.76 11.625 6C11.625 3.24 9.385 1 6.625 1ZM2.625 6C2.625 8.205 4.42 10 6.625 10C8.83 10 10.625 8.205 10.625 6C10.625 3.795 8.83 2 6.625 2C4.42 2 2.625 3.795 2.625 6ZM4.125 5.5V6.5H9.125V5.5H4.125Z",fill:"#FF4F4F"})}),(0,p.jsx)("p",{children:null===(t=e.generalQuestions.questions.find((function(e){return e._id.toString()===n.question.toString()})))||void 0===t?void 0:t.hook})]}):null})})),c.answers.filter((function(e){return e.answer>2})).length>5?c.showMoreOppose?(0,p.jsx)("p",{onClick:function(e){return u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{showMoreOppose:!1})}))},className:"candidate-snippet-advocates-more",children:"Show Less"}):(0,p.jsx)("p",{className:"candidate-snippet-advocates-more",onClick:function(e){return u((function(e){return(0,r.Z)((0,r.Z)({},e),{},{showMoreOppose:!0})}))},children:"View More"}):null]}),(0,p.jsx)("div",{className:"candidate-snippet-heading",children:(0,p.jsxs)("p",{children:["Matches your perfect candidate by ",(0,p.jsxs)("span",{style:c.matchesBy>90?{color:"#4DCF05"}:c.matchesBy>70?{color:"#84DD52"}:c.matchesBy>50?{color:"#BBDD52"}:c.matchesBy>35?{color:"#CFC605"}:{color:"#CF2905"},children:[c.matchesBy,"% "]})]})})]}):(0,p.jsx)("div",{})}))},3653:function(e,n,t){t.r(n);var s=t(4165),r=t(1413),i=t(5861),a=t(885),o=t(6871),c=t(2791),l=t(4497),d=t(4569),u=t.n(d),p=t(184);n.default=function(e){var n=(0,o.UO)().id,t=(0,o.s0)(),d=(0,c.useState)({loaded:!1,politicians:[]}),h=(0,a.Z)(d,2),f=h[0],x=h[1];(0,c.useEffect)((function(){(0,i.Z)((0,s.Z)().mark((function e(){var i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u().get("/api/party/".concat(n));case 3:i=e.sent,x((function(e){return(0,r.Z)((0,r.Z)((0,r.Z)({},e),i.data.party),{},{loaded:!0})})),v(0),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0),t("/");case 12:case"end":return e.stop()}}),e,null,[[0,8]])})))()}),[]);var v=function(){var e=(0,i.Z)((0,s.Z)().mark((function e(t){var i;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u().get("/api/politician/party/".concat(n,"/").concat(t));case 3:i=e.sent,x((function(e){return(0,r.Z)((0,r.Z)({},e),{},{politicians:i.data.politicians})})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(n){return e.apply(this,arguments)}}();return console.log(n),console.log(f),f.loaded?(0,p.jsxs)("div",{className:"party",children:[(0,p.jsxs)("div",{className:"party-header",children:[(0,p.jsx)("img",{alt:f.name,src:f.symbol}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h1",{children:f.commonName}),(0,p.jsxs)("p",{children:[f.name,", ",f.country]})]}),(0,p.jsx)("p",{className:"party-description",children:f.moreDetails})]}),(0,p.jsxs)("h2",{children:["Active Politicians from the ",f.name]}),(0,p.jsx)("div",{className:"party-candidates",children:f.politicians.map((function(e,n){return(0,p.jsx)(l.Z,(0,r.Z)({partyName:f.commonName},e))}))})]}):(0,p.jsx)("div",{children:(0,p.jsx)("h1",{children:"Loading..."})})}}}]);
//# sourceMappingURL=653.e1d1976b.chunk.js.map
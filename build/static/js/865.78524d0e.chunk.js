"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[865],{9601:function(e,r,s){s.r(r);var t=s(4942),n=s(4165),a=s(1413),o=s(5861),u=s(885),c=s(2791),i=s(3504),l=s(8687),p=s(374),f=(s(4569),s(6871)),d=s(184);r.default=(0,l.$j)((function(e){return{state:e}}),(function(e){return{reset:function(){var r=(0,o.Z)((0,n.Z)().mark((function r(s){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,(0,p.Rd)(e,s);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()}}))((function(e){var r=c.useState({password:"",confirmPassword:"",exists:!1,user:{},profile:{}}),s=(0,u.Z)(r,2),l=s[0],h=s[1],m=c.useState(""),w=(0,u.Z)(m,2),x=w[0],v=w[1],Z=(0,f.UO)().id;(0,c.useEffect)((function(){(0,o.Z)((0,n.Z)().mark((function e(){var r,s,t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.s8)(Z);case 2:r=e.sent,s=r.user,t=r.profile,h((function(e){return(0,a.Z)((0,a.Z)({},e),{},{user:s,profile:t,exists:!0})}));case 6:case"end":return e.stop()}}),e)})))()}),[]);var j=(0,f.s0)(),g=function(){var r=(0,o.Z)((0,n.Z)().mark((function r(s){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s.preventDefault(),!(l.password.length<8)){r.next=4;break}return v("*Your password should be at least 8 characters long"),r.abrupt("return");case 4:if(l.password===l.confirmPassword){r.next=7;break}return v("*Your passwords don't match"),r.abrupt("return");case 7:return r.prev=7,r.next=10,e.reset({password:l.password,id:Z});case 10:j("/"),r.next=16;break;case 13:r.prev=13,r.t0=r.catch(7),v(r.t0);case 16:case"end":return r.stop()}}),r,null,[[7,13]])})));return function(e){return r.apply(this,arguments)}}(),b=function(e){h((function(r){return(0,a.Z)((0,a.Z)({},r),{},(0,t.Z)({},e.target.name,e.target.value))}))};return console.log(e.state),l.exists?(0,d.jsxs)("div",{className:"auth",children:[(0,d.jsx)("h1",{className:"auth-header",children:"Reset Password"}),(0,d.jsxs)("form",{onSubmit:g,className:"auth-form",autoComplete:"no",children:[(0,d.jsx)("p",{className:"auth-form-title-2",children:"Enter a new password"}),(0,d.jsxs)("div",{className:"auth-form-user",children:[(0,d.jsx)("img",{src:l.profile.picture,alt:l.profile.name}),(0,d.jsx)("p",{children:l.profile.name})]}),(0,d.jsxs)("div",{className:"auth-form-content",children:[(0,d.jsx)("input",{className:"auth-form-input",name:"password",onChange:b,value:l.password,type:"password",placeholder:"Password"}),(0,d.jsx)("input",{className:"auth-form-input",type:"password",name:"confirmPassword",onChange:b,value:l.confirmPassword,placeholder:"Confirm Password"})]}),x.length>0?(0,d.jsx)("p",{className:"auth-form-alert",children:x}):null,(0,d.jsx)(i.rU,{to:"/profile/login",className:"auth-form-forgot",children:"Want to login instead?"}),(0,d.jsx)("button",{className:"button-large",children:"Reset Password"})]})]}):(0,d.jsx)("div",{children:"404 "})}))}}]);
//# sourceMappingURL=865.78524d0e.chunk.js.map
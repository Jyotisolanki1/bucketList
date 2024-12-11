"use strict";(self.webpackChunkbucketlist=self.webpackChunkbucketlist||[]).push([[2712],{1357:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(9019),a=r(61113),i=r(44021),o=r(46417);const s=e=>{let{items:t}=e;return(0,o.jsx)(i.Z,{autoplay:!0,arrows:!1,dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,children:t.map(((e,t)=>(0,o.jsxs)(n.ZP,{container:!0,direction:"column",alignItems:"center",spacing:3,textAlign:"center",children:[(0,o.jsx)(n.ZP,{item:!0,children:(0,o.jsx)(a.Z,{variant:"h1",children:e.title})}),(0,o.jsx)(n.ZP,{item:!0,children:(0,o.jsx)(a.Z,{variant:"subtitle2",children:e.description})})]},t)))})}},66864:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(19860),a=r(9506);r(47313);const i=r.p+"static/media/auth-pattern.d80b0e945b263375b4c8b496d4b5f437.svg";const o=r.p+"static/media/auth-pattern-dark.df61463dbdaef44719529483fb4c9467.svg";var s=r(46417);const l=e=>{let{children:t}=e;const r=(0,n.Z)();return(0,s.jsx)(a.Z,{component:"span",sx:{display:"flex",minHeight:"100vh",bgcolor:"dark"===r.palette.mode?r.palette.dark.dark:"#fff",backgroundImage:"dark"===r.palette.mode?"url(".concat(o,")"):"url(".concat(i,")"),position:"absolute",backgroundPosition:"0 0",overflow:"hidden",m:"0 0 0 auto",top:0,left:0,right:0,bottom:0,opacity:"dark"===r.palette.mode?.85:.9},children:t})}},55602:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(9506),a=r(33497),i=r(46417);const o=e=>{let{children:t,...r}=e;return(0,i.jsx)(a.Z,{sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1,...r,children:(0,i.jsx)(n.Z,{sx:{p:{xs:2,sm:3,xl:5}},children:t})})}},70547:(e,t,r)=>{r.d(t,{Z:()=>n});const n=(0,r(17592).ZP)("div")((e=>{let{theme:t}=e;return{backgroundColor:"dark"===t.palette.mode?t.palette.background.default:t.palette.grey[100],minHeight:"100vh"}}))},42712:(e,t,r)=>{r.r(t),r.d(t,{default:()=>F});var n=r(2135),a=r(17592),i=r(19860),o=r(24813),s=r(9019),l=r(35898),d=r(61113),c=r(19536),m=r(70547),u=r(55602),h=r(22654),p=r(47313),x=r(1550),f=r(15103),g=r(49914),Z=r(15480),v=r(9506),b=r(24193),j=r(58467),k=r(66135),w=r(40364),y=r(79429),z=r(3463),S=r(66182),P=r(59673),C=r(5866),I=r(46417);const A=(0,k.$j)(null,{ForgetPasswordApi:w.LI})((e=>{let{ForgetPasswordApi:t}=e;const r=(0,j.s0)(),a=(0,P.I0)(),o=(0,i.Z)(),{isAuthenticated:s,loading:l}=(0,k.v9)((e=>e.admin)),[d,c]=p.useState(!1),m=z.Ry({email:z.Z_().required("Email field is required")}),u=(0,y.TA)({initialValues:{email:""},onSubmit:(e,n)=>{let{setSubmitting:i}=n;const o={email:e.email};c(!0),t(o).then((e=>{var t;(console.log(e),!0===(null===e||void 0===e?void 0:e.success))?(localStorage.setItem("forgetOptCheck",!0),c(!1),localStorage.setItem("adminToken",null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.accessToken),r("/code-verification"),a((0,C.ss)({open:!0,message:null===e||void 0===e?void 0:e.message,variant:"alert",alert:{color:"success"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))):(c(!1),i(!1),a((0,C.ss)({open:!0,message:null===e||void 0===e?void 0:e.message,variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((e=>{c(!1),i(!1),a((0,C.ss)({open:!0,message:"Something went wrong. Please try again later.",variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}))},validationSchema:m});return(0,I.jsx)(I.Fragment,{children:(0,I.jsx)(y.J9,{children:(0,I.jsxs)("form",{noValidate:!0,onSubmit:u.handleSubmit,children:[(0,I.jsxs)(x.Z,{fullWidth:!0,error:Boolean(u.touched.email&&u.errors.email),sx:{...o.typography.customInput},children:[(0,I.jsx)(f.Z,{htmlFor:"outlined-adornment-email-login",children:"Enter Email"}),(0,I.jsx)(g.Z,{id:"outlined-adornment-email-login",type:"email",name:"email",label:"Enter your email",value:u.values.email,onChange:u.handleChange,error:u.touched.email&&Boolean(u.errors.email),onBlur:u.handleBlur}),u.touched.email&&u.errors.email&&(0,I.jsx)(Z.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:u.errors.email})]}),(0,I.jsx)("div",{style:{textAlign:"right"},children:(0,I.jsx)(n.rU,{to:"/dashboard",children:"Login"})}),(0,I.jsx)(v.Z,{sx:{mt:2,display:"flex",justifyContent:"center"},children:(0,I.jsx)(S.Z,{children:(0,I.jsx)(b.Z,{disabled:u.isSubmitting,size:"md",type:"submit",variant:"contained",color:"secondary",sx:{padding:"5px 50px"},children:"Submit"})})})]})})})}));r(66864),r(1357);const q=r.p+"static/media/auth-forgot-pass-multi-card.a3f020c65ff802b2aee52644a31a2dbd.svg",F=((0,a.ZP)("span")((e=>{let{theme:t}=e;return{"&:before":{content:'""',position:"absolute",top:"18%",left:"18%",width:515,height:470,backgroundImage:"url(".concat(q,")"),backgroundRepeat:"no-repeat",backgroundPosition:"center",animation:"15s wings ease-in-out infinite",animationDelay:"1s",[t.breakpoints.down("xl")]:{top:"10%",left:"6%",backgroundSize:450}}}})),()=>{const e=(0,i.Z)(),t=(0,o.Z)(e.breakpoints.down("md"));return(0,I.jsx)(m.Z,{children:(0,I.jsx)(s.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{minHeight:"100vh"},children:(0,I.jsx)(s.ZP,{item:!0,container:!0,justifyContent:"center",md:12,lg:12,sx:{my:3},children:(0,I.jsx)(u.Z,{children:(0,I.jsxs)(s.ZP,{container:!0,spacing:2,justifyContent:"center",children:[(0,I.jsx)(s.ZP,{item:!0,xs:12,children:(0,I.jsxs)(s.ZP,{container:!0,direction:t?"column-reverse":"row",alignItems:t?"center":"inherit",justifyContent:t?"center":"space-between",children:[(0,I.jsx)(s.ZP,{item:!0,children:(0,I.jsxs)(l.Z,{justifyContent:t?"center":"flex-start",textAlign:t?"center":"inherit",children:[(0,I.jsx)(d.Z,{color:e.palette.secondary.main,gutterBottom:!0,variant:t?"h3":"h2",children:"Forgot password?"}),(0,I.jsx)(d.Z,{color:"textPrimary",gutterBottom:!0,variant:"h4",children:"Enter credentials to continue"})]})}),(0,I.jsx)(s.ZP,{item:!0,sx:{mb:{xs:3,sm:0}},children:(0,I.jsx)(n.rU,{to:"#","aria-label":"theme-logo",children:(0,I.jsx)(h.Z,{})})})]})}),(0,I.jsx)(s.ZP,{item:!0,xs:12,children:(0,I.jsx)(l.Z,{direction:"row",justifyContent:t?"center":"flex-start",children:(0,I.jsx)(d.Z,{variant:"caption",fontSize:"16px",textAlign:t?"center":"inherit",children:"Enter your email address below and we'll send you password reset OTP."})})}),(0,I.jsx)(s.ZP,{item:!0,xs:12,children:(0,I.jsx)(A,{})}),(0,I.jsx)(s.ZP,{item:!0,xs:12,children:(0,I.jsx)(c.Z,{})})]})})})})})})},15480:(e,t,r)=>{r.d(t,{Z:()=>j});var n=r(63366),a=r(87462),i=r(47313),o=r(83061),s=r(21921),l=r(80300),d=r(99008),c=r(17592),m=r(91615),u=r(77430),h=r(32298);function p(e){return(0,h.Z)("MuiFormHelperText",e)}const x=(0,u.Z)("MuiFormHelperText",["root","error","disabled","sizeSmall","sizeMedium","contained","focused","filled","required"]);var f,g=r(77342),Z=r(46417);const v=["children","className","component","disabled","error","filled","focused","margin","required","variant"],b=(0,c.ZP)("p",{name:"MuiFormHelperText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,r.size&&t["size".concat((0,m.Z)(r.size))],r.contained&&t.contained,r.filled&&t.filled]}})((e=>{let{theme:t,ownerState:r}=e;return(0,a.Z)({color:(t.vars||t).palette.text.secondary},t.typography.caption,{textAlign:"left",marginTop:3,marginRight:0,marginBottom:0,marginLeft:0,["&.".concat(x.disabled)]:{color:(t.vars||t).palette.text.disabled},["&.".concat(x.error)]:{color:(t.vars||t).palette.error.main}},"small"===r.size&&{marginTop:4},r.contained&&{marginLeft:14,marginRight:14})})),j=i.forwardRef((function(e,t){const r=(0,g.Z)({props:e,name:"MuiFormHelperText"}),{children:i,className:c,component:u="p"}=r,h=(0,n.Z)(r,v),x=(0,d.Z)(),j=(0,l.Z)({props:r,muiFormControl:x,states:["variant","size","disabled","error","filled","focused","required"]}),k=(0,a.Z)({},r,{component:u,contained:"filled"===j.variant||"outlined"===j.variant,variant:j.variant,size:j.size,disabled:j.disabled,error:j.error,filled:j.filled,focused:j.focused,required:j.required}),w=(e=>{const{classes:t,contained:r,size:n,disabled:a,error:i,filled:o,focused:l,required:d}=e,c={root:["root",a&&"disabled",i&&"error",n&&"size".concat((0,m.Z)(n)),r&&"contained",l&&"focused",o&&"filled",d&&"required"]};return(0,s.Z)(c,p,t)})(k);return(0,Z.jsx)(b,(0,a.Z)({as:u,ownerState:k,className:(0,o.Z)(w.root,c),ref:t},h,{children:" "===i?f||(f=(0,Z.jsx)("span",{className:"notranslate",children:"\u200b"})):i}))}))},15103:(e,t,r)=>{r.d(t,{Z:()=>b});var n=r(63366),a=r(87462),i=r(47313),o=r(21921),s=r(83061),l=r(80300),d=r(99008),c=r(5178),m=r(52902),u=r(77342),h=r(17592),p=r(77430),x=r(32298);function f(e){return(0,x.Z)("MuiInputLabel",e)}(0,p.Z)("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);var g=r(46417);const Z=["disableAnimation","margin","shrink","variant","className"],v=(0,h.ZP)(c.Z,{shouldForwardProp:e=>(0,h.FO)(e)||"classes"===e,name:"MuiInputLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{["& .".concat(m.Z.asterisk)]:t.asterisk},t.root,r.formControl&&t.formControl,"small"===r.size&&t.sizeSmall,r.shrink&&t.shrink,!r.disableAnimation&&t.animated,t[r.variant]]}})((e=>{let{theme:t,ownerState:r}=e;return(0,a.Z)({display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},r.formControl&&{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"},"small"===r.size&&{transform:"translate(0, 17px) scale(1)"},r.shrink&&{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"},!r.disableAnimation&&{transition:t.transitions.create(["color","transform","max-width"],{duration:t.transitions.duration.shorter,easing:t.transitions.easing.easeOut})},"filled"===r.variant&&(0,a.Z)({zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},"small"===r.size&&{transform:"translate(12px, 13px) scale(1)"},r.shrink&&(0,a.Z)({userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"},"small"===r.size&&{transform:"translate(12px, 4px) scale(0.75)"})),"outlined"===r.variant&&(0,a.Z)({zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},"small"===r.size&&{transform:"translate(14px, 9px) scale(1)"},r.shrink&&{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 24px)",transform:"translate(14px, -9px) scale(0.75)"}))})),b=i.forwardRef((function(e,t){const r=(0,u.Z)({name:"MuiInputLabel",props:e}),{disableAnimation:i=!1,shrink:c,className:m}=r,h=(0,n.Z)(r,Z),p=(0,d.Z)();let x=c;"undefined"===typeof x&&p&&(x=p.filled||p.focused||p.adornedStart);const b=(0,l.Z)({props:r,muiFormControl:p,states:["size","variant","required"]}),j=(0,a.Z)({},r,{disableAnimation:i,formControl:p,shrink:x,size:b.size,variant:b.variant,required:b.required}),k=(e=>{const{classes:t,formControl:r,size:n,shrink:i,disableAnimation:s,variant:l,required:d}=e,c={root:["root",r&&"formControl",!s&&"animated",i&&"shrink","small"===n&&"sizeSmall",l],asterisk:[d&&"asterisk"]},m=(0,o.Z)(c,f,t);return(0,a.Z)({},t,m)})(j);return(0,g.jsx)(v,(0,a.Z)({"data-shrink":x,ownerState:j,ref:t,className:(0,s.Z)(k.root,m)},h,{classes:k}))}))}}]);
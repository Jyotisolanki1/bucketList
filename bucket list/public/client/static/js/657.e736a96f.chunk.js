"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[657],{1357:(e,r,s)=>{s.d(r,{Z:()=>i});var t=s(9019),o=s(61113),n=s(44021),a=s(46417);const i=e=>{let{items:r}=e;return(0,a.jsx)(n.Z,{autoplay:!0,arrows:!1,dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,children:r.map(((e,r)=>(0,a.jsxs)(t.ZP,{container:!0,direction:"column",alignItems:"center",spacing:3,textAlign:"center",children:[(0,a.jsx)(t.ZP,{item:!0,children:(0,a.jsx)(o.Z,{variant:"h1",children:e.title})}),(0,a.jsx)(t.ZP,{item:!0,children:(0,a.jsx)(o.Z,{variant:"subtitle2",children:e.description})})]},r)))})}},66864:(e,r,s)=>{s.d(r,{Z:()=>l});var t=s(19860),o=s(9506);s(47313);const n=s.p+"static/media/auth-pattern.d80b0e945b263375b4c8b496d4b5f437.svg";const a=s.p+"static/media/auth-pattern-dark.df61463dbdaef44719529483fb4c9467.svg";var i=s(46417);const l=e=>{let{children:r}=e;const s=(0,t.Z)();return(0,i.jsx)(o.Z,{component:"span",sx:{display:"flex",minHeight:"100vh",bgcolor:"dark"===s.palette.mode?s.palette.dark.dark:"#fff",backgroundImage:"dark"===s.palette.mode?"url(".concat(a,")"):"url(".concat(n,")"),position:"absolute",backgroundPosition:"0 0",overflow:"hidden",m:"0 0 0 auto",top:0,left:0,right:0,bottom:0,opacity:"dark"===s.palette.mode?.85:.9},children:r})}},55602:(e,r,s)=>{s.d(r,{Z:()=>a});var t=s(9506),o=s(33497),n=s(46417);const a=e=>{let{children:r,...s}=e;return(0,n.jsx)(o.Z,{sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1,...s,children:(0,n.jsx)(t.Z,{sx:{p:{xs:2,sm:3,xl:5}},children:r})})}},70547:(e,r,s)=>{s.d(r,{Z:()=>t});const t=(0,s(17592).ZP)("div")((e=>{let{theme:r}=e;return{backgroundColor:"dark"===r.palette.mode?r.palette.background.default:r.palette.grey[100],minHeight:"100vh"}}))},34657:(e,r,s)=>{s.r(r),s.d(r,{default:()=>N});var t=s(2135),o=s(17592),n=s(19860),a=s(24813),i=s(9019),l=s(35898),d=s(61113),c=s(70547),h=s(55602),u=s(22654),p=s(47313),m=s(58467),x=s(1550),w=s(15103),g=s(49914),Z=s(41727),f=s(47131),b=s(15480),j=s(9506),v=s(24193),P=s(3463),y=s(79429),k=s(66182),C=s(20556);const z=e=>{let r=0;return e.length>5&&(r+=1),e.length>7&&(r+=1),(e=>new RegExp(/[0-9]/).test(e))(e)&&(r+=1),(e=>new RegExp(/[!#@$%^&*)(+=._-]/).test(e))(e)&&(r+=1),(e=>new RegExp(/[a-z]/).test(e)&&new RegExp(/[A-Z]/).test(e))(e)&&(r+=1),r};var S=s(61045),I=s(5866),B=s(40364),M=s(10237),R=s(22611),A=s(46417);const W=e=>{let{...r}=e;const s=(0,n.Z)(),t=(0,m.s0)(),[o,a]=p.useState(!1),[l,c]=p.useState(!1),[h,u]=p.useState(0),[W,D]=p.useState(!1),[E,N]=p.useState(),q=e=>{e.preventDefault()},O=P.Ry({password:P.Z_().required("New Password is required").test("password-spaces","New Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",(e=>e&&/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(e))).test("password-not-same-as-old","New Password must not be the same as the old password",((e,r)=>e!==r.parent.oldpassword)).min(8,"New Password must be at least 8 characters").max(25,"New Password must be at most 25 characters"),confirmPassword:P.Z_().required("Confirm Password is required").test("confirmPassword","Password didn't matched",((e,r)=>r.parent.password===e))}),V=e=>{const r=z(e);var s;u(r),N((s=r)<2?{label:"Poor",color:C.Z.errorMain}:s<3?{label:"Weak",color:C.Z.warningDark}:s<4?{label:"Normal",color:C.Z.orangeMain}:s<5?{label:"Good",color:C.Z.successMain}:s<6?{label:"Strong",color:C.Z.successDark}:{label:"Poor",color:C.Z.errorMain})},$=(0,y.TA)({initialValues:{password:"",confirmPassword:""},validationSchema:O,onSubmit:(e,r)=>{let{setSubmitting:s}=r;const o={password:e.password,confirm_password:e.confirmPassword};D(!0),(0,B.P2)(o).then((e=>{!0===(null===e||void 0===e?void 0:e.success)?(D(!1),t("/"),(0,S.WI)((0,I.ss)({open:!0,message:null===e||void 0===e?void 0:e.message,variant:"alert",alert:{color:"success"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))):(D(!1),s(!1),(0,S.WI)((0,I.ss)({open:!0,message:null===e||void 0===e?void 0:e.message,variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}})))})).catch((e=>{D(!1),s(!1),(0,S.WI)((0,I.ss)({open:!0,message:"Something went wrong. Please try again later.",variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}))}});return p.useEffect((()=>{V("")}),[]),(0,A.jsx)(A.Fragment,{children:(0,A.jsx)(y.J9,{children:(0,A.jsxs)("form",{noValidate:!0,onSubmit:$.handleSubmit,children:[(0,A.jsxs)(x.Z,{fullWidth:!0,error:Boolean($.touched.password&&$.errors.password),sx:{...s.typography.customInput},children:[(0,A.jsx)(w.Z,{htmlFor:"outlined-adornment-password",children:"Password"}),(0,A.jsx)(g.Z,{id:"outlined-adornment-password",type:o?"text":"password",name:"password",label:"Enter your password",value:$.values.password,onChange:$.handleChange,error:$.touched.password&&Boolean($.errors.password),onBlur:$.handleBlur,endAdornment:(0,A.jsx)(Z.Z,{position:"end",children:(0,A.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:()=>{a(!o)},onMouseDown:q,edge:"end",size:"large",children:o?(0,A.jsx)(M.Z,{}):(0,A.jsx)(R.Z,{})})}),inputProps:{}}),$.touched.password&&$.errors.password&&(0,A.jsx)(b.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:$.errors.password})]}),0!==h&&(0,A.jsx)(x.Z,{fullWidth:!0,children:(0,A.jsx)(j.Z,{sx:{mb:2},children:(0,A.jsxs)(i.ZP,{container:!0,spacing:2,alignItems:"center",children:[(0,A.jsx)(i.ZP,{item:!0,children:(0,A.jsx)(j.Z,{style:{backgroundColor:null===E||void 0===E?void 0:E.color},sx:{width:85,height:8,borderRadius:"7px"}})}),(0,A.jsx)(i.ZP,{item:!0,children:(0,A.jsx)(d.Z,{variant:"subtitle1",fontSize:"0.75rem",children:null===E||void 0===E?void 0:E.label})})]})})}),(0,A.jsxs)(x.Z,{fullWidth:!0,error:Boolean($.touched.confirmPassword&&$.errors.confirmPassword),sx:{...s.typography.customInput},children:[(0,A.jsx)(w.Z,{htmlFor:"outlined-adornment-confirmPassword",children:"Confirm Password"}),(0,A.jsx)(g.Z,{id:"outlined-adornment-confirmPassword",type:l?"text":"password",name:"confirmPassword",label:"Confirm your password",value:$.values.confirmPassword,onChange:$.handleChange,error:$.touched.confirmPassword&&Boolean($.errors.confirmPassword),onBlur:$.handleBlur,endAdornment:(0,A.jsx)(Z.Z,{position:"end",children:(0,A.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:()=>{c(!l)},onMouseDown:q,edge:"end",size:"large",children:l?(0,A.jsx)(M.Z,{}):(0,A.jsx)(R.Z,{})})}),inputProps:{}}),$.touched.confirmPassword&&$.errors.confirmPassword&&(0,A.jsx)(b.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:$.errors.confirmPassword})]}),(0,A.jsx)(j.Z,{sx:{mt:2,display:"flex",justifyContent:"center"},children:(0,A.jsx)(k.Z,{children:(0,A.jsx)(v.Z,{disabled:$.isSubmitting,size:"md",type:"submit",variant:"contained",color:"secondary",sx:{padding:"5px 50px"},children:"Submit"})})})]})})})};s(66864),s(1357);const D=s.p+"static/media/auth-reset-error-card.c3149310a71ffbe79fc85325c833c0d3.svg";const E=s.p+"static/media/auth-reset-purple-card.1c70d7aeec587f29695e50d67be1232d.svg",N=((0,o.ZP)("span")((e=>{let{theme:r}=e;return{"&:after":{content:'""',position:"absolute",top:"35%",left:"35%",width:400,height:400,backgroundImage:"url(".concat(E,")"),backgroundRepeat:"no-repeat",backgroundPosition:"center",animation:"15s wings ease-in-out infinite",[r.breakpoints.down("xl")]:{left:"25%",top:"35%"}},"&:before":{content:'""',position:"absolute",top:"12%",left:"25%",width:400,height:270,backgroundImage:"url(".concat(D,")"),backgroundRepeat:"no-repeat",backgroundPosition:"center",animation:"15s wings ease-in-out infinite",animationDelay:"1s",[r.breakpoints.down("xl")]:{top:"10%",left:"15%"}}}})),()=>{const e=(0,n.Z)(),r=(0,a.Z)(e.breakpoints.down("md"));return(0,A.jsx)(c.Z,{children:(0,A.jsx)(i.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{minHeight:"100vh"},children:(0,A.jsx)(i.ZP,{item:!0,container:!0,justifyContent:"center",md:12,lg:12,sx:{my:3},children:(0,A.jsx)(h.Z,{children:(0,A.jsxs)(i.ZP,{container:!0,spacing:2,justifyContent:"center",children:[(0,A.jsx)(i.ZP,{item:!0,xs:12,children:(0,A.jsxs)(i.ZP,{container:!0,direction:r?"column-reverse":"row",alignItems:r?"center":"inherit",justifyContent:r?"center":"space-between",children:[(0,A.jsx)(i.ZP,{item:!0,children:(0,A.jsxs)(l.Z,{justifyContent:r?"center":"flex-start",textAlign:r?"center":"inherit",children:[(0,A.jsx)(d.Z,{color:e.palette.secondary.main,gutterBottom:!0,variant:r?"h3":"h2",children:"Reset Password"}),(0,A.jsx)(d.Z,{color:"textPrimary",gutterBottom:!0,variant:"h4",children:"Please choose new password."})]})}),(0,A.jsx)(i.ZP,{item:!0,sx:{mb:{xs:3,sm:0}},children:(0,A.jsx)(t.rU,{to:"#","aria-label":"theme-logo",children:(0,A.jsx)(u.Z,{})})})]})}),(0,A.jsx)(i.ZP,{item:!0,xs:12,children:(0,A.jsx)(W,{})})]})})})})})})},10237:(e,r,s)=>{var t=s(64836);r.Z=void 0;var o=t(s(45045)),n=s(46417),a=(0,o.default)((0,n.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");r.Z=a},22611:(e,r,s)=>{var t=s(64836);r.Z=void 0;var o=t(s(45045)),n=s(46417),a=(0,o.default)((0,n.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");r.Z=a}}]);
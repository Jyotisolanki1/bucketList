"use strict";(self.webpackChunkbucketlist=self.webpackChunkbucketlist||[]).push([[9766],{89535:(e,a,t)=>{t.d(a,{Z:()=>i});var s=t(19860),n=t(48119),r=t(46417);const i=e=>{let{color:a,outline:t,size:i,sx:o,...l}=e;const c=(0,s.Z)(),d=a&&!t&&{color:c.palette.background.paper,bgcolor:"".concat(a,".main")},p=t&&{color:a?"".concat(a,".main"):"primary.main",bgcolor:c.palette.background.paper,border:"2px solid",borderColor:a?"".concat(a,".main"):"primary.main"};let h={};switch(i){case"badge":h={width:c.spacing(3.5),height:c.spacing(3.5)};break;case"xs":h={width:c.spacing(4.25),height:c.spacing(4.25)};break;case"sm":h={width:c.spacing(5),height:c.spacing(5)};break;case"lg":h={width:c.spacing(9),height:c.spacing(9)};break;case"xl":h={width:c.spacing(10.25),height:c.spacing(10.25)};break;case"md":h={width:c.spacing(7.5),height:c.spacing(7.5)};break;default:h={}}return(0,r.jsx)(n.Z,{sx:{...d,...p,...h,...o},...l})}},45085:(e,a,t)=>{t.d(a,{Z:()=>o});var s=t(24076),n=t(67478),r=t(84488),i=(t(47313),t(46417));const o=function(e){let{count:a}=e;const t=Array.from({length:a}),o=Array.from({length:10});return(0,i.jsx)(i.Fragment,{children:o.map(((e,a)=>(0,i.jsx)(s.Z,{hover:!0,children:t.map(((e,a)=>(0,i.jsx)(n.Z,{children:(0,i.jsx)(r.Z,{variant:"text",width:70,height:50})},a)))},a)))})}},79766:(e,a,t)=>{t.r(a),t.d(a,{default:()=>re});var s=t(47313),n=t(9019),r=t(61113),i=t(49914),o=t(41727),l=t(61689),c=t(42420),d=t(51629),p=t(66835),h=t(23477),m=t(24076),u=t(67478),g=t(57861),x=t(70024),v=t(66212),Z=t(24193),b=t(74312),y=t(19860),j=t(33497),S=t(20273),C=t(12401),f=t(66149),w=t(33604),k=t(47131),P=t(96467),K=t(97762),A=t(35898),F=t(24631),B=t(1550),I=t(15103),U=t(88797),E=t(51405),J=t(15480),R=t(4117),O=t(85281),z=t(89535),Q=t(67393),T=t(79429),M=t(3463),L=t(66135),G=t(77425),V=t(11198),H=t(91210),W=t(77406),X=t(5866),N=t(46417);const Y=e=>{let{item:a,open:t,close:i}=e;const l=(0,L.I0)(),c=(0,s.useRef)(null),[d,p]=(0,s.useState)(!1),[h,m]=(0,s.useState)(null),[u,g]=(0,s.useState)(!1),[x,v]=s.useState(""),[b,y]=(0,s.useState)([]),{profile:j,loading:S,services:C,salesperson:Y}=(0,L.v9)((e=>e.client));(0,s.useEffect)((()=>{localStorage.getItem("adminClientProfile");l((0,G.WV)()),l((0,G.Vx)())}),[l]);(0,s.useEffect)((()=>{Array.isArray(Y)?y(Y):y([])}),[Y]);const D=M.Ry().shape({username:M.Z_().required("Name is required").matches(/^[A-Za-z\s]+$/,"Name can only contain letters").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Name must be at least 2 characters").max(50,"Name must be at most 50 characters"),company_name:M.Z_().required("Company name is required").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Company name must be at least 2 characters").max(50,"Company name must be at most 50 characters"),address:M.Z_().required("Address is required").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Address must be at least 2 characters").max(250,"Address must be at most 250 characters"),password:M.Z_().test("password-spaces","Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",(e=>!e||e&&/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(e))).min(8,"Password must be at least 8 characters").max(25,"Password must be at most 25 characters"),job_title:M.Z_().required("Job title is required").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Job title must be at least 2 characters").max(50,"Job title must be at most 50 characters"),city_zip:M.Z_().required("City is required").matches(/^[A-Za-z\s]+$/,"City can only contain  letters and spaces").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"City must be at least 2 characters").max(50,"City must be at most 50 characters").trim().notOneOf([""],"City cannot be a blank string"),phone:M.Z_().required("Phone is required").matches(/^(?!0+$)([1-9][0-9]{4,14})$/,"Phone number must be 5 to 15 digits, cannot start with 0, and cannot be all 0s"),website:M.Z_().required("Website URL is required").matches(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,"Please enter a valid website URL").test("no-spaces","Website URL cannot contain spaces",(e=>e&&!/\s/.test(e))).trim().notOneOf([""],"Website URL cannot be a blank string"),email:M.Z_().email("Invalid email address").required("Email is required").max(254,"Email must be at most 254 characters"),company_information:M.Z_().required("Company information is required").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Company information must be at least 2 characters").max(250,"Compnay information must be at most 250 characters"),sales_person:M.Z_().required("Sales person is required").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Sales person must be at least 2 characters").max(50,"Sales person must be at most 50 characters"),category:M.Z_().required("Category is required").test("no-multi-spaces",(0,N.jsx)(Q.Z,{id:"Multiple consecutive spaces are not allowed, and spaces are not permitted at the beginning"}),(e=>e&&/^[^\s]+(\s[^\s]+)*$/.test(e))).min(2,"Category must be at least 2 characters").max(50,"Category must be at most 50 characters")}),q=(0,T.TA)({enableReinitialize:!0,initialValues:{username:"",password:" ",email:"",company_name:"",address:"",job_title:"",city_zip:"",phone:"",website:"",company_information:"",category:"",sales_person:"",image:null},onSubmit:async(e,a)=>{let{resetForm:t}=a;if(console.log(e),""!==x.trim())v("Please select a valid image file (PNG, JPEG)");else{p(!0);try{const a=new FormData;a.append("name",e.username),a.append("password",e.password),a.append("email",e.email),a.append("sales_person",e.sales_person),a.append("company_name",e.company_name),a.append("category",e.category),a.append("address",e.address),a.append("job_title",e.job_title),a.append("city_zip",e.city_zip),a.append("phone",e.phone),a.append("website",e.website),a.append("company_information",e.company_information),e.image&&a.append("image",e.image);const t=await l((0,G.zj)(a));!0===(null===t||void 0===t?void 0:t.success)?(p(!1),l((0,X.ss)({open:!0,message:null===t||void 0===t?void 0:t.message,variant:"alert",alert:{color:"success"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}})),i(!1)):(p(!1),l((0,X.ss)({open:!0,message:null===t||void 0===t?void 0:t.message,variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}})))}catch(s){console.log(s),p(!1),l((0,X.ss)({open:!0,message:"Something went wrong. Please try again later.",variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}}},validationSchema:D});return(0,s.useEffect)((()=>{q.setFieldValue("imageInputRef",c.current)}),[c]),(0,N.jsx)(f.Z,{open:t,keepMounted:!0,onClose:()=>i(!1),fullWidth:"true",maxWidth:"md","aria-labelledby":"form-dialog-title",children:(0,N.jsxs)("form",{onSubmit:q.handleSubmit,id:"add-user-form",children:[(0,N.jsx)(w.Z,{children:(0,N.jsxs)(n.ZP,{container:!0,spacing:3,alignItems:"center",children:[(0,N.jsx)(n.ZP,{item:!0,xs:10,children:"Add Client"}),(0,N.jsx)(n.ZP,{item:!0,xs:2,children:(0,N.jsx)(k.Z,{color:"inherit",onClick:()=>i(!1),"aria-label":"close",sx:{position:"absolute",right:8,top:8},children:(0,N.jsx)(V.Z,{})})})]})}),(0,N.jsx)(P.Z,{mt:2,children:(0,N.jsx)(K.Z,{sx:{pt:1},children:(0,N.jsxs)(n.ZP,{container:!0,spacing:2,direction:"column",children:[(0,N.jsx)(n.ZP,{item:!0,xs:12,children:(0,N.jsxs)(n.ZP,{container:!0,spacing:2,alignItems:"center",children:[(0,N.jsx)(n.ZP,{item:!0,children:(0,N.jsx)(z.Z,{alt:"Admin Pic",src:h,sx:{height:120,width:120,borderRadius:"8px"}})}),(0,N.jsx)(n.ZP,{item:!0,sm:!0,zeroMinWidth:!0,children:(0,N.jsxs)(n.ZP,{container:!0,spacing:1,children:[(0,N.jsx)(n.ZP,{item:!0,xs:12,children:(0,N.jsxs)(A.Z,{direction:"row",spacing:2,alignItems:"center",children:[(0,N.jsx)("label",{htmlFor:"contained-button-file",children:(0,N.jsx)(Z.Z,{variant:"contained",component:"span",color:"secondary",children:"Upload Company Logo"})}),(0,N.jsx)("input",{accept:"image/png, image/jpeg",onChange:e=>{const a=e.target.files[0],t=["image/png","image/jpeg"];q.setFieldError("image",""),v(""),a&&(t.includes(a.type)?(v(""),m(URL.createObjectURL(a)),q.setFieldValue("image",a)):v("Please select a valid image file (PNG, JPEG)"))},style:{display:"none"},id:"contained-button-file",type:"file",ref:c})]})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,children:(0,N.jsx)(r.Z,{variant:"caption",style:{color:"red"},children:x})})]})})]})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"username",name:"username",label:"Name",value:q.values.username,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.username&&Boolean(q.errors.username),helperText:q.touched.username&&q.errors.username,fullWidth:!0,autoComplete:"given-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"company_name",name:"company_name",label:(0,N.jsx)(Q.Z,{id:"Company Name"}),value:q.values.company_name,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.company_name&&Boolean(q.errors.company_name),helperText:q.touched.company_name&&q.errors.company_name,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"address",name:"address",label:(0,N.jsx)(Q.Z,{id:"Address"}),value:q.values.address,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.address&&Boolean(q.errors.address),helperText:q.touched.address&&q.errors.address,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0},multiline:!0,rows:4})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"job_title",name:"job_title",label:(0,N.jsx)(Q.Z,{id:"Job Title"}),value:q.values.job_title,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.job_title&&Boolean(q.errors.job_title),helperText:q.touched.job_title&&q.errors.job_title,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"city_zip",name:"city_zip",label:(0,N.jsx)(Q.Z,{id:"City"}),value:q.values.city_zip,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.city_zip&&Boolean(q.errors.city_zip),helperText:q.touched.city_zip&&q.errors.city_zip,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"phone",name:"phone",label:(0,N.jsx)(Q.Z,{id:"Phone"}),value:q.values.phone,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.phone&&Boolean(q.errors.phone),helperText:q.touched.phone&&q.errors.phone,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"email",name:"email",label:(0,N.jsx)(Q.Z,{id:"Email"}),value:q.values.email,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.email&&Boolean(q.errors.email),helperText:q.touched.email&&q.errors.email,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"password",name:"password",type:u?"text":"password",label:(0,N.jsx)(Q.Z,{id:"password"}),value:q.values.password,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.password&&Boolean(q.errors.password),helperText:q.touched.password&&q.errors.password,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0},InputProps:{endAdornment:(0,N.jsx)(o.Z,{position:"end",children:(0,N.jsx)(k.Z,{"aria-label":"toggle password visibility",onClick:()=>{g((e=>!e))},edge:"end",children:u?(0,N.jsx)(H.Z,{}):(0,N.jsx)(W.Z,{})})})}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"website",name:"website",label:(0,N.jsx)(Q.Z,{id:"Website"}),value:q.values.website,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.website&&Boolean(q.errors.website),helperText:q.touched.website&&q.errors.website,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsx)(F.Z,{id:"company_information",name:"company_information",label:(0,N.jsx)(Q.Z,{id:"Company Information"}),value:q.values.company_information,onChange:q.handleChange,onBlur:q.handleBlur,error:q.touched.company_information&&Boolean(q.errors.company_information),helperText:q.touched.company_information&&q.errors.company_information,fullWidth:!0,autoComplete:"family-name",InputLabelProps:{shrink:!0},multiline:!0,rows:4})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsxs)(B.Z,{fullWidth:!0,children:[(0,N.jsx)(I.Z,{id:"Select_Sales_Person",children:"Select Sales Person"}),(0,N.jsx)(U.Z,{onBlur:q.handleBlur,error:q.touched.sales_person&&Boolean(q.errors.sales_person),helperText:q.touched.sales_person&&q.errors.sales_person,labelId:"Select_Sales_Person",id:"Select_Sales_Person",name:"sales_person",value:q.values.sales_person||"",onChange:q.handleChange,label:"Select Sales Person",children:b&&(null===b||void 0===b?void 0:b.map((e=>(0,N.jsxs)(E.Z,{value:null===e||void 0===e?void 0:e._id,children:[console.log(e),null===e||void 0===e?void 0:e.firstname," ",null===e||void 0===e?void 0:e.lastname]},null===e||void 0===e?void 0:e._id))))}),q.touched.sales_person&&q.errors.sales_person&&(0,N.jsx)(J.Z,{error:!0,children:q.errors.sales_person})]})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,N.jsxs)(B.Z,{fullWidth:!0,children:[(0,N.jsx)(I.Z,{id:"service_type",children:"Service Type"}),(0,N.jsx)(U.Z,{onBlur:q.handleBlur,error:q.touched.category&&Boolean(q.errors.category),helperText:q.touched.category&&q.errors.category,labelId:"service_type",id:"service_type",name:"category",value:q.values.category||"",onChange:q.handleChange,label:"Service Type",children:C&&C.map((e=>(0,N.jsx)(E.Z,{value:e._id,children:null===e||void 0===e?void 0:e.name},e._id)))}),q.touched.category&&q.errors.category&&(0,N.jsx)(J.Z,{error:!0,children:q.errors.category})]})})]})})}),(0,N.jsx)(R.Z,{children:(0,N.jsxs)(A.Z,{direction:"row",spacing:2,justifyContent:"flex-end",children:[(0,N.jsx)(Z.Z,{onClick:()=>i(!1),color:"primary",children:"Cancel"}),(0,N.jsx)(Z.Z,{sx:{margin:"2px"},type:"submit",variant:"contained",color:"primary",disabled:d,startIcon:d&&(0,N.jsx)(O.Z,{size:20}),children:d?"Adding...":"Add Client"})]})})]})})};t(55832);var D=t(59673),q=t(58467),_=t(40866),$=t(45085),ee=t(70816),ae=t.n(ee),te=t(83033);function se(){return Math.round(20*Math.random())-10}function ne(){const e=50+se(),a=50+se();return{top:"".concat(e,"%"),left:"".concat(a,"%"),transform:"translate(-".concat(e,"%, -").concat(a,"%)")}}const re=()=>{const e=(0,D.I0)(),[a]=s.useState(ne),[t,f]=s.useState(!1),[w,k]=s.useState(!1),[P,K]=s.useState(!1),[A,F]=s.useState({}),[B,I]=s.useState(!0),[U,E]=s.useState(null),[J,R]=s.useState(1),[O,z]=s.useState(10),[Q,T]=s.useState(""),M=(0,y.Z)(),L=(0,q.s0)(),{clients:V,loading:H,totalPages:W}=(0,D.v9)((e=>e.client));s.useEffect((()=>{e((0,G.Oi)(Q,J,O))}),[Q,J,O,e,B,w,t]);return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(j.Z,{title:(0,N.jsxs)(n.ZP,{container:!0,alignItems:"center",justifyContent:"space-between",spacing:C.dv,style:{marginTop:"0%"},children:[(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:4,children:(0,N.jsx)(r.Z,{variant:"h3",children:"Clients List"})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:4,children:(0,N.jsx)(i.Z,{id:"input-search-list-style1",placeholder:"Search By Name And Email",startAdornment:(0,N.jsx)(o.Z,{position:"start"}),size:"large",onChange:e=>{T(e.target.value)},style:{width:"100%"}})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sm:4,sx:{textAlign:"right"},children:(0,N.jsx)(l.Z,{title:"Add Client",children:(0,N.jsx)(c.Z,{color:"primary",size:"small",sx:{boxShadow:"none",ml:1,width:32,height:32,minHeight:32},children:(0,N.jsx)(te.Z,{fontSize:"small",onClick:()=>{k(!0)}})})})})]}),content:!1,children:[(0,N.jsx)(d.Z,{children:(0,N.jsxs)(p.Z,{children:[(0,N.jsx)(h.Z,{children:(0,N.jsxs)(m.Z,{children:[(0,N.jsx)(u.Z,{sx:{pl:3},children:"S.no."}),(0,N.jsx)(u.Z,{children:"Image"}),(0,N.jsx)(u.Z,{children:"Fullname"}),(0,N.jsx)(u.Z,{children:"Email"}),(0,N.jsx)(u.Z,{children:"Phone"}),(0,N.jsx)(u.Z,{children:"Service Type"}),(0,N.jsx)(u.Z,{children:"Status"}),(0,N.jsx)(u.Z,{children:"Permission"}),(0,N.jsx)(u.Z,{children:"Date"}),(0,N.jsx)(u.Z,{children:"Action"})]})}),(0,N.jsxs)(g.Z,{children:[H&&(0,N.jsx)($.Z,{count:10}),!H&&(null===V||void 0===V?void 0:V.length)>0&&V.map(((a,t)=>{var s;return(0,N.jsxs)(m.Z,{hover:!0,children:[(0,N.jsx)(u.Z,{sx:{pl:3},children:t+1+(J*O-O)}),(0,N.jsx)(u.Z,{children:null!==a&&void 0!==a&&a.profile_pic?(0,N.jsx)("img",{src:"".concat("http://52.22.241.165:10037","/").concat(null===a||void 0===a?void 0:a.profile_pic),alt:"User",height:50,width:50}):(0,N.jsx)("img",{src:_,height:50,width:50,alt:"User"})}),(0,N.jsx)(u.Z,{children:null===a||void 0===a?void 0:a.name}),(0,N.jsx)(u.Z,{children:null===a||void 0===a?void 0:a.email}),(0,N.jsx)(u.Z,{children:null===a||void 0===a?void 0:a.phone}),(0,N.jsx)(u.Z,{children:null===a||void 0===a||null===(s=a.category)||void 0===s?void 0:s.name}),(0,N.jsxs)(u.Z,{children:[(0,N.jsx)(x.Z,{checked:"active"===a.isStatus,onChange:()=>(async a=>{try{const t={id:null===a||void 0===a?void 0:a._id,status:"active"===a.isStatus?"inactive":"active"},s=await e((0,G.qO)(t));!0===(null===s||void 0===s?void 0:s.success)?(e((0,X.ss)({open:!0,message:null===s||void 0===s?void 0:s.message,variant:"alert",alert:{color:"success"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}})),I(!B)):e((0,X.ss)({open:!0,message:null===s||void 0===s?void 0:s.message,variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}catch(t){e((0,X.ss)({open:!0,message:"Something went wrong. Please try again letar.",variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}})(a),inputProps:{"aria-label":"controlled"}}),(0,N.jsx)("br",{}),"active"===a.isStatus?(0,N.jsx)(v.Z,{label:"Active",size:"small",sx:{background:"dark"===M.palette.mode?M.palette.dark.main:M.palette.success.light+60,color:M.palette.success.dark}}):(0,N.jsx)(v.Z,{label:"Inactive",size:"small",sx:{background:"dark"===M.palette.mode?M.palette.dark.main:M.palette.warning.light+60,color:M.palette.warning.dark}})]}),(0,N.jsx)(u.Z,{children:"false"===a.isApproved?(0,N.jsx)(Z.Z,{variant:"contained",onClick:()=>(async a=>{try{const t={id:null===a||void 0===a?void 0:a._id},s=await e((0,G.LE)(t));!0===(null===s||void 0===s?void 0:s.success)?(e((0,X.ss)({open:!0,message:null===s||void 0===s?void 0:s.message,variant:"alert",alert:{color:"success"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}})),I(!B)):e((0,X.ss)({open:!0,message:null===s||void 0===s?void 0:s.message,variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}catch(t){e((0,X.ss)({open:!0,message:"Something went wrong. Please try again letar.",variant:"alert",alert:{color:"error"},close:!1,anchorOrigin:{vertical:"top",horizontal:"right"}}))}})(a),sx:{backgroundColor:"#3C2F28",color:"white","&:hover":{backgroundColor:"#3C2F28"}},children:"Approve"}):(0,N.jsx)(r.Z,{sx:{color:"green"},children:"Approved"})}),(0,N.jsx)(u.Z,{children:ae()(null===a||void 0===a?void 0:a.createdAt).format("MM-DD-YYYY")}),(0,N.jsx)(u.Z,{children:(0,N.jsx)(l.Z,{title:"View client profile",children:(0,N.jsx)(S.Z,{onClick:()=>(async e=>{localStorage.setItem("adminClientProfile",JSON.stringify(e)),L("/client-profile")})(a)})})})]},t)})),!H&&!((null===V||void 0===V?void 0:V.length)>0)&&(0,N.jsx)(m.Z,{children:(0,N.jsx)(u.Z,{colSpan:5,children:"Client Not Found"})})]})]})}),(0,N.jsx)(n.ZP,{item:!0,xs:12,sx:{p:3},children:(0,N.jsx)(n.ZP,{container:!0,justifyContent:"space-between",spacing:C.dv,children:(0,N.jsx)(n.ZP,{item:!0,children:(0,N.jsx)(b.Z,{count:W,page:J,color:"primary",onChange:(e,a)=>{R(a)}})})})})]}),w&&(0,N.jsx)(Y,{open:w,close:e=>(e=>{k(!1),!0===e&&I(!B)})(e)})]})}},91210:(e,a,t)=>{t.d(a,{Z:()=>r});var s=t(81171),n=t(46417);const r=(0,s.Z)((0,n.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility")},77406:(e,a,t)=>{t.d(a,{Z:()=>r});var s=t(81171),n=t(46417);const r=(0,s.Z)((0,n.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff")},51405:(e,a,t)=>{t.d(a,{Z:()=>w});var s=t(63366),n=t(87462),r=t(47313),i=t(83061),o=t(21921),l=t(17551),c=t(17592),d=t(77342),p=t(51195),h=t(35272),m=t(24993),u=t(86983),g=t(99273),x=t(37363),v=t(11081),Z=t(77430),b=t(32298);function y(e){return(0,b.Z)("MuiMenuItem",e)}const j=(0,Z.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var S=t(46417);const C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],f=(0,c.ZP)(h.Z,{shouldForwardProp:e=>(0,c.FO)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.root,t.dense&&a.dense,t.divider&&a.divider,!t.disableGutters&&a.gutters]}})((e=>{let{theme:a,ownerState:t}=e;return(0,n.Z)({},a.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:"1px solid ".concat((a.vars||a).palette.divider),backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(j.selected)]:{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity),["&.".concat(j.focusVisible)]:{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.focusOpacity,"))"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}},["&.".concat(j.selected,":hover")]:{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / calc(").concat(a.vars.palette.action.selectedOpacity," + ").concat(a.vars.palette.action.hoverOpacity,"))"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:a.vars?"rgba(".concat(a.vars.palette.primary.mainChannel," / ").concat(a.vars.palette.action.selectedOpacity,")"):(0,l.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}},["&.".concat(j.focusVisible)]:{backgroundColor:(a.vars||a).palette.action.focus},["&.".concat(j.disabled)]:{opacity:(a.vars||a).palette.action.disabledOpacity},["& + .".concat(g.Z.root)]:{marginTop:a.spacing(1),marginBottom:a.spacing(1)},["& + .".concat(g.Z.inset)]:{marginLeft:52},["& .".concat(v.Z.root)]:{marginTop:0,marginBottom:0},["& .".concat(v.Z.inset)]:{paddingLeft:36},["& .".concat(x.Z.root)]:{minWidth:36}},!t.dense&&{[a.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,n.Z)({minHeight:32,paddingTop:4,paddingBottom:4},a.typography.body2,{["& .".concat(x.Z.root," svg")]:{fontSize:"1.25rem"}}))})),w=r.forwardRef((function(e,a){const t=(0,d.Z)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:c="li",dense:h=!1,divider:g=!1,disableGutters:x=!1,focusVisibleClassName:v,role:Z="menuitem",tabIndex:b,className:j}=t,w=(0,s.Z)(t,C),k=r.useContext(p.Z),P=r.useMemo((()=>({dense:h||k.dense||!1,disableGutters:x})),[k.dense,h,x]),K=r.useRef(null);(0,m.Z)((()=>{l&&K.current&&K.current.focus()}),[l]);const A=(0,n.Z)({},t,{dense:P.dense,divider:g,disableGutters:x}),F=(e=>{const{disabled:a,dense:t,divider:s,disableGutters:r,selected:i,classes:l}=e,c={root:["root",t&&"dense",a&&"disabled",!r&&"gutters",s&&"divider",i&&"selected"]},d=(0,o.Z)(c,y,l);return(0,n.Z)({},l,d)})(t),B=(0,u.Z)(K,a);let I;return t.disabled||(I=void 0!==b?b:-1),(0,S.jsx)(p.Z.Provider,{value:P,children:(0,S.jsx)(f,(0,n.Z)({ref:B,role:Z,tabIndex:I,component:c,focusVisibleClassName:(0,i.Z)(F.focusVisible,v),className:(0,i.Z)(F.root,j)},w,{ownerState:A,classes:F}))})}))},40866:e=>{e.exports="data:image/png;base64,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"}}]);
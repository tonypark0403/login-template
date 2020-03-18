!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=7)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("bcrypt")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("jsonwebtoken")},function(e,n){e.exports=require("cookie-parser")},function(e,n){e.exports=require("dotenv")},function(e,n,t){"use strict";t.r(n);var o=t(1),r=t.n(o),s=t(0),i=t.n(s),u=t(3),a=t.n(u),c=t(5),l=t.n(c),d=t(6),p=t.n(d);var f,g,m;f="test",g="test",m="login-template";var h={mongoURI:process.env.MONGO_URI,secretToken:process.env.SECRET_TOKEN},y=t(4),v=t.n(y),x=t(2),b=t.n(x);const k=i.a.Schema({name:{type:String,maxlength:50},email:{type:String,trim:!0,unique:1},password:{type:String,minlength:5},lastname:{type:String,maxlength:50},role:{type:Number,default:0},image:String,token:String,tokenExp:Number});k.pre("save",(function(e){let n=this;console.log(n),n.isModified("password")?b.a.genSalt(10,(t,o)=>{if(t)return e(t);b.a.hash(n.password,o,(t,o)=>{if(t)return e(t);n.password=o,e()})}):e()})),k.methods.comparePassword=function(e,n){b.a.compare(e,this.password,(e,t)=>{if(e)return n(e);n(null,t)})},k.methods.generateToken=function(e){this.token=v.a.sign(this._id.toHexString(),h.secretToken),this.save((n,t)=>{if(n)return e(n);e(null,t)})},k.statics.findByToken=function(e,n){const t=this;v.a.verify(e,h.secretToken,(o,r)=>{o&&n(o),t.findOne({_id:r,token:e},(e,t)=>{e&&n(e),n(null,t)})})};var w=i.a.model("User",k);var _=(e,n,t)=>{const o=e.cookies.x_auth;w.findByToken(o,(r,s)=>{if(r)throw r;if(!s)return n.json({isAuth:!1,error:!0});e.token=o,e.user=s,t()})};const j=r.a.Router();j.get("/hello",(e,n)=>n.send("Hello world!")),j.post("/register",(e,n)=>{(e=>{const n=new w(e);return new Promise((e,t)=>{n.save((n,o)=>{n?t(!1):e(!0)})})})(e.body).then(e=>{n.status(200).json({success:e})}).catch(e=>{n.json({success:e})})}),j.post("/login",(e,n)=>{var t;(t=e.body,new Promise((e,n)=>{w.findOne({email:t.email},(o,r)=>o?n(o):r?void r.comparePassword(t.password,(t,o)=>{if(!o)return n("Wrong password!!!");r.generateToken((t,o)=>t?n(t):e(o))}):n("No user!"))})).then(e=>{n.cookie("x_auth",e.token).status(200).json({loginSuccess:!0,userId:e._id})}).catch(e=>{n.cookie("x_auth",null).status(400).json({loginSuccess:!1,message:e})})}),j.get("/auth",_,(e,n)=>{n.status(200).json({_id:e.user._id,isAdmin:0!==e.user.role,isAuth:!0,email:e.user.email,name:e.user.name,lastname:e.user.lastname,role:e.user.role,image:e.user.image})}),j.get("/logout",_,(e,n)=>{var t;(t=e.user,new Promise((e,n)=>{w.findOneAndUpdate({_id:t._id},{token:""},(t,o)=>t?n(t):e(o))})).then(e=>{n.status(200).json({success:!0})}).catch(e=>{n.json({success:!1,err:e})})});var S=j;p.a.config();const O=r()();O.use(a.a.urlencoded({extended:!0})),O.use(a.a.json()),O.use(l()());const T=process.env.PORT;i.a.connect(h.mongoURI,{useNewUrlParser:!0,useUnifiedTopology:!0,useCreateIndex:!0,useFindAndModify:!1}).then(()=>console.log("MongoDB connected...")).catch(e=>console.log(e)),O.use("/api/user",S),O.listen(T,()=>console.log(`Web app listening on port ${T}`))}]);
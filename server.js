const express=require("express");
const session=require("express-session");
const multer=require("multer");
const fs=require("fs");
const path=require("path");
const app=express();
const PORT=process.env.PORT||3000;
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD||"KNOKADMIN";
const SESSION_SECRET=process.env.SESSION_SECRET||"change-this-secret";

app.use(express.json({limit:"2mb"}));
app.use(express.urlencoded({extended:true}));
app.use(session({secret:SESSION_SECRET,resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:"lax",secure:false,maxAge:86400000}}));

const dataFile=path.join(__dirname,"data","store.json");
if(!fs.existsSync(dataFile)){
 const initial={settings:{
  name:"KNOK REAL STORE",tagline:"Jualan produk game & digital • Murah & Cepat",
  logo:"",heroTitle:"KNOK X REAL STORE",heroText:"Jualan game & digital • Proses cepat • Garansi aman • Bayar QRIS",
  notice:"⚡ MURAH & CEPAT • READY 24 JAM",menuLabel:"MENU TERSEDIA • PREMIUM",
  qrTitle:"PEMBAYARAN",qrText:"Scan QR untuk melakukan pembayaran.",qrImage:"",
  infoText:"Pencet Beli, scan QRIS, transfer sesuai nominal, lalu chat WA mimin.",
  footer:"© 2026 KNOK REAL STORE • FAST RESPONSE",
  whatsapp:"6281234567890",accent:"#A855FF",bg:"#07070A"
 },products:[
  {id:1,name:"KNOK GAME 10K",price:"Rp10.000",badge:"BEST SELLER",description:"Proses cepat • Garansi full",emoji:"▣",image:""},
  {id:2,name:"KNOK GAME 20K",price:"Rp20.000",badge:"HEMAT",description:"Paling laris minggu ini • Bonus tips",emoji:"▣",image:""},
  {id:3,name:"KNOK GAME 50K",price:"Rp50.000",badge:"SULTAN",description:"Paket sultan • Prioritas proses • VIP",emoji:"▣",image:""}
 ]};
 fs.writeFileSync(dataFile,JSON.stringify(initial,null,2));
}
const load=()=>JSON.parse(fs.readFileSync(dataFile,"utf8"));
const save=d=>fs.writeFileSync(dataFile,JSON.stringify(d,null,2));

const upload=multer({dest:path.join(__dirname,"uploads")});
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use(express.static(path.join(__dirname,"public")));

app.get("/api/store",(req,res)=>{const d=load();res.json({settings:d.settings,products:d.products});});
app.post("/api/login",(req,res)=>{if(req.body.password===ADMIN_PASSWORD){req.session.admin=true;return res.json({ok:true})}res.status(401).json({ok:false,message:"Password salah"})});
app.post("/api/logout",(req,res)=>{req.session.destroy(()=>res.json({ok:true}))});
app.get("/api/me",(req,res)=>res.json({admin:!!req.session.admin}));
function auth(req,res,next){if(!req.session.admin)return res.status(401).json({message:"Belum login"});next()}

app.post("/api/settings",auth,(req,res)=>{const d=load();d.settings={...d.settings,...req.body};save(d);res.json({ok:true,settings:d.settings})});
app.post("/api/products",auth,(req,res)=>{const d=load();const p={...req.body,id:Date.now()};d.products.push(p);save(d);res.json(p)});
app.put("/api/products/:id",auth,(req,res)=>{const d=load();const id=Number(req.params.id);const i=d.products.findIndex(x=>x.id===id);if(i<0)return res.status(404).json({message:"Produk tidak ditemukan"});d.products[i]={...d.products[i],...req.body,id};save(d);res.json(d.products[i])});
app.delete("/api/products/:id",auth,(req,res)=>{const d=load();d.products=d.products.filter(x=>x.id!==Number(req.params.id));save(d);res.json({ok:true})});
app.post("/api/upload",auth,upload.single("file"),(req,res)=>{if(!req.file)return res.status(400).json({message:"File kosong"});const ext=path.extname(req.file.originalname)||"";const target=path.join(__dirname,"uploads",req.file.filename+ext);fs.renameSync(req.file.path,target);res.json({url:"/uploads/"+path.basename(target)})});

app.get("/admin",(req,res)=>res.sendFile(path.join(__dirname,"public","admin.html")));
app.listen(PORT,()=>console.log("KNOK REAL STORE running on http://localhost:"+PORT));
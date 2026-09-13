import { getStore } from "@netlify/blobs";

const json = (body, status=200) => new Response(JSON.stringify(body), {status, headers:{"content-type":"application/json","cache-control":"no-store"}});
function clean(s, max=1000){ return String(s ?? "").trim().slice(0,max); }
function id(){ return crypto.randomUUID().replaceAll("-","").slice(0,8).toUpperCase(); }

export default async (req) => {
  const store = getStore({name:"wishes", consistency:"strong"});
  const url = new URL(req.url);
  const parts = url.pathname.split("/").filter(Boolean);
  const key = parts.at(-1);
  if(req.method === "GET"){
    if(!key) return json({error:"Missing wish id"},400);
    const data = await store.get(key,{type:"json"});
    return data ? json(data) : json({error:"Wish not found"},404);
  }
  if(req.method === "POST"){
    let d; try{ d=await req.json(); }catch{return json({error:"Invalid JSON"},400);}
    if(!d.receiver || !d.type) return json({error:"Receiver and occasion are required"},400);
    const wish={type:clean(d.type,30),receiver:clean(d.receiver,60),sender:clean(d.sender,60)||"Utpal",message:clean(d.message,1200),date:clean(d.date,30),photo:typeof d.photo==="string"?d.photo.slice(0,1600000):"",createdAt:new Date().toISOString()};
    let key=id();
    while(await store.get(key)) key=id();
    await store.setJSON(key,wish);
    return json({id:key,wish});
  }
  return json({error:"Method not allowed"},405);
};
export const config={path:"/api/wish/*"};

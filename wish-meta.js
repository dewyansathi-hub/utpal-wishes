export default async (request, context) => {
  const url = new URL(request.url);
  const parts=url.pathname.split("/").filter(Boolean);
  const id=parts[1];
  if(!id) return context.next();
  try{
    const r=await fetch(`${url.origin}/api/wish/${encodeURIComponent(id)}`);
    if(!r.ok) return context.next();
    const d=await r.json();
    const labels={birthday:"Birthday",anniversary:"Anniversary",wedding:"Wedding",congrats:"Congratulations",love:"Love",friendship:"Friendship",thankyou:"Thank You",luck:"Best of Luck",getwell:"Get Well Soon",eid:"Eid Mubarak",christmas:"Christmas",newyear:"New Year",farewell:"Farewell",custom:"Special Wish"};
    const label=labels[d.type]||"Special Wish";
    const title=`🎁 A special ${label} surprise for ${d.receiver} | Utpal Wishes`;
    const desc=`Someone made a special ${label} surprise just for ${d.receiver}. Tap to open your gift! ✨`;
    const html=await (await fetch(`${url.origin}/index.html`)).text();
    const out=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`).replace(/<meta name="description"[^>]*>/i,`<meta name="description" content="${esc(desc)}">`).replace(/<meta property="og:title"[^>]*>/i,`<meta property="og:title" content="${esc(title)}">`).replace(/<meta property="og:description"[^>]*>/i,`<meta property="og:description" content="${esc(desc)}">`).replace(/<meta property="og:url"[^>]*>/i,`<meta property="og:url" content="${esc(url.href)}">`).replace(/<meta property="og:image"[^>]*>/i,`<meta property="og:image" content="${url.origin}/og-card.svg">`);
    return new Response(out,{headers:{"content-type":"text/html; charset=UTF-8","cache-control":"public,max-age=60"}});
  }catch{return context.next();}
};
function esc(s){return String(s).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");}

const V='nancy-v1',SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const q=e.request,u=new URL(q.url);
 if(q.method!=='GET'||u.hostname.endsWith('openstreetmap.org'))return;
 if(q.mode==='navigate'){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(q,c));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(q).then(m=>m||fetch(q).then(r=>{
  if((r.ok||r.type==='opaque')&&(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'||u.hostname.startsWith('fonts.g'))){const c=r.clone();caches.open(V).then(x=>x.put(q,c))}
  return r})))});

var CACHE='carnet-v1';var ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(x){if(x!==CACHE)return caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var req=e.request;if(req.method!=='GET')return;var h=req.mode==='navigate'||(req.headers.get('accept')||'').indexOf('text/html')!==-1;
if(h){e.respondWith(fetch(req).then(function(r){var c=r.clone();caches.open(CACHE).then(function(k){k.put(req,c);});return r;}).catch(function(){return caches.match(req).then(function(m){return m||caches.match('./index.html');});}));}
else{e.respondWith(caches.match(req).then(function(c){return c||fetch(req).then(function(r){var cc=r.clone();caches.open(CACHE).then(function(k){k.put(req,cc);});return r;}).catch(function(){return c;});}));}});

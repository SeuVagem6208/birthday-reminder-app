self.addEventListener("install", e=>{
  e.waitUntil(
    caches.open("birthday-app").then(cache=>{
      return cache.addAll(["/","/index.html","/style.css","/app.js","/manifest.json","/icon.png","/icon-512.png"]);
    })
  );
});

self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(resp=> resp || fetch(e.request))
  );
});

// Forçar atualização automática
self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(keys.map(key=>{
        if(key!=="birthday-app"){ return caches.delete(key); }
      }));
    })
  );
});

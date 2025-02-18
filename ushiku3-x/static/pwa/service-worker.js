//service-worker.js
//tid_corporate_project(2024)
//gen2
//created T.Saito

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('pwa-cache').then(function (cache) {
            return cache.addAll([
                '/'
            ]);
        })
    );
});

self.addEventListener('fetch', function (ev) {
    if(ev.request.url.includes('/')){
        ev.respondWith(fetch(ev.request));
    }else{
        ev.respondWith(
            caches.match(ev.request).then(function (response) {
                return response || fetch(ev.request);
            })
        );
    }
});

self.addEventListener('activate', evnt => {
    const cacheWhitelist = [CACHE_NAME];
    evnt.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
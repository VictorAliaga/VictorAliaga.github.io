var cacheName = "misperris-version1";
var filesToCache = [
    "/",
    "/index.html",
    "/mascotas.html",
    "/registro.html",
    "/login.html",
    "/app/app.js",
    "/app/parse.js",
    "/font/fontello.eot",
    "/font/fontello.svg",
    "/font/fontello.ttf",
    "/font/fontello.woff",
    "/font/fontello.woff2",
    "/style/banner.css",
    "/style/fontello.css",
    "/style/login.css",
    "/style/main.css",
    "/style/menu.css", 
    "/style/perritodetalle.css",
    "/style/perritos.css",
    "/style/registrar.css",
    "/style/registrocompleto.css",
    "/img/banner.css",
    "/img/favicon.css",
    "/img/icono.png",
    "/img/icono-125x125.png",
    "/img/icono-152x152.png",
    "/img/icono-192x192.png",
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( cacheName ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
} );

self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
        caches.keys( ).then( function( keyList ) {
            return Promise.all( keyList.map( function( key ) {
                if ( key != cacheName ) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener( 'fetch', function( e ) {
    console.log( '[ServiceWorker] Fetch', e.request.url );
    e.respondWith(
        caches.match( e.request ).then( function( response ) {
            return response || fetch( e.request );
        } )
    );
} );
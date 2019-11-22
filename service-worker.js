importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '3' },
        { url: '/manifest.json', revision: '3' },
        { url: '/index.html', revision: '3' },
        { url: '/nav.html', revision: '3' },
        { url: '/favicon.ico', revision: '3' },
        { url: '/images/icons-192.png', revision: '3' },
        { url: '/images/icons-512.png', revision: '3' },
        { url: '/images/badgeicon.png', revision: '3' },
        { url: '/pages/home.html', revision: '3' },
        { url: '/pages/teams.html', revision: '3' },
        { url: '/pages/bookmark.html', revision: '3' },
        { url: '/css/main.css', revision: '3' },
        { url: '/css/materialize.min.css', revision: '3' },
        { url: '/js/main.js', revision: '3' },
        { url: '/js/materialize.min.js', revision: '3' },
        { url: '/js/api.js', revision: '3' },
        { url: '/js/nav.js', revision: '3' },
        { url: '/js/page.js', revision: '3' },
        { url: '/js/database.js', revision: '3' },
        { url: '/js/listener.js', revision: '3' },
        { url: '/js/pwa.js', revision: '3' },
        { url: '/js/idb.js', revision: '3' },
        { url: '/images/bgnav.gif', revision: '3' },
        { url: '/images/ikhsan.jpg', revision: '3' },
        { url: '/images/1.gif', revision: '3' },
        { url: '/images/2.gif', revision: '3' },
        { url: '/images/3.jpg', revision: '3' },
        ]);

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );


    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/'),
        workbox.strategies.staleWhileRevalidate()
        )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}

//Response Push Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
} else {
    body = 'Push message no payload';
}
var options = {
    body: body,
    image: '/images/icons-512.png',
    badge: '/images/badgeicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
  }
};
event.waitUntil(
    self.registration.showNotification('Push Notification', options)
    );
});
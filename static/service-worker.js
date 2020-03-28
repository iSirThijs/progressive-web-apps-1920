const cacheName = 'v1';
const cacheAssets = ['/', '/offline', '/static/index-4d9fe87e6a.css', '/static/index-5f53e12011.js'];

self.addEventListener('install', (event) => {
	console.log('installing');
	event.waitUntil(
		caches.open(cacheName)
			.then((cache) => cache.addAll(cacheAssets))
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', () => {
	console.log('activated');
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
			.then(res => res)
			.catch(() => caches.match('/offline'))

	);
});
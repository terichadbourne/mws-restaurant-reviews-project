import idb from 'idb'
const staticCacheName = "mws-v2";
//comment
const dbPromise = idb.open('mwsrestaurantreviews',1,function(upgradeDb){
    switch(upgradeDb.oldVersion){
        case 0:
            upgradeDb.createObjectStore('restaurants',{keyPath:'id'});
    }
})

self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open(staticCacheName)
		.then(function(cache){
			return cache.addAll([
				'/',
				'/restaurant.html',
				'/manifest.json',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/js/dbhelper.js',
				'/js/leaflet.js',
				'/css/styles.css',
				'/css/leaflet.scss',
				'/img/avatar.svg',
				'/img/back.svg',
				'/img/clock.svg',
				'/img/cuisine.svg',
				'/img/downarrow.svg',
				'/img/downcaret.svg',
				'/img/emptystar.svg',
				'/img/fullstar.svg',
				'/img/waypoint.svg',
				'/img/marker-icon.png',
				'/img/marker-icon2x.png',
				'/img/marker-shadow.png',
				'/img/logo-1x.png',
				'/img/logo-2x.png',
				'/img/logo-1x.webp',
				'/img/logo-2x.webp',
				'/img/undefined-1x.jpg',
				'/img/undefined-2x.jpg',
				'/img/undefined-1x.webp',
				'/img/undefined-2x.webp',
			]).catch(function(e){
				console.log('e',e)
			});
		})
	)
})

self.addEventListener('activate', function(event) {
	event.waitUntil(
	  caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
				return cacheName.startsWith('mws-') &&
					cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
	  })
	);
});

self.addEventListener('fetch',function(event){
	const requestUrl = new URL(event.request.url);
	const id = requestUrl.href.endsWith('restaurants') ? "-1" : requestUrl.href.split('/').pop();
	if(requestUrl.port === '1337'){
		event.respondWith(
			dbPromise.then(function(db){
				return db.transaction('restaurants').objectStore('restaurants').get(id);
			}).then(function(data){
				if(data && data.data){
					return data.data;
				}else{
					return fetch(event.request).then(function(response){
						return response.json();
					}).then(function(json){
						return dbPromise.then(function(db){
							var tx = db.transaction('restaurants','readwrite');
							var keyValStore = tx.objectStore('restaurants');
							keyValStore.put({
								id: id,
								data: json
							});
							return json;
						})
					});
				}
				
			}).then(function(response){
				return new Response(JSON.stringify(response));
			})
		)
	}
	else if(requestUrl.origin === location.origin){
		if(requestUrl.pathname.match('/restaurant.html(.?)')){
			event.respondWith(
				caches.match('/restaurant.html(.?)').then(function(response){
					if(response) return response;
					return fetch(event.request);
				})
			)
		}else{
			event.respondWith(
				caches.match(event.request).then(function(response){
					if(response) return response;
					return fetch(event.request).catch(function(e){
						console.log('e',e);
					});
				})
			)
		}
	}

});

self.addEventListener('message', function(event) {
	if (event.data.action == 'skipWaiting') {
		self.skipWaiting().then(function() {
			console.log('skipped')
		}).catch(function(e){
			console.log('error ',e)
		});
	}
});
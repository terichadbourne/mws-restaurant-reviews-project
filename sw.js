!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";!function(){function e(t){return new Promise(function(e,n){t.onsuccess=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function n(t,n,r){var o,i=new Promise(function(i,s){e(o=t[n].apply(t,r)).then(i,s)});return i.request=o,i}function r(t,e,n){n.forEach(function(n){Object.defineProperty(t.prototype,n,{get:function(){return this[e][n]},set:function(t){this[e][n]=t}})})}function o(t,e,r,o){o.forEach(function(o){o in r.prototype&&(t.prototype[o]=function(){return n(this[e],o,arguments)})})}function i(t,e,n,r){r.forEach(function(r){r in n.prototype&&(t.prototype[r]=function(){return this[e][r].apply(this[e],arguments)})})}function s(t,e,r,o){o.forEach(function(o){o in r.prototype&&(t.prototype[o]=function(){return function(t,e,r){var o=n(t,e,r);return o.then(function(t){if(t)return new u(t,o.request)})}(this[e],o,arguments)})})}function c(t){this._index=t}function u(t,e){this._cursor=t,this._request=e}function a(t){this._store=t}function f(t){this._tx=t,this.complete=new Promise(function(e,n){t.oncomplete=function(){e()},t.onerror=function(){n(t.error)},t.onabort=function(){n(t.error)}})}function h(t,e,n){this._db=t,this.oldVersion=e,this.transaction=new f(n)}function l(t){this._db=t}r(c,"_index",["name","keyPath","multiEntry","unique"]),o(c,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),s(c,"_index",IDBIndex,["openCursor","openKeyCursor"]),r(u,"_cursor",["direction","key","primaryKey","value"]),o(u,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(u.prototype[t]=function(){var n=this,r=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,r),e(n._request).then(function(t){if(t)return new u(t,n._request)})})})}),a.prototype.createIndex=function(){return new c(this._store.createIndex.apply(this._store,arguments))},a.prototype.index=function(){return new c(this._store.index.apply(this._store,arguments))},r(a,"_store",["name","keyPath","indexNames","autoIncrement"]),o(a,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),s(a,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),i(a,"_store",IDBObjectStore,["deleteIndex"]),f.prototype.objectStore=function(){return new a(this._tx.objectStore.apply(this._tx,arguments))},r(f,"_tx",["objectStoreNames","mode"]),i(f,"_tx",IDBTransaction,["abort"]),h.prototype.createObjectStore=function(){return new a(this._db.createObjectStore.apply(this._db,arguments))},r(h,"_db",["name","version","objectStoreNames"]),i(h,"_db",IDBDatabase,["deleteObjectStore","close"]),l.prototype.transaction=function(){return new f(this._db.transaction.apply(this._db,arguments))},r(l,"_db",["name","version","objectStoreNames"]),i(l,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(t){[a,c].forEach(function(e){t in e.prototype&&(e.prototype[t.replace("open","iterate")]=function(){var e=function(t){return Array.prototype.slice.call(t)}(arguments),n=e[e.length-1],r=this._store||this._index,o=r[t].apply(r,e.slice(0,-1));o.onsuccess=function(){n(o.result)}})})}),[c,a].forEach(function(t){t.prototype.getAll||(t.prototype.getAll=function(t,e){var n=this,r=[];return new Promise(function(o){n.iterateCursor(t,function(t){t?(r.push(t.value),void 0===e||r.length!=e?t.continue():o(r)):o(r)})})})});var p={open:function(t,e,r){var o=n(indexedDB,"open",[t,e]),i=o.request;return i&&(i.onupgradeneeded=function(t){r&&r(new h(i.result,t.oldVersion,i.transaction))}),o.then(function(t){return new l(t)})},delete:function(t){return n(indexedDB,"deleteDatabase",[t])}};t.exports=p,t.exports.default=t.exports}()},function(t,e,n){"use strict";n.r(e);var r=n(0);const o=n.n(r).a.open("mwsrestaurants",2,function(t){switch(t.oldVersion){case 0:t.createObjectStore("restaurants",{keyPath:"id"});case 1:t.createObjectStore("reviews",{keyPath:"id"})}});self.addEventListener("install",function(t){t.waitUntil(caches.open("mwsrestaurantreview-v4").then(function(t){return t.addAll(["/","/restaurant.html","/manifest.json","/js/main.js","/js/restaurant_info.js","/js/dbhelper.js","/js/dbworker.js","/css/styles.css","/css/leaflet.css","/img/avatar.svg","/img/back.svg","/img/clock.svg","/img/cuisine.svg","/img/downarrow.svg","/img/downcaret.svg","/img/emptystar.svg","/img/fullstar.svg","/img/waypoint.svg","/img/marker-icon.png","/img/marker-icon-2x.png","/img/marker-shadow.png","/marker-icon.png","/marker-icon-2x.png","/marker-shadow.png","/img/logo_1x.png","/img/logo_2x.png","/img/undefined_1x.jpg","/img/undefined_2x.jpg"]).catch(function(t){console.error("e",t)})}))}),self.addEventListener("activate",function(t){t.waitUntil(caches.keys().then(function(t){return Promise.all(t.filter(function(t){return t.startsWith("mws-")&&"mwsrestaurantreview-v4"!=t}).map(function(t){return caches.delete(t)}))}))}),self.addEventListener("fetch",function(t){const e=new URL(t.request.url),n=e.href.endsWith("restaurants")?"-1":e.href.split("/").pop();"1337"===e.port&&"/reviews/"===e.pathname&&"GET"===t.request.method?t.respondWith(o.then(function(t){return t.transaction("reviews").objectStore("reviews").get(n)}).then(function(t){if(t){let e=t.data.filter(t=>void 0===t.createdAt);return Promise.all(e.map(function(t){fetch("http://localhost:1337/reviews/",{method:"POST",body:JSON.stringify(t)}).then(function(t){return t.json()}).then(function(t){return t})})).then(function(){return t})}}).then(function(){return fetch(t.request).then(function(t){return t.json()}).then(function(t){return o.then(function(e){return e.transaction("reviews","readwrite").objectStore("reviews").put({id:n,data:t}),t})}).catch(function(){return o.then(function(t){return t.transaction("reviews").objectStore("reviews").get(n)}).then(function(t){return t})})}).then(function(t){return new Response(JSON.stringify(t))}).catch(function(t){return new Response(JSON.stringify(t))})):"1337"===e.port&&"/reviews/"!=e.pathname&&"GET"===t.request.method?t.respondWith(o.then(function(t){return t.transaction("restaurants").objectStore("restaurants").get(n)}).then(function(e){return fetch(t.request).then(function(t){return t.json()}).then(function(t){let e=t.is_favorite;return o.then(function(r){return r.transaction("restaurants","readwrite").objectStore("restaurants").get(n).then(function(n){return n.data.is_favorite!=e&&(console.log("they do not match"),"true"==n.data.is_favorite?(console.log("making favorite"),fetch("http://localhost:1337/restaurants/1/?is_favorite=true",{method:"PUT"}).then(function(t){return t.json()}).then(function(t){return console.log("response: ",t),o.then(e=>{const n=e.transaction("restaurants","readwrite");return n.objectStore("restaurants").put({id:`${t.id}`,data:t}),n.complete})}).then(function(){self.clients.matchAll().then(function(t){t.forEach(function(t){t.postMessage({favorite:!0})})})})):(console.log("making unfavorite"),fetch("http://localhost:1337/restaurants/1/?is_favorite=false",{method:"PUT"}).then(function(t){return t.json()}).then(function(t){return console.log("response: ",t),o.then(e=>{const n=e.transaction("restaurants","readwrite");return n.objectStore("restaurants").put({id:`${t.id}`,data:t}),n.complete})}).then(function(){self.clients.matchAll().then(function(t){t.forEach(function(t){t.postMessage({favorite:!1})})})}))),t})}).catch(function(){return o.then(function(e){return e.transaction("restaurants","readwrite").objectStore("restaurants").put({id:n,data:t}),t})})}).catch(function(){return e.data})}).then(function(t){return new Response(JSON.stringify(t))})):e.origin===location.origin&&"GET"===t.request.method&&("restaurant.html"===e.pathname.substr(e.pathname.lastIndexOf("/")+1)?t.respondWith(caches.match("/restaurant.html").then(e=>fetch(t.request).then(function(e){return caches.open("mwsrestaurantreview-v4").then(function(n){return n.put(t.request,e.clone()),e})}).catch(function(){return caches.match(t.request)}))):t.respondWith(caches.match(t.request).then(e=>fetch(t.request).then(function(e){return caches.open("mwsrestaurantreview-v4").then(function(n){return n.put(t.request,e.clone()),e})}).catch(function(){return caches.match(t.request)}))))}),self.addEventListener("message",function(t){"skipWaiting"==t.data.action&&self.skipWaiting().then(function(){console.log("skipped")}).catch(function(t){console.error("error ",t)})}),self.addEventListener("sync",t=>{"add-review"==t.tag&&(console.log("attempting sync",t.tag),console.log("syncing",t.tag),t.waitUntil(o.then(function(t){return t.transaction("reviews").objectStore("reviews").getAll()}).then(t=>{const e=t[0].data.filter(t=>t.unsynced);return console.log("pending sync",e),Promise.all(e.map(t=>{console.log("Attempting fetch",t),fetch("http://localhost:1337/reviews/",{method:"POST",body:JSON.stringify(t)}).then(e=>{const n=Object.assign({},t,{unsynced:!1});return o.then(t=>{const e=t.transaction("reviews","readwrite");return e.objectStore("reviews").put(n),e.complete})})}))})))})}]);
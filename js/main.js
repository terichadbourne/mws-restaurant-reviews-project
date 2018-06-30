let restaurants,neighborhoods,cuisines;var newMap,markers=[];if("serviceWorker"in navigator){function _trackInstalling(e){e.addEventListener("statechange",function(){"installed"==e.state&&_updateReady(e)})}var focusedElement,refreshing;function _updateReady(e){document.getElementById("update-version").addEventListener("click",function(){e.postMessage({action:"skipWaiting"})}),document.getElementById("dismiss-version").addEventListener("click",function(){document.getElementById("toast").classList.remove("active"),focusedElement.focus()}),document.getElementById("toast").addEventListener("keydown",function(e){9===e.keyCode&&(e.shiftKey?document.activeElement===n&&(e.preventDefault(),a.focus(),console.log("current focus :",document.activeElement)):document.activeElement===a&&(e.preventDefault(),n.focus())),27===e.keyCode&&(document.getElementById("toast").classList.remove("active"),focusedElement.focus())}),(focusedElement=document.activeElement).tabindex=1;var t=document.querySelectorAll("#toast p, #update-version, #dismiss-version"),n=(t=Array.prototype.slice.call(t))[0],a=t[t.length-1];document.getElementById("toast").classList.add("active"),document.querySelector("#toast p").focus()}navigator.serviceWorker.register("/sw.js").then(function(e){navigator.serviceWorker.controller&&(e.waiting?_updateReady():e.installing?_trackInstalling(e.installing):e.addEventListener("updatefound",function(){_trackInstalling(e.installing)}))}).catch(function(e){console.log("error registering service worker: ",e)}),navigator.serviceWorker.addEventListener("controllerchange",function(){console.log("controller change"),refreshing||(window.location.reload(),refreshing=!0)})}document.addEventListener("DOMContentLoaded",e=>{initMap(),fetchNeighborhoods(),fetchCuisines()}),fetchNeighborhoods=(()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),fetchCuisines=(()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),initMap=(()=>{self.newMap=L.map("map",{center:[40.722216,-73.987501],zoom:12,scrollWheelZoom:!1}),L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}",{mapboxToken:"pk.eyJ1IjoiZmFycmVsbHNjcmlwdCIsImEiOiJjamJiaTl3dHMxOGxsMzJwZTlmYnN4ZHN5In0.6Ey50el0atwjDygO_cO0sA",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.streets"}).addTo(newMap),updateRestaurants()}),updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,s=e[n].value,r=t[a].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(s,r,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()}),createRestaurantHTML=(e=>{const t=document.createElement("li");t.className="restaurant__container";const n=document.createElement("picture"),a=document.createElement("source");a.srcset=DBHelper.imageWebPSrcSetForRestaurant(e),a.className="restaurant__image",a.type="image/webp",n.append(a);const s=document.createElement("source");s.srcset=DBHelper.imageJpgSrcSetForRestaurant(e),s.className="restaurant__image",s.type="image/jpeg",n.append(s);const r=document.createElement("img");r.className="restaurant__image",r.alt=DBHelper.imageTextForRestaurant(e),r.src=DBHelper.imageUrlForRestaurant(e),n.append(r),t.append(n);const o=document.createElement("div");o.className="restaurant__textcontainer";const c=document.createElement("h2");c.className="restaurant__name",c.innerHTML=e.name,o.append(c);const i=document.createElement("div");i.className="restaurant__reviewcontainer";const l=5-DBHelper.ratingForRestaurant(e);for(let t=0;t<DBHelper.ratingForRestaurant(e);t++){const e=document.createElement("img");e.className="restaurant__star restaurant__star--full",e.src="/img/fullstar.svg",e.alt="",i.append(e)}for(let e=0;e<l;e++){const e=document.createElement("img");e.className="restaurant__star restaurant__star--empty",e.src="/img/emptystar.svg",e.alt="",i.append(e)}o.append(i);const d=document.createElement("p");d.className="restaurant__cuisine",d.innerHTML=e.cuisine_type,o.append(d);const u=document.createElement("p");u.className="restaurant__neighborhood",u.innerHTML=e.neighborhood,o.append(u);const m=document.createElement("hr");m.className="restaurant__hr",o.append(m);const p=document.createElement("p");p.className="restaurant__address",p.innerHTML=e.address,o.append(p);const g=document.createElement("a");return g.className="restaurant__link",g.innerHTML=DBHelper.urlTextForRestaurant(e),g.href=DBHelper.urlForRestaurant(e),o.append(g),t.append(o),t}),addMarkersToMap=((e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.newMap);t.on("click",function(){window.location.href=t.options.url})})}),document.getElementById("neighborhoods-select").addEventListener("focus",function(){this.previousElementSibling.classList.add("filter__label--active")}),document.getElementById("neighborhoods-select").addEventListener("blur",function(){"all"===this.value&&this.previousElementSibling.classList.remove("filter__label--active")}),document.getElementById("cuisines-select").addEventListener("focus",function(){this.previousElementSibling.classList.add("filter__label--active")}),document.getElementById("cuisines-select").addEventListener("blur",function(){"all"===this.value&&this.previousElementSibling.classList.remove("filter__label--active")});
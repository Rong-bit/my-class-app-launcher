// 這個檔案是 PWA 的核心，負責離線快取和背景功能
// 它的存在是讓瀏覽器顯示「安裝」選項的必要條件

const CACHE_NAME = 'class-app-launcher-v1';
const urlsToCache = [
  './',
  './index.html'
];

self.addEventListener('install', function(event) {
  // 執行安裝步驟
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('快取已開啟');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 如果快取中存在，則從快取返回
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});```

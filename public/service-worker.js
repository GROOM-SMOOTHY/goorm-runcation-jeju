// 캐시 버전 이름 (업데이트 시 v2, v3 등으로 변경)
const CACHE_NAME = "app-cache-v2";

// 네트워크 우선 전략: 네트워크 시도 → 실패 시 캐시만 사용 (오프라인 대응)
const networkFirst = async (request) => {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || new Response("Offline", { status: 503 });
  }
};

// 서비스 워커 설치 단계
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// 서비스 워커 활성화 단계
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

// 네트워크 우선: HTML/문서는 항상 최신 버전 사용, 배포 후 asset 404 방지
self.addEventListener("fetch", (event) => {
  event.respondWith(networkFirst(event.request));
});

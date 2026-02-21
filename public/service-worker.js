// 캐시 버전 이름 (업데이트 시 v2, v3 등으로 변경)
const CACHE_NAME = "app-cache-v1";

// 앱 설치 및 오프라인 동작을 위해 미리 캐시할 리소스 목록
const PRECACHE_URLS = [
  "/", // 앱 루트
  "/index.html", // 메인 HTML 파일
  "/manifest.json", // PWA 매니페스트
];

// 지정한 리소스를 캐시에 저장하는 함수
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

// 서비스 워커 설치 단계
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      // 리소스를 캐시에 저장
      await addResourcesToCache(PRECACHE_URLS);
      // 새 서비스 워커를 즉시 활성화
      await self.skipWaiting();
    })(),
  );
});

// 서비스 워커 활성화 단계
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      // 현재 캐시 이름과 다른 이전 캐시들을 모두 삭제
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
      );
      // 모든 클라이언트를 즉시 제어하도록 설정
      await self.clients.claim();
    })(),
  );
});

// 네트워크 요청 가로채기 처리
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // 캐시 우선 전략:
    // 캐시에 있으면 캐시 응답 반환,
    // 없으면 네트워크 요청 수행
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    }),
  );
});

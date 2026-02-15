export {};

declare global {
  interface Window {
    kakao: typeof kakao;
  }

  namespace kakao {
    namespace maps {
      function load(callback: () => void): void;

      class LatLng {
        constructor(lat: number, lng: number);
      }

      interface MarkerOptions {
        position: LatLng;
        map?: Map;            // ✅ 추가
        image?: MarkerImage;
      }

      class Map {
        constructor(container: HTMLElement, options: MapOptions);
        setCenter(latlng: LatLng): void;
      }

      interface MarkerOptions {
        position: LatLng;
        image?: MarkerImage;
      }

      class Marker {
        constructor(options: MarkerOptions);
        setMap(map: Map | null): void;
        setPosition(latlng: LatLng): void;
      }

      class InfoWindow {
        constructor(options: { content: string });
        open(map: Map, marker: Marker): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class MarkerImage {
        constructor(src: string, size: Size);
      }

      class Polyline {
        constructor(options: { path: LatLng[] });
        getLength(): number;
      }
    }
  }
}

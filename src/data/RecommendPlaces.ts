import 구팔일 from "/src/assets/places/9.81파크.webp";
import 금능해수욕장 from "/src/assets/places/금능해수욕장.webp";
import 김녕해수욕장 from "/src/assets/places/김녕해수욕장.webp";
import 남원큰엉해변 from "/src/assets/places/남원큰엉해변.webp";
import 박물관이살아있다 from "/src/assets/places/박물관이살아있다.webp";
import 북촌돌하르방미술관 from "/src/assets/places/북촌돌하르방미술관.webp";
import 비양도 from "/src/assets/places/비양도.webp";
import 서귀포올레시장 from "/src/assets/places/서귀포올레시장.webp";
import 성산일출봉 from "/src/assets/places/성산일출봉.webp";
import 아르떼뮤지엄 from "/src/assets/places/아르떼뮤지엄.webp";
import 아쿠아플라넷제주 from "/src/assets/places/아쿠아플라넷제주.webp";
import 애월한담해안산책로 from "/src/assets/places/애월한담해안산책로.webp";
import 애월해안도로 from "/src/assets/places/애월해안도로.webp";
import 여미지식물원 from "/src/assets/places/여미지식물원.webp";
import 용두암 from "/src/assets/places/용두암.webp";
import 우도잠수함 from "/src/assets/places/우도잠수함.webp";
import 월정리해수욕장 from "/src/assets/places/월정리해수욕장.webp";
import 월정투명카약 from "/src/assets/places/월정투명카약.webp";
import 제주동문시장 from "/src/assets/places/제주동문시장.webp";
import 제주레일바이크 from "/src/assets/places/제주레일바이크.webp";
import 제주레포츠랜드 from "/src/assets/places/제주레포츠랜드.webp";
import 제주조천스위스마을 from "/src/assets/places/제주조천스위스마을.webp";
import 천지연폭포 from "/src/assets/places/천지연폭포.webp";
import 초원승마클럽 from "/src/assets/places/초원승마클럽.webp";
import 초콜릿랜드 from "/src/assets/places/초콜릿랜드.webp";
import 협재해수욕장 from "/src/assets/places/협재해수욕장.webp";
import 휴애리자연생활공원 from "/src/assets/places/휴애리자연생활공원.webp";

export type Region =
  | "서귀동"
  | "연동"
  | "한림읍"
  | "구좌읍"
  | "성산읍"
  | "조천읍"
  | "애월읍"
  | "중문동"
  | "남원읍";

export type RecommendPlace = {
  id: string;
  region: Region;
  title: string;
  desc: string;
  image: string;
};

export const recommendPlaces: RecommendPlace[] = [
  {
    id: "seogwi-cheonjeyeon",
    region: "서귀동",
    title: "천지연폭포",
    desc: "하늘과 땅이 만나서 이룬 연못 · 천연기념물 제163호",
    image: 천지연폭포,
  },
  {
    id: "seogwi-ollemkt",
    region: "서귀동",
    title: "서귀포 올레시장",
    desc: "제주 특산물과 먹거리를 한자리에서 즐길 수 있는 전통 시장",
    image: 서귀포올레시장,
  },
  {
    id: "yeon-yongduam",
    region: "연동",
    title: "용두암",
    desc: "용의 머리를 닮은 기암절벽이 인상적인 제주 대표 해안 명소",
    image: 용두암,
  },
  {
    id: "yeon-dongmun",
    region: "연동",
    title: "제주 동문 시장",
    desc: "신선한 해산물과 다양한 길거리 음식을 맛볼 수 있는 제주 대표 시장",
    image: 제주동문시장,
  },
  {
    id: "hallim-biyangdo",
    region: "한림읍",
    title: "비양도",
    desc: "천 년의 시간을 간직한 섬 · 천연기념물 제439호",
    image: 비양도,
  },
  {
    id: "hallim-hyeopjae",
    region: "한림읍",
    title: "협재 해수욕장",
    desc: "비양도, 은모래, 바다가 그려낸 그림같이 아름다운 해변",
    image: 협재해수욕장,
  },
  {
    id: "hallim-geumneung",
    region: "한림읍",
    title: "금능 해수욕장",
    desc: "협재해수욕장과 이어진 한적하고 여유로운 서쪽 바다 명소",
    image: 금능해수욕장,
  },
  {
    id: "gujwa-woljeong",
    region: "구좌읍",
    title: "월정리 해수욕장",
    desc: "달이 머물다 가는 제주도의 아름다운 해변",
    image: 월정리해수욕장,
  },
  {
    id: "gujwa-gimnyeong",
    region: "구좌읍",
    title: "김녕 해수욕장",
    desc: "하얀 모래와 부서지는 파도가 아름다운 해수욕장",
    image: 김녕해수욕장,
  },
  {
    id: "gujwa-kayak",
    region: "구좌읍",
    title: "월정투명카약",
    desc: "바닷속을 직접 배안에서 볼 수 있는 카약체험",
    image: 월정투명카약,
  },
  {
    id: "gujwa-railbike",
    region: "구좌읍",
    title: "제주레일바이크",
    desc: "스릴과 힐링! 제주의 대자연을 달리고 체험하는 제주레일바이크",
    image: 제주레일바이크,
  },
  {
    id: "seongsan-sunrise",
    region: "성산읍",
    title: "성산일출봉",
    desc: "바다위에 우뚝 솟아난 수성화산·유네스코 세계자연유산",
    image: 성산일출봉,
  },
  {
    id: "seongsan-aqua",
    region: "성산읍",
    title: "아쿠아플라넷제주",
    desc: "500여 종의 바다 생명체가 있는 프리미엄 해양 테마파크",
    image: 아쿠아플라넷제주,
  },
  {
    id: "seongsan-submarine",
    region: "성산읍",
    title: "우도잠수함",
    desc: "제주도만의 자연적인 바닷속을 직접보고 느끼고 몸으로 체험을 할 수 있는 곳",
    image: 우도잠수함,
  },
  {
    id: "jochun-dolharubang",
    region: "조천읍",
    title: "북촌돌하르방미술관",
    desc: "제주의 자연과 문화 그리고 예술이 함께 어우러진 감성공간",
    image: 북촌돌하르방미술관,
  },
  {
    id: "jochun-leports",
    region: "조천읍",
    title: "제주레포츠랜드",
    desc: "일반 카트장의 3배 크기, 국제경기 유치가 가능한 국내 최대 규모 카트장",
    image: 제주레포츠랜드,
  },
  {
    id: "jochun-swiss",
    region: "조천읍",
    title: "제주조천스위스마을",
    desc: "제주에서 느껴보는 스위스 색채와 감성",
    image: 제주조천스위스마을,
  },
  {
    id: "aewol-coastroad",
    region: "애월읍",
    title: "애월해안도로",
    desc: "도보, 자전거, 자동차 뭐든 좋은 서부 해안도로",
    image: 애월해안도로,
  },
  {
    id: "aewol-handam",
    region: "애월읍",
    title: "애월한담해안산책로",
    desc: "해안선을 따라 걷는 구불구불 해안길",
    image: 애월한담해안산책로,
  },
  {
    id: "aewol-981",
    region: "애월읍",
    title: "9.81파크",
    desc: "한라산과 비양도를 배경으로 자연과 디자인을 결합한 스마트 테마파크",
    image: 구팔일,
  },
  {
    id: "aewol-arte",
    region: "애월읍",
    title: "아르떼 뮤지엄",
    desc: "국내 최대의 몰입형 미디어아트 뮤지엄",
    image: 아르떼뮤지엄,
  },
  {
    id: "jungmun-alive",
    region: "중문동",
    title: "박물관이살아있다",
    desc: "다섯 개의 착시 체험 테마로 이루어진 눈속임 테마파크",
    image: 박물관이살아있다,
  },
  {
    id: "jungmun-yeomiji",
    region: "중문동",
    title: "여미지식물원",
    desc: "마음의 안식을 주는 동양 최대의 온실 식물원",
    image: 여미지식물원,
  },
  {
    id: "jungmun-choco",
    region: "중문동",
    title: "초콜릿랜드",
    desc: "초콜릿을 테마로 만든 전시관, 초콜릿 만들기 체험 가능",
    image: 초콜릿랜드,
  },
  {
    id: "jungmun-horse",
    region: "중문동",
    title: "초원승마클럽",
    desc: "한라산을 배경으로 한 이국적인 자연 속 힐링 승마체험",
    image: 초원승마클럽,
  },
  {
    id: "namwon-keuneong",
    region: "남원읍",
    title: "남원큰엉해변",
    desc: "때묻지 않은 기암절벽이 아름다운 해양경승지",
    image: 남원큰엉해변,
  },
  {
    id: "namwon-hueari",
    region: "남원읍",
    title: "휴애리자연생활공원",
    desc: "자연 속 동·식물들과 교감이 있는 체험형 자연생활공원",
    image: 휴애리자연생활공원,
  },
];

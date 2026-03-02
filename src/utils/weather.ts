const weatherDescKo = {
  Clear: "맑음",
  Clouds: "구름 많음",
  Rain: "비",
  Drizzle: "이슬비",
  Thunderstorm: "천둥번개",
  Snow: "눈",
  Mist: "옅은 안개",
  Smoke: "안개",
  Haze: "실안개",
  Dust: "황사",
  Fog: "안개",
  Sand: "모래 바람",
  Ash: "화산재",
  Squall: "돌풍",
  Tornado: "토네이도",
};

export const getWeatherDescKo = (weather: string) => {
  return weatherDescKo[weather as keyof typeof weatherDescKo] || "정보 없음";
};

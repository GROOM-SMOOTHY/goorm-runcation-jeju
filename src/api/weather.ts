export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다.");
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=kr`,
  );

  if (!res.ok) {
    throw new Error(`날씨 API 실패: ${res.status}`);
  }

  const data = await res.json();

  if (
    !data?.weather?.[0]?.description ||
    typeof data?.main?.temp !== "number"
  ) {
    throw new Error("날씨 API 응답 형식이 올바르지 않습니다.");
  }

  return {
    description: data.weather[0].description,
    temp: Math.round(data.main.temp),
  };
};

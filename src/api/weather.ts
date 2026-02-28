export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=kr`,
  );

  if (!res.ok) {
    throw new Error(`날씨 API 실패: ${res.status}`);
  }

  const data = await res.json();

  return {
    description: data.weather[0].description,
    temp: Math.round(data.main.temp),
  };
};

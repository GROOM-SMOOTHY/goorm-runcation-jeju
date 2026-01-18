import restaurant_Namwon from "./region_Restaurant/region_Restaurant(남원읍).png"
import restaurant_Seogwipo from "./region_Restaurant/region_Restaurant(서귀포시).png"
import restaurant_Andeok from "./region_Restaurant/region_Restaurant(안덕면).png"
import restaurant_Aewol from "./region_Restaurant/region_Restaurant(애월읍).png"
import restaurant_Jeju from "./region_Restaurant/region_Restaurant(제주시).png"
import restaurant_Jocheon from "./region_Restaurant/region_Restaurant(조천읍).png"

import region_Namwon_T from "./region_Sightsee/region_Sightsee(남원읍_true).png"
import region_Seogwipo_T from "./region_Sightsee/region_Sightsee(서귀포시_true).png"
import region_Andeok_T from "./region_Sightsee/region_Sightsee(안덕면_true).png"
import region_Aewol_T from "./region_Sightsee/region_Sightsee(애월읍_true).png"
import region_Jeju_T from "./region_Sightsee/region_Sightsee(제주시_true).png"
import region_Jocheon_T from "./region_Sightsee/region_Sightsee(조천읍_true).png"

import region_Namwon_F from "./region_Sightsee/region_Sightsee(남원읍_false).png"
import region_Seogwipo_F from "./region_Sightsee/region_Sightsee(서귀포시_false).png"
import region_Andeok_F from "./region_Sightsee/region_Sightsee(안덕면_false).png"
import region_Aewol_F from "./region_Sightsee/region_Sightsee(애월읍_false).png"
import region_Jeju_F from "./region_Sightsee/region_Sightsee(제주시_false).png"
import region_Jocheon_F from "./region_Sightsee/region_Sightsee(조천읍_false).png"


export const restaurantImage: Record<string, string> = {
  "남원읍": restaurant_Namwon,
  "서귀포시": restaurant_Seogwipo,
  "애월읍": restaurant_Aewol,
  "안덕면": restaurant_Andeok,
  "제주시": restaurant_Jeju,
  "조천읍": restaurant_Jocheon
}

export const regionImage: Record<string, string> = {
  "남원읍T": region_Namwon_T,
  "서귀포시T": region_Seogwipo_T,
  "애월읍T": region_Aewol_T,
  "안덕면T": region_Andeok_T,
  "제주시T": region_Jeju_T,
  "조천읍T": region_Jocheon_T,

  "남원읍F": region_Namwon_F,
  "서귀포시F": region_Seogwipo_F,
  "애월읍F": region_Aewol_F,
  "안덕면F": region_Andeok_F,
  "제주시F": region_Jeju_F,
  "조천읍F": region_Jocheon_F
}

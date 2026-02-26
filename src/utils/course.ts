import type { Database } from "@/types/supabase";

export const getCourseName = (
  course: Database["public"]["Enums"]["course_type"],
): string => {
  switch (course) {
    case "FRONTEND":
      return "프론트엔드";
    case "BACKEND":
      return "백엔드";
    case "DESIGN":
      return "디자인";
  }
};

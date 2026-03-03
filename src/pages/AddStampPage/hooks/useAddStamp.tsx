import type { AddPhoto } from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";
import { addPlaces } from "@/services/placeService";
import { useUser } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/components/common/Toast/ToastStore";

export default function useAddStamp() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const region = searchParams.get("region");

  const [photo, setPhoto] = useState<AddPhoto | null>(null);
  const [description, setDescription] = useState("");

  const { id: userId } = useUser();

  const addToast = useToastStore((state) => state.addToast);

  const handlePhotoChange = (photo: AddPhoto | null) => {
    if (photo) {
      setPhoto(photo);
    } else {
      setPhoto(null);
    }
  };

  const handleAddStamp = async () => {
    if (!photo || !description) {
      return;
    }
    if (!region) {
      addToast("지역 정보가 필요합니다", "", "warning");
      return;
    }

    if (!userId) {
      addToast("로그인 후 이용해주세요", "", "warning");
      return;
    }

    try {
      await addPlaces({
        region,
        file: photo.file,
        description,
        user_id: userId,
      });

      addToast("저장되었습니다", "", "success");
      navigate(-1);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "저장 중 오류가 발생했습니다.";

      addToast(message, "", "error");
    }
  };

  return {
    region,
    photo,
    description,
    handlePhotoChange,
    setDescription,
    handleAddStamp,
  };
}

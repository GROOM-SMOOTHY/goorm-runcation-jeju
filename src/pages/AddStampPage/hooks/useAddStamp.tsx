import type { AddPhoto } from "@/components/pages/Stamp/AddStampPicture/AddStampPicture";
import { addPlaces } from "@/services/placeService";
import { useUser } from "@/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAddStamp() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const region = searchParams.get("region");

  const [photo, setPhoto] = useState<AddPhoto | null>(null);
  const [description, setDescription] = useState("");

  const { id: userId } = useUser();

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

    if (!userId) {
      alert("로그인 후 이용해주세요");
      return;
    }

    try {
      await addPlaces({
        region,
        file: photo.file,
        description,
        user_id: userId,
      });

      alert("저장되었습니다");
      navigate(-1);
    } catch (error) {
      alert((error as Error).message);
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

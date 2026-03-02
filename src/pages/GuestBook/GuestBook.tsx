import styles from "@/pages/GuestBook/GuestBook.module.css";

import Header from "@/components/layout/Header/Header";
import Button from "@/components/common/Button/Button";
import AddPicture from "@/components/pages/guestbook/AddPicture/AddPicture";

import { useEffect, useState } from "react";
import { uploadImage } from "@/utils/supabase/storage";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/store";

import Textarea from "@/components/common/Textarea/Textarea";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "@/components/common/Toast/ToastStore";

export default function GuestBook() {
  const [images, setImages] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const { id: userId } = useUser();

  const navigate = useNavigate();

  const addToast = useToastStore((state) => state.addToast);

  const onAdd = (data: { url: string; file: File }) => {
    if (files.length >= 4) return;
    setImages((prev) => [...prev, data.url]);
    setFiles((prev) => [...prev, data.file]);
  };

  const onRemove = (index: number) => {
    const targetUrl = images[index];

    if (targetUrl) {
      URL.revokeObjectURL(targetUrl);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onClick = async () => {
    if (!userId) {
      addToast("로그인이 필요합니다", "warning");
      return;
    }

    if (files.length === 0) {
      addToast("사진을 최소 1장 이상 첨부해주세요", "warning");
      return;
    }

    if (content.trim() === "") {
      addToast("내용을 입력해주세요", "warning");
      return;
    }

    try {
      const { data: member, error: memberError } = await supabase
        .from("group_members")
        .select("group_id")
        .eq("user_id", userId)
        .single();

      if (memberError || !member?.group_id) {
        addToast("그룹 정보를 찾을 수 없습니다", "warning");
        return;
      }

      const currentGroupId = member.group_id;

      const { data: post, error: postError } = await supabase
        .from("guestbook_posts")
        .insert({
          author_id: userId,
          group_id: currentGroupId,
          content: content,
        })
        .select()
        .single();

      if (postError || !post) throw postError;

      const uploadUrls = await Promise.all(
        files.map((file) => uploadImage("images", file)),
      );

      if (uploadUrls.some((url) => url === null)) {
        await supabase.from("guestbook_posts").delete().eq("id", post.id);

        throw new Error("일부 이미지 업로드에 실패했습니다.");
      }

      const validUrls = uploadUrls as string[];

      const photoRows = validUrls.map((url, index) => ({
        image_url: url,
        content_id: post.id,
        order: index,
        type: "place",
      }));

      const { error: photoError } = await supabase
        .from("photos")
        .insert(photoRows);

      if (photoError) {
        // photos 저장 실패 시 게시글 롤백
        await supabase.from("guestbook_posts").delete().eq("id", post.id);

        throw photoError;
      }

      addToast("방명록이 등록되었습니다", "success");
      navigate(-1);
    } catch (err) {
      console.error(err);
      addToast("등록 중 오류가 발생했습니다", "error");
    }
  };

  useEffect(() => {
    return () => {
      setImages([]);
      setFiles([]);
      setContent("");
    };
  }, []);

  return (
    <div className={styles.container}>
      <Header title="방명록" onBack={() => navigate(-1)} />

      <div className={styles.box}>
        <div className={styles.desc}>
          <Textarea
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="어느 장소에서 어떤 일을 했나요?"
          />
        </div>

        <AddPicture images={images} onAdd={onAdd} onRemove={onRemove} />
      </div>

      <div className={styles.botNav}>
        <Button type="button" onClick={onClick}>
          방명록 등록하기
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import Header from "@/components/layout/Header/Header";
import {
  getGuestBookDetail,
  type GuestBookDetail,
} from "@/services/guestBookService";
import { getCourseName } from "@/utils/course";
import styles from "./styles.module.css";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80";

export default function GuestBookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<GuestBookDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getGuestBookDetail(id).then((data) => {
      setPost(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header title="방명록 상세" onBack={() => navigate(-1)} />
        <div className={styles.loading}>불러오는 중...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.page}>
        <Header title="방명록 상세" onBack={() => navigate(-1)} />
        <div className={styles.error}>방명록을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const mainImage = post.photos[0]?.image_url ?? PLACEHOLDER_IMAGE;
  const authorName = post.author?.nickname ?? "익명";
  const course = post.group?.course ?? "FRONTEND";
  const generation = post.group?.batch ?? 0;

  const createdAt = post.created_at
    ? format(new Date(post.created_at), "yyyy년 M월 d일", { locale: ko })
    : "";

  return (
    <div className={styles.page}>
      <Header title="방명록 상세" onBack={() => navigate(-1)} />

      <main
        className={styles.container}
        tabIndex={0}
        role="region"
        aria-label="방명록 상세 콘텐츠"
      >
        <section
          className={styles.hero}
          style={{
            backgroundImage: `url(${mainImage})`,
          }}
        >
          <div className={styles.heroOverlay} />

          <div className={styles.heroMeta}>
            <span className={styles.badge}>
              {getCourseName(course)} {generation}기
            </span>

            {createdAt && <span className={styles.date}>{createdAt}</span>}
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.authorRow}>
            <h2 className={styles.authorName}>{authorName}님</h2>
          </div>

          <p className={styles.text}>{post.content}</p>
        </section>

        {post.photos.length > 1 && (
          <section className={styles.gallery}>
            <h3 className={styles.galleryTitle}>사진</h3>

            <div className={styles.galleryGrid}>
              {post.photos.map((photo) => (
                <div key={photo.id} className={styles.galleryItem}>
                  <img
                    src={photo.image_url ?? ""}
                    alt="방명록 사진"
                    className={styles.galleryImage}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

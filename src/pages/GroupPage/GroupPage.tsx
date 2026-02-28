import Header from "@/components/layout/Header/Header";
import styles from "./styles.module.css";
import GroupCardButton from "@/components/pages/group-list-page/GroupCardButton/GroupCardButton";
import JoinCourseItem from "@/components/pages/group-list-page/JoinCourseItem";
import CreateGroupModal from "@/components/pages/group-list-page/CreateGroupModal/CreateGroupModal";
import { useUser } from "@/store/useUser";
import { useNavigate } from "react-router-dom";
import { useGroupPage } from "./useGroupPage";
import { fetchCurrentWeather } from "@/api/weather";
import { useState, useEffect } from "react";

export default function GroupPage() {
  const navigate = useNavigate();
  const user = useUser((s) => s.data);

  const {
    groups,
    openCreateGroupModal,
    handleCreateGroup,
    handleJoinGroup,
    closeCreateGroupModal,
    BottomSheet,
  } = useGroupPage();

  const [weather, setWeather] = useState("로딩중");

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const lat = 33.4996;
        const lon = 126.5312;

        const result = await fetchCurrentWeather(lat, lon);

        setWeather(result.description);
      } catch (error) {
        console.log(error);
        setWeather("정보 없음");
      }
    };
    loadWeather();
  }, []);

  return (
    <>
      <Header title="그룹" />

      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.hello}>Hello, Nomad</span>
            <span className={styles.title}>
              {user.nickname}님,
              <br />
              오늘의 제주는 <span className={styles.highlight}>{weather}</span>
            </span>
          </div>
          <div className={styles.content}>
            <GroupCardButton
              type="create"
              onClick={handleCreateGroup}
              label="Create"
              title="그룹 생성"
            />
            <GroupCardButton
              type="join"
              onClick={handleJoinGroup}
              label="Join"
              title="그룹 참여"
            />
          </div>
        </div>

        <div className={styles.groupListContainer}>
          <p className={styles.groupListTitle}>지금 활발한 그룹들</p>

          <div className={styles.groupList}>
            {groups.map((group) => (
              <JoinCourseItem
                key={group.id}
                course={group.course}
                participants={0}
                generation={group.batch ?? 1}
                onClick={() => navigate(`/group/join/${group.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <CreateGroupModal
        open={openCreateGroupModal}
        onClose={closeCreateGroupModal}
      />
      <BottomSheet />
    </>
  );
}

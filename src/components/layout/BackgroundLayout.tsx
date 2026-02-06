import { Outlet } from "react-router-dom";
import styles from "@/components/layout/BackgroundLayout.module.css";
import { FaDownload, FaGithub } from "react-icons/fa";

// 소셜 아이콘 배열
const socialIcons = [FaGithub, "노션"];

const BackgroundLayout = () => {
  return (
    <div className={styles.background}>
      {/* 소개 섹션 */}
      <div className={styles.about}>
        <p className={styles.highlight}>Group-based Travel Experience</p>
        <h1 className={styles.title}>SMOOTHY</h1>
        <p className={styles.subtitle}>
          <span>GROUP</span> · <span>JOURNEY</span> · <span>STAMP</span>
        </p>

        {/* 버튼 섹션 */}
        <div className={styles.downloadButtons}>
          <a href="#" className={styles.appButton}>
            <FaDownload className={styles.icon} /> 앱 다운로드
          </a>
        </div>

        {/* 소셜 아이콘 */}
        <div className={styles.socialIcons}>
          {socialIcons.map((Icon, index) => (
            <Icon key={index} className={styles.socialIcon} />
          ))}
        </div>

        {/* 소개 텍스트 */}
        <p className={styles.footerText}>
          우리는 구름 DEEP DIVE에서 함께 협업하며 하나의 서비스를 완성하는 학습 기반 프로젝트 팀입니다.<br/>  
          각자 다른 배경과 강점을 가진 팀원들이 모여, 사용자에게 실질적이고 가치 있는 경험을 제공하는 것을 목표로 개발했습니다.
          이번 프로젝트를 통해 우리는 기술 역량뿐 아니라 소통, 문제 해결, 역할 분담, 협업에 대한<br/>
          깊은 이해를 쌓고 있습니다.   
          기수와 팀이 달라도, 모두가 같은 목표 아래 더 나은 서비스를 만들어가기 위해 함께 성장하고 있습니다.<br/>  

        </p>
      </div>

      {/* Outlet 렌더링 영역 */}
      <div className={styles.frame}>
        <Outlet />
      </div>
    </div>
  );
};

export default BackgroundLayout;

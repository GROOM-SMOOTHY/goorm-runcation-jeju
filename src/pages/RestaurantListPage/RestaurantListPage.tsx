import Header from "@/components/layout/Header/Header";
import BottomNavigation from "@/components/common/BottomNavigation/BottomNavigation";
import styles from "@/pages/RestaurantListPage/RestaurantListPage.module.css";
import { useNavigate } from "react-router-dom";


export default function RestaurantListPage() {
    const navigate = useNavigate();

    return(
        <div className={styles.page}>
            <Header title="맛집 상세" onBack={() => navigate(-1)} />
            <div className={styles.main}>
            
            </div>
            <div className={styles.bottomNavWrap}>
                <BottomNavigation />
            </div>
        </div>
    )
}
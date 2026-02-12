import "@/components/BottomNavigation/buttonNavigation.css";
import { AiOutlineHome } from "react-icons/ai";
import { BiMapPin } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";

export default function ButtonNavigation() {
  return (
    <nav className="button-navigation">
      <div className="nav-item home">
        <AiOutlineHome size={20} />
        <span>홈</span>
      </div>
      <div className="nav-item pin">
        <BiMapPin size={20} />
        <span>도장깨기</span>
      </div>
      <div className="nav-item payment">
        <MdOutlinePayments size={32} />
      </div>
      <div className="nav-item wallet">
        <BiWallet size={20} />
        <span>정산현황</span>
      </div>
      <div className="nav-item person">
        <BsPerson size={20} />
        <span>마이</span>
      </div>
    </nav>
  );
}

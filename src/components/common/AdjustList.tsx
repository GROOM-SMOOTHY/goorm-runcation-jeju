import ListIcon from "../../assets/List/List.png";
import "./AdjustList.css"

interface AdjustListProps {
  date: string;
  content: string;
  decide: "완료" | "미완료"
}
const check = {
  "미완료" : {background: "#FFEAD2", color: "#FF6F6F"},
  "완료" : {background: "#E1ECFF", color: "#6FA4FF"}
}

function AdjustList({date, content, decide}: AdjustListProps) {
  
  const statusDecide = check[decide]
  return (
    <div className="adjust-list" style={{
      backgroundColor: statusDecide?.background
    }}>
      <div className="right">
        <span>{date}</span>
      </div>
      <div>
        <span>|</span>
      </div>
      <div className="center">
        <img className="circle" src={ListIcon} alt="list-icon"/>
        <span>{content}</span>
      </div>
      <div>
        <span>|</span>
      </div>
      <div className="left">
        <span className="block" style={{
          backgroundColor: statusDecide?.color
        }}>{decide}</span>
      </div>
    </div>
  );
}

export default AdjustList;
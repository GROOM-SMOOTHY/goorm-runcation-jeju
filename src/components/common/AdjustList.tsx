import ListIcon from "../../assets/List/List.png";
import "./AdjustList.css"

interface AdjustListProps {
  date: string;
  content: string;
  decide: "완료" | "미완료"
}

function AdjustList({date, content, decide}: AdjustListProps) {
  const check = [
    { id: "미완료", background: "#FFEAD2", color: "#FF6F6F" },
    { id: "완료", background: "#E1ECFF", color: "#6FA4FF"  }
  ]
  const num = check.find(number => number.id===decide)
  return (
    <div className="adjust-list" style={{
      backgroundColor: num?.background
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
          backgroundColor: num?.color
        }}>{decide}</span>
      </div>
    </div>
  );
}

export default AdjustList;


import ListIcon from "../../assets/List/List.png";
import "./AdjustList.css"

function AdjustList(props) {
  const check = [
    { id: "미완료", background: "#FFEAD2", color: "#FF6F6F" },
    { id: "완료", background: "#E1ECFF", color: "#6FA4FF"  }
  ]
  const num = check.find(number => number.id===props.decide)

  return (
    <div>
      <List date={props.date} content={props.content} decide={props.decide}
      backgroundColor={num?.background} color={num?.color}/>
    </div>
  );
}

export default AdjustList;

function List(props) {
  return (
    <div className="adjust-list" style={{
      backgroundColor: props.backgroundColor
    }}>
      <div className="right">
        <span>{props.date}</span>
      </div>
      <div>
        <span>|</span>
      </div>
      <div className="center">
        <img className="circle" src={ListIcon} alt="list-icon"/>
        <span>{props.content}</span>
      </div>
      <div>
        <span>|</span>
      </div>
      <div className="left">
        <span className="block" style={{
          backgroundColor: props.color
        }}>{props.decide}</span>
      </div>
    </div>
  )
}

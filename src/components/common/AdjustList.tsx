import ListIcon from "../../assets/List/List.png";
import "./AdjustList.css"

/**
 * Renders a horizontal list item showing a date, an icon with content, and a status badge whose colors reflect the provided decision.
 *
 * The `decide` prop maps to preset background and text colors ("미완료" -> peach tones, "완료" -> blue tones); if `decide` does not match a preset, no colors are applied.
 *
 * @param props.date - The date text to display on the right side
 * @param props.content - The main content text shown next to the icon
 * @param props.decide - The status label shown in the badge (expected values: "미완료" or "완료")
 * @returns A React element representing the styled list item
 */
function AdjustList(props) {
  const check = [
    { id: "미완료", background: "#FFEAD2", color: "#FF6F6F" },
    { id: "완료", background: "#E1ECFF", color: "#6FA4FF"  }
  ]
  const num = check.find(number => number.id===props.decide)
  return (
    <div className="adjust-list" style={{
      backgroundColor: num?.background
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
          backgroundColor: num?.color
        }}>{props.decide}</span>
      </div>
    </div>
  );
}

export default AdjustList;

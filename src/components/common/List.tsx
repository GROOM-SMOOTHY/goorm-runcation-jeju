import React from "react";
import ListIcon from "../../assets/List/List.png";
import "../../styles/ListIcon.css"

type ListVariant = "done" | "yet"

interface ListItemProps {
    date: string;         // 2025.12.09
    title: string;        // 제주 해장국
    status: ListVariant;  // done | yet
}

interface BadgeProps {
    status: ListVariant;
}
interface StickProps {
    status: ListVariant;
}
const Stick = ({status}: StickProps) => {
    const isDone = status === "done";
    return (
        <div style={{ 
            width: "1.5px", 
            height: "18px", 
            backgroundColor: isDone ? "#A4B5FF" : "#FFAEAE",
            }}>
        </div>
    )
}

const Badge = ({status}: BadgeProps) => {
    const isDone = status === "done";
    return (
        <div style={{
            width: "52px", 
            height: "22px", 
            backgroundColor: isDone ? "#6FA4FF" : "#FF6F6F",
            display: "flex",
            justifyContent: "center", 
            alignItems: "center", 
            borderRadius: "5px",

        }}>
            <span style={{ 
                color: "#FFFFFF", 
                fontWeight: 400, 
                fontSize: "13px",   
                marginTop: "2px"
                }}>
                {isDone ? "완료" : "미완료"}
            </span>
        </div>
    )
}

const ListItem: React.FC<ListItemProps> = ({ date, title, status }) => {
     return (
        <div className={`main ${status}`}>

            <div className="date">
                <span>{date}</span>
            </div>
            <Stick status={status}/>
            <div className="title">
                <div>
                    <img src={ListIcon} />
                </div>
                 <span>{title}</span>
            </div>
            <Stick status={status}/>
            <div className="badge">
                <Badge status={status}/>
            </div>
        </div>
    );
}

export default ListItem

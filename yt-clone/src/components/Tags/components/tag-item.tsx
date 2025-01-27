import { useState } from "react";
import "./tag-item.css";

interface ITageItemProps {
  text: string;
}

function TagItem(props: ITageItemProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <a
      href=""
      className={`-items ${isActive ? "-active" : ""}`}
      onFocus={() => {
        setIsActive(true);
      }}
      onBlur={() => {
        setIsActive(false);
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      {props.text}
    </a>
  );
}

export default TagItem;

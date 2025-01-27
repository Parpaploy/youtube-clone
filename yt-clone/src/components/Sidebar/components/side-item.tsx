import "./side-item.css";

interface ISideBarItemProps {
  icon: string;
  text: string;
}

function SideBarItem(props: ISideBarItemProps) {
  return (
    <a href="#!" className="-item">
      <div className="-icon">
        <img src={props.icon} />
      </div>
      <div className="-text">{props.text}</div>
    </a>
  );
}

export default SideBarItem;

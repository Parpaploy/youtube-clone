import "./side-subscribe-item.css";

function SideSubscribeItem({ content }) {
  return (
    <>
      <a href="#!" className="-sub-item">
        <div className="-icon">
          <img src={content.channel_profile_picture} />
        </div>
        <div className="-text">{content.channel_name}</div>
        <div className="-status">on</div>
      </a>
    </>
  );
}

export default SideSubscribeItem;

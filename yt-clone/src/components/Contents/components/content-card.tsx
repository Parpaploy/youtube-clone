import "./content-card.css";

interface IContentCardProps {
  thumbImage: string;
  channelImage: string;
  title: string;
  channel: string;
  view: string;
}

// function ContentCard(props: IContentCardProps) {
//   return (
//     <div className="card">
//       <div className="-thumb">
//         <img src={props.thumbImage} />
//       </div>
//       <div className="-about">
//         <div className="-channel-img">
//           <img src={props.channelImage} />
//         </div>
//         <div className="-detail">
//           <div className="-title">{props.title}</div>
//           <div className="-channel">{props.channel}</div>
//           <div className="-view">{props.view}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

function ContentCard({ content }) {
  const convertPublishDate = (date) => {
    const publishDate = new Date(date);
    const today = new Date();
    const differenceTime = today.getTime() - publishDate.getTime();
    const diferenceDay = Math.round(differenceTime / 86400000);
    return diferenceDay;
  };

  const convertView = (viewCount: number) => {
    let textViewCount = "";

    if (viewCount >= 1000 && viewCount < 10000) {
      viewCount /= 1000;
      textViewCount = viewCount + " พัน ครั้ง";
    } else if (viewCount >= 10000 && viewCount < 100000) {
      viewCount /= 10000;
      textViewCount = viewCount + " หมื่น ครั้ง";
    } else if (viewCount >= 100000 && viewCount < 1000000) {
      viewCount /= 100000;
      textViewCount = viewCount + " แสน ครั้ง";
    } else if (viewCount >= 1000000) {
      viewCount /= 1000000;
      textViewCount = viewCount + " ล้าน ครั้ง";
    } else {
      textViewCount = viewCount + " ครั้ง";
    }
    return textViewCount;
  };

  return (
    <div className="card">
      <div className="-thumb">
        <img src={content.video_thumbnail} />
      </div>
      <div className="-about">
        <div className="-channel-img">
          <img src={content.channel_profile_picture} />
        </div>
        <div className="-detail">
          <div className="-title">{content.video_title}</div>
          <div className="-channel">{content.channel_name}</div>
          <div className="-view">
            การดู {convertView(content.view_count)} •{" "}
            {convertPublishDate(content.video_created_at)} วันที่ผ่านมา
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCard;

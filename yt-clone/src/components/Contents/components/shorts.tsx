import "./shorts.css";

interface IShortsProps {
  thumbImage: string;
  title: string;
  view: string;
}

// function Shorts(props: IShortsProps) {
//   return (
//     <div className="short">
//       <div className="-thumb">
//         <img src={props.thumbImage} />
//       </div>

//       <div className="-about">
//         <div className="-detail">
//           <div className="-title">{props.title}</div>
//           <div className="-view">{props.view}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

function Shorts({ content }) {
  const convertView = (viewCount: number) => {
    let textViewCount = "";

    if (viewCount >= 1000 && viewCount < 10000) {
      viewCount /= 1000;
      textViewCount = viewCount + " พันครั้ง";
    } else if (viewCount >= 10000 && viewCount < 100000) {
      viewCount /= 10000;
      textViewCount = viewCount + " หมื่นครั้ง";
    } else if (viewCount >= 100000 && viewCount < 1000000) {
      viewCount /= 100000;
      textViewCount = viewCount + " แสนครั้ง";
    } else if (viewCount >= 1000000) {
      viewCount /= 1000000;
      textViewCount = viewCount + " ล้านครั้ง";
    } else {
      textViewCount = viewCount + " ครั้ง";
    }
    return textViewCount;
  };

  return (
    <div className="short">
      <div className="-thumb">
        <img src={content.video_thumbnail} />
      </div>

      <div className="-about">
        <div className="-detail">
          <div className="-title">{content.video_title}</div>
          <div className="-view">การดู {convertView(content.view_count)}</div>
        </div>
      </div>
    </div>
  );
}

export default Shorts;

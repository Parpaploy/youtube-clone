import "./content.css";
import Tags from "../Tags/tags";
import ContentCard from "./components/content-card";
import Shorts from "./components/shorts";
import { useEffect, useState } from "react";

function Content() {
  const [videos, setVideos] = useState([]);
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await fetch("http://localhost:3000/");
      const json = await data.json();
      setVideos(json);
    };

    const fetchShorts = async () => {
      const data = await fetch("http://localhost:3000/short");
      const json = await data.json();
      setShorts(json);
    };
    fetchVideos();
    fetchShorts();
  }, []);

  return (
    <>
      <section id="content">
        <Tags />
        <section id="the-cards">
          {videos.map((video, index) => (
            <ContentCard key={index} content={video} />
          ))}
        </section>

        <section id="shorts">
          <div className="-section-title">[] Shorts</div>
          <div className="-shorts-wrap">
            {" "}
            {shorts.map((short, index) => (
              <Shorts key={index} content={short} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default Content;

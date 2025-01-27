import { useEffect, useState } from "react";
import SideBarItem from "./components/side-item";
import SideSubscribeItem from "./components/side-subscribe-item";
import "./sidebar.css";

function SideBar() {
  const [subscribes, setSubscribes] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const data = await fetch("http://localhost:3000/subscribe?user_id=2");
      const json = await data.json();
      setSubscribes(json);
    };

    fetchChannel();
  }, []);

  return (
    <>
      <section id="side">
        <div className="-side-pmr">
          <SideBarItem icon="https://placehold.co/24x24" text="หน้าแรก" />
          <SideBarItem icon="https://placehold.co/24x24" text="Shorts" />
          <SideBarItem icon="https://placehold.co/24x24" text="การติดตาม" />
          <SideBarItem icon="https://placehold.co/24x24" text="YouTube Music" />
        </div>

        <div className="-side-sec">
          <div className="-sub-header">{"คุณ >"}</div>
          <SideBarItem
            icon="https://placehold.co/24x24"
            text="ประวัติการเข้าชม"
          />
          <SideBarItem icon="https://placehold.co/24x24" text="เพลย์ลิสต์" />
          <SideBarItem icon="https://placehold.co/24x24" text="วิดีโอของคุณ" />
          <SideBarItem icon="https://placehold.co/24x24" text="ดูภายหลัง" />
          <SideBarItem icon="https://placehold.co/24x24" text="วิดีโอที่ชอบ" />
          <SideBarItem icon="https://placehold.co/24x24" text="การดาวน์โหลด" />
        </div>

        <div className="-subscribe-info">
          <div className="-sub-header">การติดตาม </div>
          {subscribes.map((subscribe, index) => (
            <SideSubscribeItem key={index} content={subscribe} />
          ))}
        </div>

        <div className="-sub-info">
          <div className="-sub-header">สำรวจ </div>
          <SideBarItem icon="https://placehold.co/24x24" text="มาแรง" />
          <SideBarItem icon="https://placehold.co/24x24" text="เพลง" />
          <SideBarItem icon="https://placehold.co/24x24" text="เกม" />
          <SideBarItem icon="https://placehold.co/24x24" text="ข่าวสาร" />
          <SideBarItem icon="https://placehold.co/24x24" text="กีฬา" />
          <SideBarItem icon="https://placehold.co/24x24" text="เล่นเกม" />
        </div>

        <div className="-sub-info">
          <div className="-sub-header">เพิ่มเติมจาก YouTube</div>
          <SideBarItem
            icon="https://placehold.co/24x24"
            text="YouTube Studio"
          />
          <SideBarItem icon="https://placehold.co/24x24" text="YouTube Music" />
          <SideBarItem icon="https://placehold.co/24x24" text="YouTube Kids" />
          <div className="-border" />
          <SideBarItem icon="https://placehold.co/24x24" text="การตั้งค่า" />
          <SideBarItem icon="https://placehold.co/24x24" text="ประวัติรายงาน" />
          <SideBarItem icon="https://placehold.co/24x24" text="ความช่วยเหลือ" />
          <SideBarItem
            icon="https://placehold.co/24x24"
            text="ส่งความคิดเห็น"
          />
        </div>

        <div className="-end-link">
          <div className="-pmr-link">
            <a className="-guide-link" href="">
              เกี่ยวกับ
            </a>
            <a className="-guide-link" href="">
              สื่อ
            </a>
            <a className="-guide-link" href="">
              ลิขสิทธิ์
            </a>
            <a className="-guide-link" href="">
              ติดต่อเรา
            </a>
            <a className="-guide-link" href="">
              ครีเอเตอร์
            </a>
            <a className="-guide-link" href="">
              โฆษณา
            </a>
            <a className="-guide-link" href="">
              นักพัฒนาซอฟต์แวร์
            </a>
          </div>

          <div className="-sdr-link">
            <a className="-guide-link" href="">
              ข้อกำหนด
            </a>
            <a className="-guide-link" href="">
              ความเป็นส่วนตัว
            </a>
            <a className="-guide-link" href="">
              นโยบายและความปลอดภัย
            </a>
            <a className="-guide-link" href="">
              วิธีการทำงานของ YouTube
            </a>
            <a className="-guide-link" href="">
              ทดลองใช้ฟีเจอร์ใหม่
            </a>
          </div>

          <div className="-copy-right">© 2025 Google LLC</div>
        </div>
      </section>
    </>
  );
}

export default SideBar;

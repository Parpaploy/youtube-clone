import { useNavigate } from "react-router-dom";
import SearchBox from "../Search/search-box";
import "./nav.css";

function NavBar() {
  const navigate = useNavigate();
  const GoBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <section id="nav">
        <div className="-brand">
          <div className="-ham">
            <img src="https://placehold.co/24x24" />
          </div>
          <div
            className="-logo"
            onClick={() => {
              GoBackHome();
            }}
          >
            <img src="https://placehold.co/97x20" />
          </div>
        </div>

        <SearchBox />

        <div className="-end">
          <div className="-end-item -create">x</div>
          <div className="-end-item">x</div>
          <div className="-end-item">x</div>
        </div>
      </section>
    </>
  );
}

export default NavBar;

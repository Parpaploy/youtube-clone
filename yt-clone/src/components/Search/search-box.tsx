import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const qp = new URLSearchParams({
      search_params: query,
    });
    console.log(`/result?${qp.toString()} : result`);
    navigate(`/result?${qp.toString()}`);
  };

  return (
    <>
      <form className="-center">
        <div className="-search">
          <div className="-search-box">
            <input
              type="text"
              className="-search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          <button
            className="-btn"
            onClick={() => {
              handleSearch();
            }}
          >
            Q
          </button>
        </div>
        <div className="-voice"></div>
      </form>
    </>
  );
}

export default SearchBox;

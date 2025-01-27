import "./search-layout.css";
import NavBar from "../components/Nav/nav";
import SideBar from "../components/Sidebar/sidebar";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchCard from "../components/Search/search-card";
import axios from "axios";

function SearchLayout() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  const [searchResult, setSearchResult] = useState([]);

  // const testFetch = async () => {
  //   console.log(searchParams, ":location state");
  //   try {
  //     console.log(query, ": query");
  //     const data = await axios.get(
  //       `http://localhost:3000/result?search_query=${query}`
  //     );
  //     console.log(data, ":axios response");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  useEffect(() => {
    const fetchSearch = async () => {
      try {
        if (query) {
          console.log(query, ": query");
          const data = await fetch(
            `http://localhost:3000/result?search_query=${query}`
          );
          console.log(data, ":data");
          const json = await data.json();
          setSearchResult(json);
          console.log(json);
        } else {
          console.log("Query is undefined or empty");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchSearch();
    console.log(query);
    // testFetch();
  }, [query]);

  return (
    <section id="main-layout">
      <NavBar />
      <SideBar />
      <section id="content">
        <search className="the-cards-search">
          {searchResult.map((result, index) => (
            <SearchCard key={index} content={result} />
          ))}
        </search>
      </section>
    </section>
  );
}

export default SearchLayout;

import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [searchText, setSearchText] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [indCount, setIndCount] = useState(0);
  const [usaCount, setUsaCount] = useState(0);
  const [caCount, setCaCount] = useState(0);
  const [indPercent, setIndPercent] = useState(33);
  const [usaPercent, setUsaPercent] = useState(33);
  const [caPercent, setCaPercent] = useState(33);

  const fetchData = async () => {
    const data = await fetch(
      `https://itunes.apple.com/search?term=${searchText}`
    );
    const json = await data.json();
    console.log(json.results);
    setSearchResults(json.results);
    // getCountryDistribution();
  };

  const getCountryDistribution = () => {
    if (searchResults !== null) {
      const USSongs = searchResults.filter((item) => {
        return item.country === "USA";
      });
      const CASongs = searchResults.filter((item) => {
        return item.country === "CA";
      });
      const INDSongs = searchResults.filter((item) => {
        return item.country === "IND";
      });

      setUsaCount(USSongs.length);
      setCaCount(CASongs.length);
      setIndCount(INDSongs.length);
    }
  };

  const percentages = () => {
    if (searchResults !== null) {
      let total = searchResults.length;
      function setCountryPercentages(countryCount) {
        return (countryCount / total) * 100;
      }
      setCaPercent(setCountryPercentages(caCount));
      setIndPercent(setCountryPercentages(indCount));
      setUsaPercent(setCountryPercentages(usaCount));
    }
    return 33.33;
  };
  console.log(usaCount);
  console.log(percentages(usaCount));

  const setSearch = (e) => {
    setSearchText(e.target.value);
  };

  return searchResults === null ? (
    <div className="App">
      <h1>iTunes Search</h1>
      <input type="text" onChange={setSearch} />
      <input type="button" value="Search" onClick={fetchData} />
      <h2> Results </h2>
      <ol></ol>
    </div>
  ) : (
    <div className="App">
      <h1>iTunes Search</h1>
      <div style={{ display: "flex", margin: "5px" }}>
        <div style={{ padding: "5px", width: "50%", backgroundColor: "red" }}>
          USA
        </div>
        <div style={{ padding: "5px", width: "25%", backgroundColor: "green" }}>
          CA
        </div>
        <div style={{ padding: "5px", width: "25%", backgroundColor: "blue" }}>
          IND
        </div>
      </div>
      <input type="text" onChange={setSearch} />
      <input type="button" value="Search" onClick={fetchData} />
      <h2> Results </h2>
      <ol>
        {searchResults.map((item) => {
          return <li key={item.trackId}>{item.artistName}</li>;
        })}
      </ol>
    </div>
  );
}

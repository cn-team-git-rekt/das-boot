import React from "react";

import "./App.css";
import axios from "axios";


function App() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    const getFixtures = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/fixtures',
          {league: 39, season: 2020, next: 5},
          {'Content-Type': 'text/plain'}
        );

        console.log("Success: ", response);
        setData(response.data.data.response)
      } catch (err) {
        console.log("error: ", err);
      }

    }
    getFixtures();
  }, []);





  return (
    <div className="App">
      <header className="App-header">
        <h1>Premier League</h1>
        <ul>{!data ? "Loading..." : data.map((item, i) => {
          return <li key={i}>{item.teams.home.name}v{item.teams.away.name}</li>
        })}</ul>
      </header>
    </div>
  );
}

export default App;
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
          {league: 39, season: 2020, next: 10},
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
        <h1>FootyForecast</h1>
        <h2> Fixtures</h2>
        <div>{!data ? "Loading..." : data.map((item, i) => {
          return <FixtureCard item ={item} key={item.fixture.id}/>
        })}</div>
      </header>
    </div>
  );
}

const FixtureCard = ({item}) => {
  return(
  <div className="fix-card">
    <p>{item.league.name}</p>
    <h2>{item.teams.home.name} v {item.teams.away.name}</h2>
    <p>Venue: {item.fixture.venue.name} Fixture ID {item.fixture.id}</p>
    <img src={item.teams.home.logo} alt="home-team-logo"/>
    <img src={item.teams.away.logo} alt="away-team-logo"/>
  </div>
  )

}

export default App;
// 
/* <li key={i}></li> */
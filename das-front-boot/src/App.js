import React from "react";

import "./App.css";
import axios from "axios";


function App() {
  const [data, setData] = React.useState(null);
  const [compare, setCompare] = React.useState(null);


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


  
  const getFixtId = async (id) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api-test',
          // {fixture: id},
          {'Content-Type': 'text/plain'}
        );

        console.log("Success: ", response);
        setCompare(response.data.data)
      } catch (err) {
        console.log("error: ", err);
      }
      console.log(`clicked: id = ${id}.... status: ${compare.response.account.firstname}`);
    
  }
  





  return (
    <div className="App">
      <header className="App-header">
        <h1>FootyForecast</h1>
        <h2> Fixtures</h2>
        <div>{!data ? "Loading..." : data.map((item, i) => {
          return <FixtureCard item ={item} key={item.fixture.id} clickFunction={getFixtId}
          />
        })}</div>
      </header>
    </div>
  );
}

const FixtureCard = (props) => {
  return(
  <div className="fix-card" onClick={() => props.clickFunction(props.item.fixture.id)}>
    <p>{props.item.league.name}</p>
    <h2>{props.item.teams.home.name} v {props.item.teams.away.name}</h2>
    <p>Venue: {props.item.fixture.venue.name}, Fixture ID: {props.item.fixture.id}</p>
    <img src={props.item.teams.home.logo} alt="home-team-logo"/>
    <img src={props.item.teams.away.logo} alt="away-team-logo"/>
  </div>
  )

}

export default App;
// 
/* <li key={i}></li> */
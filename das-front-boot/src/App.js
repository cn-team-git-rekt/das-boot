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
          { league: 41, season: 2020, next: 10 },
          { 'Content-Type': 'text/plain' }
        );

        // console.log("Success: ", response);
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
        'http://localhost:5000/predictions',
        { fixture: id },
        { 'Content-Type': 'text/plain' }
      );

      // console.log("Success: ", response);

      setCompare(response.data.data.response);
      console.log(response.data.data.response);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const backButton = () => {
    setData(null);
    console.log("clicked")
  }

  






  return (
    <div className="App">
      <header className="App-header">
        
        <h1>FootyForecast</h1>
      
       {!compare ? <h2> Fixtures</h2> : <h2>Comparison</h2>}
        <div>
          {compare ? compare.map((item, i) => {
            return <ComparePage item={item} key={i} />
          }
          ) : null}
        </div>
        <div>{data && !compare ? data.map((item, i) => {
          return <FixtureCard item={item} key={item.fixture.id} clickFunction={getFixtId} />
        }) : null }</div>

      </header>
    </div>
  );
}

const FixtureCard = (props) => {
  return (
    <div className="fix-card" onClick={() => props.clickFunction(props.item.fixture.id)}>
      <p>{props.item.league.name}</p>
      <h2>{props.item.teams.home.name} v {props.item.teams.away.name}</h2>
      <p>Venue: {props.item.fixture.venue.name}, Fixture ID: {props.item.fixture.id}</p>
      <img src={props.item.teams.home.logo} alt="home-team-logo" />
      <img src={props.item.teams.away.logo} alt="away-team-logo" />
    </div>
  )

}


const ComparePage = (props) => {
  return(
  <div>
    <button>Back</button>
    <img src={props.item.teams.home.logo} alt="home-team-logo"/>
    <img src={props.item.teams.away.logo} alt="away-team-logo"/>
    <h2>{props.item.teams.home.name} v {props.item.teams.away.name}</h2>
    <h3>Probabilty</h3>
    <h2>{props.item.predictions.percent.home}---{props.item.predictions.percent.draw}---{props.item.predictions.percent.away}</h2>
    <h2>H2H</h2>
    <h3>Poisson</h3>
    <h2>{props.item.comparison.poisson_distribution.home}---{props.item.comparison.poisson_distribution.away}</h2>
    <h3>Attacking Strength</h3>
    <h2>{props.item.comparison.att.home}---{props.item.comparison.att.away}</h2>
    <h3>Defensive Strength</h3>
    <h2>{props.item.comparison.def.home}---{props.item.comparison.def.away}</h2>
    <h3>Form</h3>
    <h2>{props.item.comparison.form.home}---{props.item.comparison.form.away}</h2>
    
  </div>
  )
}

export default App;
//
/* <li key={i}></li> */
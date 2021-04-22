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
          { league: 40, season: 2020, next: 15 },
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
    setCompare(null);
    console.log("clicked")
  }

  






  return (
    <div className="App">
      <header className="App-header">
        
        <h1>FootyForecast</h1>
      
       {!compare ? <h2> Fixtures</h2> : <h2>Comparison</h2>}
        <div>
          {compare ? compare.map((item, i) => {
            return <ComparePage item={item} key={i} clickFunc={backButton}/>
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
      <img className="card-league-img" src={props.item.league.logo} alt="league-logo" />
      <div className="fix-card-head">
      <img className="card-img" src={props.item.teams.home.logo} alt="home-team-logo" />
      
      <h2 className="fix-card-game">{props.item.teams.home.name} v {props.item.teams.away.name}</h2>
      <img className="card-img" src={props.item.teams.away.logo} alt="away-team-logo" />
      </div>
      <p className="fix-card-venue">{props.item.fixture.venue.name}</p>
    </div>
  )

}


const ComparePage = (props) => {
  return(
  <div>
    <button onClick={()=> {props.clickFunc()}}>Back</button>
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

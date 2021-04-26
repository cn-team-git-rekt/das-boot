import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [data, setData] = React.useState(null);
  const [compare, setCompare] = React.useState(null);
  const [leagues, setLeagues] = React.useState(39);




  React.useEffect(() => {
    const getFixtures = async (i) => {
      try {
        const response = await axios.post(
          'http://localhost:5000/fixtures',
          { league: i, season: 2020, next: 15 },
          { 'Content-Type': 'text/plain' }
        );

        // console.log("Success: ", response);
        setData(response.data.data.response)
      } catch (err) {
        console.log("error: ", err);
      }

    }
    getFixtures(leagues);
  }, [leagues]);


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
    
  }

  const getLeagues = (i) => {
   
    setLeagues(parseInt(i));
  }










  return (
    <div className="App">
      <header className="App-header">
      <TopNav changeFunc={getLeagues}/>
      </header>
      <body className="body">
      <div>
          {!compare ? <h2> Fixtures</h2> : <h2>Comparison</h2>}
        </div>
        <div>
          {compare ? compare.map((item, i) => {
            return <ComparePage item={item} key={i} clickFunc={backButton} />
          }
          ) : null}
        </div>
        <div>{data && !compare ? data.map((item, i) => {
          return <FixtureCard className="cards" item={item} key={item.fixture.id} clickFunction={getFixtId} />
        }) : null}</div>
      </body>

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



const TopNav = (props) => {
  return (
    <Navbar collapseOnSelect className="navbar" fixed="top" expand="lg" bg="dark" variant="dark" props={props}>
      <Navbar.Brand href="#home">footyForecast</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">MyAccount</Nav.Link>

          <NavDropdown title="League" id="collasible-nav-dropdown" onSelect={props.changeFunc}>
            <NavDropdown.Item href="#action/3.1" eventKey={39}>Premier League</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" eventKey={40}>Championship</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3" eventKey={41}>League One</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4" eventKey={42}>League Two</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.5" eventKey={140}>La Liga</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.6" eventKey={135}>Seria A</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.7" eventKey={78}>Bundesliga</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.8" eventKey={61}>French Ligue 1</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">More Leagues</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#pricing">Trending</Nav.Link>
          <Nav.Link href="#deets">My Games</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            About
      </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}



const ComparePage = (props) => {
  return (
    <div>

      <div className="comp-head">
        <img className="comp-img-logo" src={props.item.teams.home.logo} alt="home-team-logo" />
        <img className="comp-img-logo" src={props.item.teams.away.logo} alt="away-team-logo" />
      </div>
      <h1 className="compare-game">{props.item.teams.home.name} v {props.item.teams.away.name}</h1>
      <h2>{props.item.comparison.poisson_distribution.home} Probability {props.item.comparison.poisson_distribution.away}</h2>

      <h2>{props.item.teams.home.league.goals.for.average.home} Goal Expectency {props.item.teams.away.league.goals.for.average.away}</h2>
      <h2>H2H Strengths</h2>

      <h2>{props.item.comparison.att.home} Attacking {props.item.comparison.att.away}</h2>

      <h2>{props.item.comparison.def.home} Defensive {props.item.comparison.def.away}</h2>

      <h2>{props.item.comparison.goals.home} Goals   {props.item.comparison.goals.away}</h2>

      <h2>{props.item.comparison.form.home}  Form    {props.item.comparison.form.away}</h2>
      <button onClick={() => { props.clickFunc() }}>Back</button>
    </div>
  )
}

export default App;

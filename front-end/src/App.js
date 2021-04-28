import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import {ComparePage} from './Components/ComparePage';
import {FixtureCard} from './Components/FixtureCard';
import {TopNav} from './Components/TopNav';





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
        <TopNav changeFunc={getLeagues} />
      </header>
      <body className="body">
        <div>
          {!compare ? <h2> Fixtures</h2> : <h2>Comparison</h2>}
        </div>
        <div>
          {compare ? compare.map((item, i) => {
            return <ComparePage item={item} key={i} clickFunc={backButton}  />
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

export default App;

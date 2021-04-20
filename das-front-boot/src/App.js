import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";


function App() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    const headers = {
      'Content-Type': 'text/plain'
      };

    const getFixtures = async () => {
      await axios.post(
        'http://localhost:5000/fixtures',
        {
          league: "40",
          season: "2021",
          next: "5",
        },
        { headers }
      ).then(response => {
        console.log("Success ========>", response);
        setData(response.data.response)
      })
        .catch(error => {
          console.log("Error ========>", error);

        })

    }
    getFixtures();
  })





  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>{!data ? "Loading..." : data.map((item, i) => {
          return <li key={i}>{item.id}</li>
        })}</ul>
      </header>
    </div>
  );
}

export default App;
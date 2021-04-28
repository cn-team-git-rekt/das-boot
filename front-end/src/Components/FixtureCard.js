export const FixtureCard = (props) => {
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


import ApexChart from './ApexCart'

export const ComparePage = (props) => {
    return (
      <div>
        <div className="comp-head">
          <img className="comp-img-logo" src={props.item.teams.home.logo} alt="home-team-logo" />
          <img className="comp-img-logo" src={props.item.teams.away.logo} alt="away-team-logo" />
        </div>
        <div className="comp-body">
          <h1 className="compare-game">{props.item.teams.home.name} v {props.item.teams.away.name}</h1>
          {/* <ApexChart props={props} /> */}
          <h2>{props.item.comparison.poisson_distribution.home} Probability {props.item.comparison.poisson_distribution.away}</h2>
  
          <h2>{props.item.teams.home.league.goals.for.average.home} Goal Expectency {props.item.teams.away.league.goals.for.average.away}</h2>
          <h2>H2H Strengths</h2>
  
          <h2>{props.item.comparison.att.home} Attacking {props.item.comparison.att.away}</h2>
  
          <h2>{props.item.comparison.def.home} Defensive {props.item.comparison.def.away}</h2>
  
          <h2>{props.item.comparison.goals.home} Goals   {props.item.comparison.goals.away}</h2>
  
          <h2>{props.item.comparison.form.home}  Form    {props.item.comparison.form.away}</h2>
          <button onClick={() => { props.clickFunc() }}>Back</button>
        </div>
      </div>
    )
  }

 
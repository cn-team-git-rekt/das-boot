import React from "react";
import ReactApexChart from 'react-apexcharts';

export class ApexChart extends React.Component {
    constructor(props) {
      super(props);
  
      console.log(props)
  
      this.state = {
  
        series: [45,55],
        options: {
          chart: {
            type: 'donut',
          },
          labels: ['Home Team', 'Away Team'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 250
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
  
  
      };
  
    }
  
   
    render() {
      return (
  
  
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
        </div>
  
  
      );
    }
  }
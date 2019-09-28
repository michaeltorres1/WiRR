import React from 'react';
import '../../../App.css';
import * as d3 from 'd3';
import { radarChart } from './radar_chart';


class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.createRadarChart = this.createRadarChart.bind(this);
  }

  componentDidMount() {
    this.createRadarChart();
    window.addEventListener("resize", this.resize.bind(this));
  }

  componentDidUpdate() {
    this.createRadarChart();
  }

  resize() {
    this.createRadarChart();
  }

  createRadarChart() {
    // radarChart(this.id, this.data, this.options);
    var margin = { top: 60, right: 60, bottom: 60, left: 60 },
      width = Math.min(700, window.innerWidth / 2 - 10) - margin.left - margin.right,
      height = Math.min(width, window.innerHeight / 2 - margin.top - margin.bottom - 20);
    
    var color = d3.scaleOrdinal()
      .range(["#EDC951", "#CC333F", "#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: color
    };

    let data = [[//WiRR
      { axis: "Links", value: 19 },
      { axis: "Text Citations", value: 3 },
      { axis: "Total Citations", value: 22 },
      { axis: "Reliability Rating (%)", value: 38 },
    ]];

    let id = "#radar";

    return radarChart(id, data, radarChartOptions);
  }
  
  render() {
    return <div id="radar"></div>
  }
}
export default RadarChart;
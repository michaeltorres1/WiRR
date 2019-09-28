import React from 'react';
import RadarChart from './radar';
import WikiSearch from '../search';


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }


  
  render() {
    return (
      <div className="show-container">
        <WikiSearch />
        <RadarChart />
      </div>
    )
  }
}

export default Show;
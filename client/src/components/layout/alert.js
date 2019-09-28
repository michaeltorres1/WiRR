import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const alert = ({ alerts }) => 
alerts !== null &&
alerts.length > 0 &&
alerts.map(alert => (
  <div key={alert.id} id="alert-msg" className={`alert alert-${alert.type}`}>
    {alert.msg}
  </div>
));

alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(alert)

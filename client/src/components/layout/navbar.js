import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const aLinks = (
    <ul>
      <li className="nav-signup">
        <a onClick={logout} href="#">Logout</a>
      </li>
      <li className="dropdown-menu">
        <Link to="/"><i className="fas fa-bars"></i></Link>
      </li>
    </ul>
  );

  const nALinks = (
    <ul>
      <li className="nav-signup">
        <Link to="/register">Sign up</Link>
      </li>
      <div>|</div>
      <li className="nav-signin">
        <Link to="/login">Sign in</Link>
      </li>
      <li className="dropdown-menu">
        <Link to="#">
          <i className="fas fa-bars">
            <div className="dropdown-content">
              <Link to="/register">Sign up</Link>
              <Link to="/login">Sign in</Link>
            </div>
          </i>
        </Link>
      </li>
    </ul>
  );


  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">WiRR</Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated ? aLinks: nALinks }</Fragment>) }
      </nav>
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

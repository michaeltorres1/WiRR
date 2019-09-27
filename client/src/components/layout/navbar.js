import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">WiRR</Link>
        </h1>
        <ul>
          <li className="nav-signup">
            <Link to="/register">Sign up</Link>
          </li>
          <div>|</div>
          <li className="nav-signin">
            <Link to="/login">Sign in</Link>
          </li>
          <li className="dropdown-menu">
            <Link to="/"><i className="fas fa-bars"></i></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;

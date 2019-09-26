import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <a href="index.html">WiRR</a>
        </h1>
        <ul>
          <li className="nav-signup"><a href="#">Sign up</a></li>
          <div>|</div>
          <li className="nav-signin"><a href="#">Sign in</a></li>
          <li className="dropdown-menu"><a href="#"><i className="fas fa-bars"></i></a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <a href="index.html">WiRR</a>
        </h1>
        <ul>
          <li class="nav-signup"><a href="#">Sign up</a></li>
          <div>|</div>
          <li class="nav-signin"><a href="#">Sign in</a></li>
          <li class="dropdown-menu"><a href="#"><i class="fas fa-bars"></i></a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

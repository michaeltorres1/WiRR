import '../App.css';
// import { WikiUrlInput } from './wiki_url_input/wiki_url_input';
import Navbar from './layout/navbar';
import Landing from './layout/landing';
import React from 'react';

function App() {
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  )
}

export default App;
import React from 'react';
import '../App.css';
// import { WikiUrlInput } from './wiki_url_input/wiki_url_input';
import Navbar from './layout/navbar';
import Landing from './layout/landing';

function App() {
  return (
    <div>
      <Navbar />
      <Landing />
      {/* <WikiUrlInput /> */}
    </div>
  );
}

export default App;
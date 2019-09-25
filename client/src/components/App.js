import React from 'react';
import { WikiUrlInput } from './wiki_url_input/wiki_url_input';
import { WikiPageStats } from './wiki_page_stats/wiki_page_stats';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    // <Switch> 
    //   <Route
    //     path="/"
    //     component={WikiUrlInput}
    //   />

    //   <Route 
    //     path="/stats"
    //     component={WikiPageStats}
    //   />

    // </Switch>
    <WikiUrlInput />
  );
}

export default App;
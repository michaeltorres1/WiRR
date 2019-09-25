import React from 'react';
import { WikiUrlInput } from './wiki_url_input/wiki_url_input';
import { Switch, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Switch> 
      <Route
        path="/"
        component={WikiUrlInput}
      />
    </Switch>
  );
}

export default App;
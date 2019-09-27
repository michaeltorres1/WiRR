import React from 'react'
import { WikiUrlInput } from '../wiki_url_input/wiki_url_input';
import WikiSearch from '../search';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Wikipedia Reliability Rater</h1>
          <p className="lead">
            Enter a wikipedia link or keyword to search the Reliability
            of the article
          </p>
          <div className="buttons">
            <WikiSearch />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing

import React from 'react'
import WikiSearchContainer from '../../components/search/search_container';

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
            <WikiSearchContainer />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing

import React from 'react';
import {visitPage} from './wirr';

class WikiSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      search_text: '',
      search_result: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let apiUrl = "https://en.wikipedia.org/w/api.php?origin=*";
    let searchParams = {
      // srsort: "relevance", // sort returned results by relevance (default: relevance)
      // srqiprofile: "popular_inclinks_pv", // ranking based on page views
      action: "query",
      format: "json",
      list: "search",
      srlimit: 5, // how many articles to return
      srprop: "wordcount|timestamp|snippet|titlesnippet|sectiontitle|sectionsnippet|categorysnippet|contributors|categories",
      srsearch: this.state.search_text
    }

    Object.keys(searchParams).forEach((key) => {
      apiUrl += "&" + key + "=" + searchParams[key];
    });

    fetch(apiUrl)
      .then(function (response) { return response.json(); })
      .then(function (response) {
        const results = response.query.search;
        results.forEach( (result) => {
          let articleUrl = "https://en.wikipedia.org/wiki/";
          articleUrl += result.title;
          visitPage(articleUrl);
        })

      })
      .catch(function (error) { console.log(error); });

  };

  render() {
    return(
      <div>
        <form className='searchForm' onSubmit={this.handleSubmit}>
          <input
            type='text'
            className='searchInput'
            value={this.state.searchText}
            onChange={this.updateField('search_text')}
          />
          <input type="submit" value="Search"/>
        </form>

        <div className='searchResult'>
          {this.state.search_result}
        </div>
      </div>
    )
  }

}

export default WikiSearch;
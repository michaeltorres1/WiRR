import React from 'react';
import { visitPage, processScore } from './wirr';
// import SearchResult from './search_result';
import { Link } from 'react-router-dom';

class WikiSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      search_text: '',
      search_result: [],
      score: '',
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
    this.search();
  };

  search() {
    let apiUrl = "https://en.wikipedia.org/w/api.php?origin=*";
    let searchParams = {
      // srsort: "relevance", // sort returned results by relevance (default: relevance)
      // srqiprofile: "popular_inclinks_pv", // ranking based on page views
      action: "query",
      format: "json",
      list: "search",
      srlimit: 5, // how many articles to return
      // srprop: "wordcount|timestamp|snippet|titlesnippet|sectiontitle|sectionsnippet|categorysnippet|contributors|categories",
      prop: "info",
      inprop: "url",
      srsearch: this.state.search_text
    }

    Object.keys(searchParams).forEach((key) => {
      apiUrl += "&" + key + "=" + searchParams[key];
    });

    fetch(apiUrl)
      .then((response) => { return response.json(); })
      .then((data) => {
        const results = data.query.search;
        const parseResult = results.map((result, i) => {
          let articleUrl = "https://en.wikipedia.org/wiki/";
          articleUrl += result.title.split(' ').join('_');
          let score = "";
          
          visitPage(articleUrl).then( res => {
            score = processScore(res);
            if (score !== NaN) {
              let prevResults = this.state.search_result;
              let thisResult = (
                <div key={`result-${i}`} className="searchResult">
                  <h3 className="searchResult-title">
                    
                    <Link 
                      to={{
                        pathname: "/article/show",
                        articleUrl: `${articleUrl}`}}>
                      {result.title}
                    </Link>
                    ({score} %)
                  </h3>
                  <br />
                  <div className="searchResult-snippet">
                    {result.snippet}
                  </div>
                </div>
              )
              prevResults.push(thisResult);
              this.setState({ search_result: prevResults })
            }
          })
        })
      })

      .catch(function (error) { console.log(error); });
  }

  render() {
    // console.log(this.state)
    return(
      <div>
        <form className='form' onClick={this.handleSubmit}>
          <div className="form-group">
            <input
              type='text'
              className='wiki-eval-input'
              value={this.state.searchText}
              onChange={this.updateField('search_text')}
            />
          </div>
            <input type='submit' className='btn btn-secondary' value="Search" />
        </form>

        <div className='searchResults'>
          {this.state.search_result}
        </div>
      </div>
    )
  }
}

export default WikiSearch;
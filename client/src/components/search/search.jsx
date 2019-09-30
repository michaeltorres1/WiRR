import React from 'react';
import { visitPage, processScore } from '../../utils/articles_util';
import { Link } from 'react-router-dom';

class WikiSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.defaultFields;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField(field) {
    return (e) => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.searchDB(this.state.search_text)
    //   .then( res => console.log(res))
    this.searchWiki();
  };

  searchWiki() {
    let apiUrl = "https://en.wikipedia.org/w/api.php?origin=*";
    let searchParams = {
      // srsort: "relevance", // sort returned results by relevance (default: relevance)
      // srqiprofile: "popular_inclinks_pv", // ranking based on page views
      action: "query",
      format: "json",
      list: "search|users",
      srlimit: 10, // how many articles to return
      // srprop: "wordcount|timestamp|snippet|titlesnippet|sectiontitle|sectionsnippet|categorysnippet|contributors|categories",
      prop: "info|contributors",
      ususerids: "",
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
            if (score !== 'NaN') {
              let title = result.title.replace(/<[^>]*>?/gm, '');
              let snippet = result.snippet.replace(/<[^>]*>?/gm, '');
              let description = "dummy description";
              let category = ["cat1", "cat2"];
              let references = ["ref1", "ref2"];
              let article = {
                "title": title,
                "snippet": snippet,
                "description": description,
                "url": articleUrl,
                "category": category,
                "references": references,
                "wirrScore": score
              }
              // this.props.createArticle(article);

              let prevResults = this.state.search_result;
              let thisResult = (
                <div key={`result-${i}`} className="searchResult">
                  <h3 className="searchResult-title">                    
                    <Link 
                      to={{
                        pathname: "/article/show",
                        articleTitle: `${article.title}`
                        }}>
                      {title}
                    </Link>
                    ({score} %)
                  </h3>
                  <br />
                  <div className="searchResult-snippet">
                    {snippet}
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
        <form className='form' onSubmit={this.handleSubmit}>
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
import React from 'react'
import * as cheerio from 'cheerio';
import { DonutGraph } from './charts/donut_graph';
import RadarChart  from './charts/radar';
import WikiSearchContainer from '../search/search_container';

import { 
    visitPage,
    getAllDomains,
    getAllLinkCitations,
    getAllCitations,
    getAllCitationUrls
} from '../../utils/articles_util';


export class ArticleShow extends React.Component {
    constructor(props) {
        super(props)
        // debugger
        this.state = {
            articleUrl: props.location.articleUrl,
            articleTitle: props.location.articleTitle,
            articleScore: props.location.articleScore,
            articleWordCount: props.location.articleWordCount,
            articleLastUpdated: props.location.articleLastUpdated,
            domainCounts: {
                'books_text': 0,
                'edu_gov': 0,
                'org': 0,
                'com_net': 0
            }
        }
    }

    componentDidMount() {
        const that = this;


        visitPage(this.state.articleUrl).then( res => {
            if (!this.state.domainCounts['org']) {
                const $ = cheerio.load(res.body);
                const linkCitations = getAllLinkCitations($);
                const allCitations = getAllCitations($);
                let allTextCitationCount = allCitations.length - linkCitations.length;
                const allCitationUrls = getAllCitationUrls(linkCitations, $);
                const allDomains = getAllDomains(allCitationUrls);
                let updatedAllDomains = []

                // count books.google.com as a text citation
                allDomains.forEach(domain => {
                    if (domain != "books.google.com") {
                        updatedAllDomains.push(domain)
                    } else {
                        allTextCitationCount += 1
                    }
                })
                
                // format data as needed

                // if it's gov or edu, then pair
                // if it's org then have it on its own
                // if net or com or anything else then pair
                // Go through and format as needed
                const domainCounts = { 
                    'books_text': 0,
                    'edu_gov': 0,
                    'org': 0,
                    'com_net': 0
                }

                updatedAllDomains.forEach( domain => {
                    switch (domain) {
                        case 'edu':
                        case 'gov':
                            domainCounts['edu_gov'] += 4;
                            break;
                        case 'org':
                            domainCounts['org'] += 3;
                            break;
                        default:
                            domainCounts['com_net'] += 1;
                            break;
                    }
                })

                for (let i = 0; i < allTextCitationCount; i++) {
                    domainCounts['books_text'] += 5
                }

                that.setState({
                    domainCounts
                })
            }
        })
    }

    render() {
        return (
            <div className="article-show-page-container">
                {/* <WikiSearchContainer /> */}
                <div className="article-header-container">
                    <div className="article-title">                    
                        {this.state.articleTitle}
                    </div>
                    <div className="article-score">
                        &nbsp;({this.state.articleScore}%)
                    </div>

                </div>
                <div className="article-url">
                    <a href={this.state.articleUrl} target="_blank">{this.state.articleUrl}</a>
                </div>
                <div className="divider"></div>
                <div className="content-main-container">
                    <div className="content-left">
                        <div className="article-info-container">
                            <div className="article-info-title">
                                Article Trivia Info
                            </div>
                            <div>
                                Total word count: {this.state.articleWordCount}
                            </div>
                            <div>
                                Last updated on: {this.state.articleLastUpdated}
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="score-info-container">
                            <div className="score-info-title">Scoring Info</div>
                            <div>
                                This Wikipedia's article reliability rating scores a score of {this.state.articleScore}. The score is calculated based on the types of references used in this article. Here is a break down of references:
                            </div>
                            <div className="content-ref">Number of books/text references: {this.state.domainCounts.books_text}</div>
                            <div className="content-ref">Number of edu/gov website references: {this.state.domainCounts.edu_gov}</div>
                            <div className="content-ref">Number of org website references: {this.state.domainCounts.org}</div>
                            <div className="content-ref">Number of com/net website references: {this.state.domainCounts.com_net}</div>
                        </div>
                    </div>
                    <div className="content-right">
                        {/* <div className="radar-chart">
                        <RadarChart domainCounts={this.state.domainCounts} />
                        </div> */}
                        <div className="donut-chart">
                            <DonutGraph
                                articleTitle={this.state.articleTitle}
                                articleUrl={this.state.articleUrl} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

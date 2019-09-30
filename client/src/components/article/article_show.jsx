import React from 'react'
import * as cheerio from 'cheerio';
import { DonutGraph } from './charts/donut_graph';
import RadarChart  from './charts/radar';
import WikiSearchContainer from '../search/search_container';
import { BarChart } from './charts/bar_chart';
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
        this.state = {
            articleUrl: props.location.articleUrl,
            articleTitle: props.location.articleTitle,
            domainCounts: {
                'books/text': 0,
                'edu/gov': 0,
                'org': 0,
                'com/net': 0
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
                    'books/text': 0,
                    'edu/gov': 0,
                    'org': 0,
                    'com/net': 0
                }

                updatedAllDomains.forEach( domain => {
                    switch (domain) {
                        case 'edu':
                        case 'gov':
                            domainCounts['edu/gov'] += 4;
                            break;
                        case 'org':
                            domainCounts['org'] += 3;
                            break;
                        default:
                            domainCounts['com/net'] += 1;
                            break;
                    }
                })

                for (let i = 0; i < allTextCitationCount; i++) {
                    domainCounts['books/text'] += 5
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
                {/* <WikiSearchContainer />
                <div className="article-show-charts">
                    <RadarChart domainCounts={this.state.domainCounts}/>
                    <DonutGraph
                        articleTitle={this.props.articleTitle}
                        articleUrl={this.state.articleUrl}/>
                </div> */}
                <BarChart />
            </div>
        )
    }
}

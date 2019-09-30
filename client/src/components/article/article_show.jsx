import React from 'react'
import * as cheerio from 'cheerio';
import { DonutGraph } from './charts/donut_graph';
import RadarChart  from './charts/radar';
import WikiSearchContainer from '../search/search_container';

import { 
    visitPage,
    getAllDomains,
    getReliabilityScore,
    processScore,
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
            DomainCounts: {}
        }
    }

    componentDidMount() {
        visitPage(this.state.articleUrl).then( res => {
            // set the state with domains and their respective counts
            // utilize the functions from article_util.js
            // 1. visit page
            // 2. load the thing into cheerio
            const $ = cheerio.load(res.body)
            // 3. get all link citations
            const linkCitations = getAllLinkCitations($);
            // 4. get the text citation count by getting all the citation
                // counting them then substracting that count from the link citation count
            const allCitations = getAllCitations($);
            const allTextCitationCount = allCitations.length - linkCitations.length
            const allCitationUrls = getAllCitationUrls(linkCitations, $)
            const allDomains = getAllDomains(allCitationUrls)

            
        })
    }

    render() {
        return (
            <div className="article-show-page-container">
                <WikiSearchContainer />
                <div className="article-show-charts">
                    <RadarChart />
                    <DonutGraph
                        articleTitle={this.props.articleTitle}
                        articleUrl={this.state.articleUrl}/>
                </div>
            </div>
        )
    }
}

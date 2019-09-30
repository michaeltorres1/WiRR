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
            const $ = cheerio.load(res.body);
            const linkCitations = getAllLinkCitations($);
            const allCitations = getAllCitations($);
            const allTextCitationCount = allCitations.length - linkCitations.length;
            const allCitationUrls = getAllCitationUrls(linkCitations, $);
            const allDomains = getAllDomains(allCitationUrls);
            const updatedAllDomains = [];
            let allTextCitationCount = 0;

            // count books.google.com as a text citation
            allDomains.forEach(domain => {
                if (domain != "books.google.com") {
                    updatedAllDomains.push(domain)
                } else {
                    allTextCitationCount += 1
                }
            })


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

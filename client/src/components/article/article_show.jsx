import React from 'react'
import { DonutGraph } from './charts/donut_graph';
import RadarChart  from './charts/radar';
import WikiSearchContainer from '../search/search_container';

export class ArticleShow extends React.Component {
    constructor(props) {
        super(props)
        // debugger
        this.state = {
            articleUrl: props.location.url,
            articleTitle: props.location.title
        }
    }

    render() {
        return (
            <div className="article-show-page-container">
                <WikiSearchContainer />
                <div className="article-show-charts">
                    <RadarChart />
                    <DonutGraph articleUrl={this.state.articleUrl} articleTitle={this.state.articleTitle}/>
                </div>
            </div>
        )
    }
}

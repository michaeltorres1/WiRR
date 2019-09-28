import React from 'react'
import { DonutGraph } from './donut_graph';
import WikiSearch from '../search';

export class ArticleShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articleUrl: props.location.articleUrl
        }
    }

    render() {
        return (
            <div>
                <WikiSearch />
                <DonutGraph articleUrl={this.state.articleUrl}/>
            </div>
        )
    }
}

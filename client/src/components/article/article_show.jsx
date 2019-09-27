import React from 'react'

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
                This is the show page of a specific article            
            </div>
        )
    }
}

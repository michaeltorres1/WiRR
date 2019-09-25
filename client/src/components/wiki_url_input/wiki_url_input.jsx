// Author:       Hakeem Almidan
// Filename:     wiki_citation_eval.js
// Description:  The purpose of this file is to provide a score (in percentage)
//               of how credible/reliable a page is.

import React from 'react'
let request = require('request')
// used to make HTTP requests
// Basically goes inside the page that you make a request to
let cheerio = require('cheerio')
// used to parse the HTML elements on the page
// Pretty much the same as using jQuery
// but MUCH faster than JS DOM and jQuery
// Docs say that it is about 8x faster than JS DOM
let URL = require('url-parse')
// used to parse URLs

export class WikiUrlInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchInput: '',
            linkCitationCount: 0,
            textCitationCount: 0,
            totalCitationCount: 0,
            pageReliabilityPercentage: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getCredibilityScore = this.getCredibilityScore.bind(this)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault()
        this.visitPage(this.state.searchInput)
    }

    visitPage(pageUrl) {
        // The proxy url is used to allow Cross Origin Resource Sharing (CORS)
            // TODO : Review if this exposes any security vulnerability
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        request((proxyurl + pageUrl), (error, response, body) => {
            if (error) {
                throw (error)
            }

            if (response.statusCode === 200) {
                const $ = cheerio.load(body)

                const allATagCitations = $("li[id^='cite_note'] a[rel='nofollow']:first-child")
                const allCitations = $("li[id^='cite_note']")
                const textCitationCount = allCitations.length - allATagCitations.length
                let allCitationUrls = [];

                allATagCitations.each(function () {
                    allCitationUrls.push($(this).attr('href'))
                })

                const allDomains = this.getAllDomains(allCitationUrls)
                this.getCredibilityScore(allDomains, textCitationCount, allCitations.length)
            }
        })
    }

    getAllDomains(urls) {
        // @desc: Given a list of urls, grab domains from each one by extracting it from each
        // website's hostname ( example hostname: 'www.wikipedia.org' )
        let allDomains = [];
        urls.forEach(url => {
            const packagedUrl = new URL(url).hostname
            let domain;

            for (let i = packagedUrl.length; i > 0; i--) {
                if (packagedUrl === 'books.google.com') {
                    domain = packagedUrl
                    break
                } else if (packagedUrl[i] === '.') {
                    domain = packagedUrl.slice(i + 1)
                    break
                }
            }

            allDomains.push(domain)
        })

        return allDomains
    }

    getCredibilityScore(domains, textCitationCount, totalCitationCount) {
        let pageReliabilityScore = 0;

        domains.forEach(domain => {
            let score;
            switch (domain) {
                case 'books.google.com':
                    score = 5;
                    break;
                case "gov":
                    score = 4;
                    break;
                case 'edu':
                    score = 4;
                    break;
                case 'org':
                    score = 3;
                    break;
                default:
                    score = 1;
                    break;
            }
            pageReliabilityScore += score;
        })

        pageReliabilityScore += (textCitationCount * 5)
        // We are assuming that all text citations here are either a
        // book citation or a scholarly article, where each of those things
        // have a point value of 5 points.

        // Now we get the percentage of how reliable the source is vvv:
        console.log('Total link-including citation count : ' + domains.length)
        this.setState({
            linkCitationCount: domains.length
        })
        
        console.log('Total text citation count           : ' + textCitationCount)
        this.setState({
            textCitationCount: textCitationCount
        })
        
        console.log('Total citation count                : ' + totalCitationCount)
        this.setState({
            totalCitationCount: totalCitationCount
        })
        
        const pageReliabilityPercentage = (pageReliabilityScore / (totalCitationCount * 5)) * 100
        console.log('Page reliability rating             : ' + String(pageReliabilityPercentage.toFixed(2)) + '%')
        this.setState({
            pageReliabilityPercentage: String(pageReliabilityPercentage.toFixed(2)) + '%'
        })

        return pageReliabilityPercentage
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.handleSubmit}>

                    <input
                        type="text"
                        onChange={this.update('searchInput')}/>
                    <input type="submit" value="evaluate"/>
                </form>
            </div>
        )
    }
}
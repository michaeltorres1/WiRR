import React from 'react';
import '../../stylesheets/donut_graph.css';
import * as d3 from 'd3';
import { visitPage } from '../wirr';
let cheerio = require('cheerio')
let URL = require('url-parse')

// Inspired by : https://www.d3-graph-gallery.com/graph/donut_basic.html
              // https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
export class DonutGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {"loading...": 10, "please...": 10, "wait...": 10},
            margin: 40,
            width: 700,
            height: 450
        }
        this.topTenAuthorContributionPercentage = this.topTenAuthorContributionPercentage.bind(this)
        this.drawChart = this.drawChart.bind(this)
    }

    async componentDidMount() {
        this.topTenAuthorContributionPercentage(this.props.articleUrl)
        this.drawChart()
    }

    topTenAuthorContributionPercentage = (url) => {
        // 1. Load under the 'url' package for proper parsing
        const packagedUrl = new URL(url)
        // 2. Get article name from pathanme by parsing
        // (already joined by '_' from 'search.jsx')
        const articleName = packagedUrl.pathname.split('/').slice(-1)[0]

        // We are going to store top ten authors and their contributions here
        let topTenAuthors = {};

        // 3. Load it in the xtools wikipedia authorship statistics page
        visitPage("https://xtools.wmflabs.org/authorship/en.wikipedia.org/" + articleName).then(res => {
            const $2 = cheerio.load(res.body)

            const authorsUsernames = $2('table.authorship-table td.sort-entry--username').slice(0, 10)
                .map(function () { return $2(this).attr("data-value"); }).get()

            const authorsContributionPercentage = $2('table.authorship-table td.sort-entry--percentage').slice(0, 10)
                .map(function () { return $2(this).attr("data-value"); }).get()

            authorsUsernames.forEach((author, idx) => topTenAuthors[author] = authorsContributionPercentage[idx]);

            return topTenAuthors
        }).then( topTenAuthors => {
            let remainingPercentage = 100 - Object.values(topTenAuthors)
                                            .reduce((accum, el) => accum + parseInt(el))
           topTenAuthors = Object.assign(topTenAuthors, {others: remainingPercentage.toFixed(2)})
            this.setState({
                data: topTenAuthors
            })
        })
        .catch(err => {
            throw err
        })
    }

    drawChart() {
        d3.select("#author_contribution_percentage_per_article").html("")
        const radius = Math.min(this.state.width, this.state.height) / 2 - this.state.margin
        let svg = d3.select("#author_contribution_percentage_per_article")
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height)
            .append("g")
            .attr("transform", "translate(" + this.state.width / 2 + "," + this.state.height / 2 + ")");

        let color = d3.scaleOrdinal()
            .domain(this.state.data)
            .range(["violet", "indigo", "skyblue", "blue", "green", "lightgreen", "yellow", "orange", "red", "lightred", "lightBlue"])

        let pie = d3.pie()
            .value(function (d) { return d.value })
        let data_ready = pie(d3.entries(this.state.data))

        // Add div to body but isn't visible 
        // this will be the box that appears next to mouse
        // on hover
        let div = d3.select("body").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);

        const path = svg
            .selectAll('path')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(100)
                .outerRadius(radius)
            )
            .attr('fill', function (d) { return (color(d.data.key)) })
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .attr('opacity', 1)

            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '0.5')
                div.transition()
                    .duration(50)
                    .style('opacity', 1)

                // vvv This shows value of arc on mouseover
                div.html(`${d.value}%`)
                    .style('left', (d3.event.pageX + 10) + "px")
                    .style('top', (d3.event.pageY - 15) + "px")
            })

            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1')
                div.transition()
                    .duration(50)
                    .style('opacity', 0)
            })

        // Legend styling inspired by : https://medium.com/@kj_schmidt/making-an-animated-donut-chart-with-d3-js-17751fde4679
        // vvvvvvvvvvvvv
        let legendRectSize = 15;
        let legendSpacing = 5;

        let legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'circle-legend')
            .attr('transform', function (d, i) {
                let height = legendRectSize + legendSpacing;
                let offset = height * color.domain().length / 2;
                let horz = 15 * legendRectSize - 13;
                let vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('circle') //keys
            .style('fill', color)
            .style('stroke', color)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', '.5rem');
        legend.append('text') //labels
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .style('fill', 'black')
            .text(function (d) {
                return d;
            })
        // ^^^^^^^^^^^
    }

    render() {
        this.drawChart()
        return (
            <div>
                <div id="author_contribution_percentage_per_article">
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react'
import * as d3 from 'd3';

export class BarChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            top10Authors: props.top10Authors,
            data: [{ name: 'swift', value: 1 }, { name: 'python', value: 2 }, { name: 'js', value: 5 }]
        }

        this.executeD3 = this.executeD3.bind(this)
    }

    componentDidMount() {
        this.fetchTop10AuthorsTotalLifetimeEdits()
        this.executeD3()
    }

    fetchTop10AuthorsTotalLifetimeEdits() {
        if (this.state.top10Authors) {
            let apiUrl = "https://en.wikipedia.org/w/api.php?origin=*";
            let searchParams = {
                action: "query",
                format: "json",
                list: "users",
                ususers: "",
                usprop: "editcount"
            }
            const that = this;

            Object.keys(searchParams).forEach((key) => {
                if (key === 'ususers') {
                    apiUrl += "&" + key + "="
                    that.state.top10Authors.map(author => {
                        apiUrl += '|' + author;
                    })
                } else {
                    apiUrl += "&" + key + "=" + searchParams[key];
                }
            });

            fetch(apiUrl)
                .then((response) => { return response.json(); })
                .then(data => {
                    const top10AuthorsLifetimeContributions = []
                    let userObj;
                    data.query.users.map(user => {
                        if (!user.invalid) {
                            userObj = { name: user.name, value: user.editcount }
                            top10AuthorsLifetimeContributions.push(userObj)
                        }
                    })
                    that.setState({
                        data: top10AuthorsLifetimeContributions.slice(1, top10AuthorsLifetimeContributions.length)
                    })
                })
        }
    }

    // Inspired by : https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
    executeD3() {
        d3.select('#bar_chart_svg').html('')
        const margin = 60;
        const chartWidth = 1000 - 2 * margin
        const chartHeight = 600 - 2 * margin

        const svg = d3.select('#bar_chart_svg')
                      .attr('width', chartWidth + 100)
                      .attr('height', chartHeight + 100)

        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`)

        const dataValues = this.state.data.map(d => {
            return d.value
        })

        const yScale = d3.scaleLinear()
            .range([chartHeight, 0])
            .domain([0, d3.max(dataValues)])
        chart.append('g')
            .attr('transform', `translate(30, ${-20})`)
            .call(d3.axisLeft(yScale))

        const xScale = d3.scaleBand()
            .range([0, chartWidth])
            .domain(this.state.data.map(d => d.name))
            .padding(0.2)
        chart.append('g')
            .attr('transform', `translate(30, ${chartHeight - 20})`)
            .call(d3.axisBottom(xScale))

        chart.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(yScale)
                .tickSize(-chartWidth, 0, 0)
                .tickFormat(''))
            .attr('transform', `translate(30, ${-20})`)
            .attr('stroke-width', 1)
            .attr('fill', 'none')

        chart.selectAll('rect')
            .data(this.state.data)
            .enter()
            .append('rect')
            .attr('x', obj => xScale(obj.name) + 30)
            .attr('y', obj => yScale(obj.value))
            .attr('height', obj => chartHeight - yScale(obj.value) - 20)
            .attr('width', xScale.bandwidth())
            .attr("fill", 'cyan')

        svg.selectAll('labelText')
            .data(this.state.data)
            .enter()
            .append('text')
            .text(function (d) {
                if (d.value === undefined) {
                    // if d.value is undefined, this most likely means that user is blacklisted
                        //  thus we will give them lifetime contribution of 1
                    d.value = 1;
                }
                // Number format source : https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                return d.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            })
            .attr('x', function (d, i) {
                return xScale(d.name) + xScale.bandwidth() + 28
            })
            .attr('y', function (d) {
                const placementPos = yScale(d.value) + margin - 15
                if (placementPos > (chartHeight + 20)) {
                    return chartHeight + 30
                }
                return placementPos
            })
            .style('fill', 'skyblue')

            

        svg.append('text')
            .attr('x', -(chartHeight / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Total lifetime contributions')
            .attr('fill', 'white')

        svg.append('text')
            .attr('x', chartWidth / 2 + margin)
            .attr('y', 25)
            .attr('text-anchor', 'middle')
            .text('Top 10 authors lifetime contributions')
            .attr('fill', 'white')

    }

    render() {
        this.executeD3()
        return (
            <div>
                <svg id="bar_chart_svg">
                </svg>
            </div>
        )
    }
}
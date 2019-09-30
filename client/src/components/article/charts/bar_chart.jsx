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
                        if (user.invalid) {
                            // do nothing
                        } else {
                            userObj = { name: user.name, value: user.editcount }
                            top10AuthorsLifetimeContributions.push(userObj)
                        }
                    })
                    that.setState({
                        data: top10AuthorsLifetimeContributions
                    })
                })
        }
    }

    executeD3() {
        d3.select('svg').html('')
        const margin = 60;
        const chartWidth = 1000 - 2 * margin
        const chartHeight = 600 - 2 * margin

        const svg = d3.select('svg')
                      .style("background-color", 'pink')
                      .attr('width', chartWidth + 100)
                      .attr('height', chartHeight + 100)

        const chart = svg.append('g')
            .attr('transform', `translate(${margin}, ${margin})`)

        const dataValues = this.state.data.map(obj => {
            return obj.value
        })

        const yScale = d3.scaleLinear()
            .range([chartHeight, 0])
            .domain([0, d3.max(dataValues)])
        chart.append('g')
            .attr('transform', `translate(0, ${-20})`)
            .call(d3.axisLeft(yScale))

        const xScale = d3.scaleBand()
            .range([0, chartWidth])
            .domain(this.state.data.map(d => d.name))
            .padding(0.2)
        chart.append('g')
            .attr('transform', `translate(0, ${chartHeight - 20})`)
            .call(d3.axisBottom(xScale))

        chart.selectAll('rect')
            .data(this.state.data)
            .enter()
            .append('rect')
            .attr('x', obj => xScale(obj.name))
            .attr('y', obj => yScale(obj.value))
            .attr('height', obj => chartHeight - yScale(obj.value) - 20)
            .attr('width', xScale.bandwidth())

        chart.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(yScale)
                .tickSize(-chartWidth, 0, 0)
                .tickFormat(''))
            .attr('transform', `translate(0, ${-20})`)

        svg.append('text')
            .attr('x', -(chartHeight / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Total lifetime contributions')

        svg.append('text')
            .attr('x', chartWidth / 2 + margin)
            .attr('y', 25)
            .attr('text-anchor', 'middle')
            .text('Top 10 authors lifetime contributions')

    }

    render() {
        this.executeD3()
        return (
            <div>
                <svg>
                </svg>
            </div>
        )
    }
}
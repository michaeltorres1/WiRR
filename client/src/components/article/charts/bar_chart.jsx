import React, { Component } from 'react'
import * as d3 from 'd3';

export class BarChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{ lang: 'swift', value: 1 }, { lang: 'python', value: 2 }, { lang: 'js', value: 5 }]
        }

        this.executeD3 = this.executeD3.bind(this)
    }

    componentDidMount() {
        this.executeD3()
    }

    executeD3() {
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
            .domain(this.state.data.map(d => d.lang))
            .padding(0.2)
        chart.append('g')
            .attr('transform', `translate(0, ${chartHeight - 20})`)
            .call(d3.axisBottom(xScale))

        chart.selectAll('rect')
            .data(this.state.data)
            .enter()
            .append('rect')
            .attr('x', obj => xScale(obj.lang))
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
    }

    render() {
        return (
            <div>
                <h2>This is a basic bar chart</h2>
                <svg>
                </svg>
            </div>
        )
    }
}
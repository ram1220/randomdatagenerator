import React, { Component, Fragment } from 'react';
import d3 from 'd3';
import {
    width,
    height,
    margin,
    days,
    gridSize,
    times,
    buckets,
    colors,
} from '../../common';
export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.getIDay = this.getIDay.bind(this);
        this.getIHour = this.getIHour.bind(this);
        this.refreshChart = this.refreshChart.bind(this);
    }

    getIDay(date) {
        return new Date(date).getDate()
    }
    getIHour(date) {
        return new Date(date).getHours()
    }
    componentDidMount() {
        this.refreshChart();
    }
    refreshChart() {
        let ref = this;
        let data = this.props.chartData;
        d3.selectAll("svg > *").remove();
        let svg = d3.select(".chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let dayLabels = svg.selectAll(".dayLabel")
            .data(days)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

        let timeLabels = svg.selectAll(".timeLabel")
            .data(times)
            .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", function (d, i) { return i * gridSize; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });
        var colorScale = d3.scale.quantile()
            .domain([0, buckets - 1, d3.max(data, function (d) { return d.duration; })])
            .range(colors);

        var cards = svg.selectAll(".hour")
            .data(data, function (d) { return ref.getIDay(d.start) + ':' + ref.getIHour(d.start); });

        cards.enter().append("rect")
            .attr("x", function (d) { return (ref.getIHour(d.start) - 1) * gridSize; })
            .attr("y", function (d) { return (ref.getIDay(d.start) - 1) * gridSize; })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", "hour bordered")
            .attr("width", gridSize)
            .attr("height", gridSize)
            .style("fill", colors[0]);

        cards.transition().duration(1000)
            .style("fill", function (d) { return colorScale(d.duration); });

        cards.select("title").text(function (d) { return d.duration; });

        cards.exit().remove();

    }

    render() {
        const { title } = this.props;
        return (
            <Fragment>
                <h1>{title}</h1>
                <div className="chart"></div>
            </Fragment>
        );
    }
}
import React, { Component } from 'react'
import { generateFakeData } from '../../data/dataGenerator';
import Chart from '../chart'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: generateFakeData()
        }
    }

    
    render() {
        const { data } = this.state;
        return (
            <div className="container">
                <Chart title="Sleeping Tracker" chartData={data} />
            </div>
        );
    }
}

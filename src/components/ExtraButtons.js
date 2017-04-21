import React, { Component } from 'react';
import '../styles/extraButton.css';

export default class ExtraButtons extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        return (
            <div className="extra-buttons">
                <div className="btn">Drop counters</div>
                <div className="btn">Clear localStorage</div>
            </div>
        );
    }
}

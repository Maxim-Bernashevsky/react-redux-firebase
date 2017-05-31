import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Range extends Component {
    constructor(props) {
        super(props);

        this.min = "300";
        this.max = "1500";
        this.state = {
            radius: '700',
            lastRadius: '700',
            tooltipLeft: '',
            category: [true, true, false]
        };
        this.handleChange = this.handleChange.bind(this);
        this.setLeftPosition = this.setLeftPosition.bind(this);
    }

    componentDidMount(){
        const self = this;
        this.range.addEventListener('mouseup', function () {
            self.props.getRadius(self.state.radius);
        });
        this.range.addEventListener('touchend', function(){
            self.props.getRadius(self.state.radius);
        });
    }

    componentWillMount(){
        this.setLeftPosition(this.state.radius);
    };

    handleChange(event) {
        this.setState({
            radius: event.target.value,
        }, function(){
            this.setLeftPosition(this.state.radius);
        });
    }

    setLeftPosition(value){
        let newStyleTooltip = (parseInt(value) - parseInt(this.min)) * 100 / (parseInt(this.max) - parseInt(this.min));
        newStyleTooltip = "calc(" + newStyleTooltip + "% - "+ newStyleTooltip / 100 * 50 + "px)";
        this.setState({tooltipLeft: newStyleTooltip});
    }

    render() {
        return (
            <div>
                <div  className="rangeBlock">
                    <input
                        name = "radius"
                        type = "range"
                        max  = {this.max}
                        min  = {this.min}
                        onChange = {this.handleChange}
                        value    = {this.state.radius}
                        ref      = { (range) => this.range = range }/>
                    <div
                        className = "tooltipRange"
                        style = {{ left: this.state.tooltipLeft }}>
                        { this.state.radius }m
                    </div>
                </div>
            </div>
        );
    }
}

Range.propTypes = {
    getRadius: PropTypes.func.isRequired
};

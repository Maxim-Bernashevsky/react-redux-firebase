import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiList from './ApiList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/slider.css';


export default class ApiComponent extends Component {
    constructor(props) {
        super(props);

        this.min = "300";
        this.max = "1500";

        this.state = {
            radius: '700',
            lastRadius: '700',
            tooltipLeft: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.setLeftPosition = this.setLeftPosition.bind(this);
    }

    setLeftPosition(value){

        let newStyleTooltip = (parseInt(value) - parseInt(this.min)) * 100 / (parseInt(this.max) - parseInt(this.min));
        //console.log(newStyleTooltip, value);


        newStyleTooltip = "calc(" + newStyleTooltip + "% - "+ newStyleTooltip / 100 * 50 + "px)";
        //console.log(newStyleTooltip);

        this.setState({tooltipLeft: newStyleTooltip});
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

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.radius !== this.state.radius
            || this.state.lastRadius !== nextState.lastRadius
            && nextState.radius === this.state.radius ){
            return true;
        }else {
            return false;
        }
    }

    componentDidMount(){
        const self = this;
        this.range.addEventListener('mouseup', function () {
            self.setState({ lastRadius: self.state.radius });
        });

        this.range.addEventListener('touchend', function(){
            self.setState({ lastRadius: self.state.radius });
        });

    }


    render() {



        return (
            <div className="list">

                
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    <div className="hr-api" > </div>

                    <input
                        name = "radius"
                        type = "range"
                        max  = {this.max}
                        min  = {this.min}
                        onChange={this.handleChange}
                        value={this.state.radius}
                        ref  = { (range) => this.range = range } />

                    <div className="tooltipRange" style={{left: this.state.tooltipLeft}}>{this.state.radius}m</div>

                </ReactCSSTransitionGroup>

                <ApiList radius={this.state.lastRadius}/>
            </div>
        );
    }
}


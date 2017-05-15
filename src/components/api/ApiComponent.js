import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiList from './ApiList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/slider.css';


export default class ApiComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            radius: '700',
            lastRadius: '700'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({radius: event.target.value},
            function () {
                //console.log(this.state.radius);
            }
        );
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
        let self = this;
        this.range.addEventListener('mouseup', function () {
            self.setState({ lastRadius: self.state.radius });
            console.log('next Radius', self.state.radius);
        });
    }


    render() {

        let radius = this.state.radius;
        if(this.state.radius){
            radius += "m";
        }else{
            radius = "... m"
        }

        return (
            <div className="list">
                
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    <div className="hr-api" > </div>
                    <span className="radius-val">{radius}</span>

                    <input
                        type = "range"
                        max  = "1500"
                        min  = "300"
                        onChange={this.handleChange}
                        value={this.state.radius}
                        ref  = { (range) => this.range = range } />

                </ReactCSSTransitionGroup>

                <ApiList radius={this.state.lastRadius}/>
            </div>
        );
    }
}


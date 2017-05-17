import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiList from './ApiList';
import Categories from './Categories';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../styles/slider.css';
import '../../styles/api.css';

export default class ApiComponent extends Component {
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
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    setLeftPosition(value){
        let newStyleTooltip = (parseInt(value) - parseInt(this.min)) * 100 / (parseInt(this.max) - parseInt(this.min));
        newStyleTooltip = "calc(" + newStyleTooltip + "% - "+ newStyleTooltip / 100 * 50 + "px)";
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
        const updateCategory = nextState.category[0] !== this.state.category[0]
                            || nextState.category[1] !== this.state.category[1]
                            || nextState.category[2] !== this.state.category[2];

        const updateRadius = nextState.radius !== this.state.radius
                    || (nextState.radius === this.state.radius &&
                        this.state.lastRadius !== nextState.lastRadius);

        if(updateRadius || updateCategory){
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

    toggleCategory(arg){
        console.log('toggle ' + arg );
        const c = this.state.category;
        if(arg === 'cafe'){
            this.setState({ category: [!c[0], c[1], c[2]] });
        }else if(arg === 'bar'){
            this.setState({ category: [c[0], !c[1], c[2]] });
        }else if(arg === 'resto'){
            this.setState({ category: [c[0], c[1], !c[2]] });
        }
    }


    render() {

        return (
            <div className="list">
                
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    <div className="hr-api" > </div>

                    <Categories
                        toggleCategory = {this.toggleCategory}
                        category = {this.state.category}/>

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

                </ReactCSSTransitionGroup>

                <ApiList
                    radius = {this.state.lastRadius}
                    category = {this.state.category}/>
            </div>
        );
    }
}


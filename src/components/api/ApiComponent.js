import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ApiList from './ApiList';
import Categories from './Categories';
import Range from "./Range";
import '../../styles/slider.scss';
import '../../styles/api.css';


export default class ApiComponent extends Component {
    constructor(props) {
        super(props);

        this.min = "300";
        this.max = "1500";
        this.state = {
            radius: '700',
            category: [true, true, false],
            ran: 700
        };
        this.handleChange = this.handleChange.bind(this);
        this.getRadius = this.getRadius.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        const updateCategory = nextState.category[0] !== this.state.category[0]
                            || nextState.category[1] !== this.state.category[1]
                            || nextState.category[2] !== this.state.category[2];
        const updateRadius = nextState.radius !== this.state.radius;

        if(updateRadius || updateCategory){
            return true;
        }else {
            return false;
        }
    }

    getRadius(newRaduis){
        this.setState({radius: newRaduis});
    }

    handleChange(event) {
        this.setState({
            radius: event.target.value,
        }, function(){
            this.setLeftPosition(this.state.radius);
        });
    }

    toggleCategory(arg){
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


                    <div className="hr-api" > </div>

                    <Categories
                        toggleCategory = {this.toggleCategory}
                        category = {this.state.category}/>
                    <Range
                        getRadius = {this.getRadius}
                    />

                <ApiList
                    radius = {this.state.radius}
                    category = {this.state.category}/>
            </div>
        );
    }
}


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ApiList from './ApiList';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



export default class ItemsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 700,
            lastRadius: 700
        };
        this.handleChange = this.handleChange.bind(this);



    }

    handleChange() {
        this.setState({radius: event.target.value},
            function () {
                console.log(this.state.radius);
            }
        );
    }

    componentDidMount(){
        let self = this;
        this.range.addEventListener('mouseup', function () {
            self.handleChange();
        })
    }


    render() {
        //const self = this;
        return (
            <div className="list">

                {this.props.data ?
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    {Object.keys(this.props.data).map( key => {
                       const item = this.props.data[key];

                       return <Item
                           type     = "vote"
                           key      = { item.id }
                           id       = { item.id }
                           like     = { item.like }
                           title    = { item.title }
                           subtitle = { item.subtitle }
                           logoUrl  = { item.logoUrl } />;
                    })}

                    <div className="hr-api" > </div>
                    <span className="radius-val">{this.state.radius}</span>

                    <input
                        type = "range"
                        max  = "1500"
                        min  = "300"
                        step = "50"
                        onChange={this.handleChange}
                        value={this.state.radius}
                        ref  = { (range) => this.range = range } />

                </ReactCSSTransitionGroup> : <div>Loading api...</div>}

                <ApiList radius={this.state.radius}/>
            </div>
        );
    }
}

ItemsList.propTypes = {
    data: PropTypes.object.isRequired
};


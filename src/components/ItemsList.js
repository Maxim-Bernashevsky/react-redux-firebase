import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/slider.css';

export default class ItemsList extends Component {
    constructor(props) {
        super(props);

    }


    render() {
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

                    </ReactCSSTransitionGroup> : <div>Loading api...</div>}
            </div>
        );
    }
}

ItemsList.propTypes = {
    data: PropTypes.object.isRequired
};

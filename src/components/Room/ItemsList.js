import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import PreactCSSTransitionGroup from 'preact-css-transition-group';
import '../../styles/slider.scss';

export default class ItemsList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="list">
                {this.props.data ?
                    <PreactCSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={100}>

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

                    </PreactCSSTransitionGroup> : <div>Loading api...</div>}
            </div>
        );
    }
}

ItemsList.propTypes = {
    data: PropTypes.object.isRequired
};

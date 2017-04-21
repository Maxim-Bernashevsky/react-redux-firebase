import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

export default class ItemsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const self = this;

        return (
            <div>
                {Object.keys(this.props.data).map( key => {
                   const item = this.props.data[key];

                   return <Item
                       key =      { item.id }
                       id =       { item.id }
                       
                       like =     { item.like }
                       title =    { item.title }
                       subtitle = { item.subtitle }
                       logoUrl =  { item.logoUrl }

                       onLike =   { self.props.likeItem }
                       delete =   { self.props.deleteItem }
                       edit =     { self.props.editItem } />;
                })}
            </div>
        );
    }
}

ItemsList.propTypes = {
    data: PropTypes.object.isRequired,
    likeItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired
};


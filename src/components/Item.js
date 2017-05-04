import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemsForm from './ItemsForm';
import ItemImageCounter from './ItemImageCounter';
import { getLikedId } from '../store/localStorage'


export default class Item extends Component {
    constructor(props){
        super(props);
        this.state = { count: 0 };
    }

    render() {
        return (
            <div className={ getLikedId() === this.props.id
                ? 'container item bg-gradient liked': 'container item bg-gradient'}>

                <ItemImageCounter
                    logoUrl={this.props.logoUrl}
                    like={this.props.like}
                    id={this.props.id} />

                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>

                <ItemsForm
                    id={this.props.id}
                    formType="edit"
                    logoUrl={this.props.logoUrl}
                    title={this.props.title}
                    subtitle={this.props.subtitle} />
            </div>
        );
    }
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired
};

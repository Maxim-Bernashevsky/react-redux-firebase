import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/imageCounter.css';

export default class ItemImageCounter extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="image-counter">
                <div className="count">{this.props.like}</div>
                <img
                    src={this.props.logoUrl}
                    onClick={() => this.props.onLike(this.props.id,
                        this.props.like)}/>
            </div>
        );
    }
};

ItemImageCounter.propTypes = {
    logoUrl: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onLike: PropTypes.func.isRequired,
};

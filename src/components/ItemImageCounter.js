import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/imageCounter.css';    
import { likeItem } from '../actions/ItemActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ItemImageCounter extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="image-counter">
                <div className="count">{this.props.like}</div>
                <img
                    src={this.props.logoUrl}
                    onClick={() => this.props.ItemActions.likeItem(this.props.id,
                        this.props.like)}/>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators({likeItem}, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ItemImageCounter);


ItemImageCounter.propTypes = {
    logoUrl: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};

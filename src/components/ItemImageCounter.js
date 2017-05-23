import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/imageCounter.scss';
import { likeItem } from '../actions/ItemActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ItemImageCounter extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { like, logoUrl, typeItem, id } = this.props;
        return (
            <div className="image-counter">
                <div className="count">{like}</div>
                <div className="wrap-img">

                    <img
                        className="card-image"
                        src={logoUrl}
                        onClick={
                            typeItem === 'vote' ?
                                () => this.props.ItemActions.likeItem(id, like) : ''}/>

                </div>
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
    typeItem: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    like: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),
    id: PropTypes.string.isRequired,
};

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
        let sizeTitle, lengthTitle = this.props.title.length;

        if(lengthTitle > 30){
            sizeTitle = { fontSize: "1.4em" }
        }else if(lengthTitle > 20){
            sizeTitle = { fontSize: "1.6em" }
        }else if(lengthTitle > 15){
            sizeTitle = { fontSize: "1.7em" }
        }else{
            sizeTitle = { fontSize: "1.8em" }
        }


        const {type, title, logoUrl, id, like, subtitle } = this.props;
        return (
            <div className={ getLikedId() === id
                ? 'container item bg-gradient liked': 'container item bg-gradient'}>

                <ItemImageCounter
                    typeItem={type}
                    logoUrl={logoUrl}
                    like={like}
                    id={id} />

                <h2 style={sizeTitle}>{title}</h2>
                <p>{subtitle}</p>

                <ItemsForm
                    typeItem={type}
                    id={id}
                    formType="edit"
                    logoUrl={logoUrl}
                    title={title}
                    subtitle={subtitle} />
            </div>
        );
    }
};

Item.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    like: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired
};

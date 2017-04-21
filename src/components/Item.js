import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ItemsForm from './ItemsForm';
import ItemImageCounter from './ItemImageCounter';

export default class Item extends Component {
    constructor(props){
        super(props);
        this.state = { count: 0 };
    }

    render() {

        return (
            <div className={localStorage.getItem('KeDc_tTenn65M2cyAiK_id_liked') === this.props.id
                ? 'container item bg-gradient liked': 'container item bg-gradient'}>

                <ItemImageCounter
                    logoUrl={this.props.logoUrl}
                    like={this.props.like}
                    id={this.props.id}
                    onLike={this.props.onLike}/>

                <h1>{this.props.title}</h1>
                <p>{this.props.subtitle}</p>

                <ItemsForm
                    id={this.props.id}
                    formType="edit"
                    logoUrl={this.props.logoUrl}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    editItem={this.props.edit}
                    delete={this.props.delete}
                />
            </div>
        );
    }
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    onLike: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired
};

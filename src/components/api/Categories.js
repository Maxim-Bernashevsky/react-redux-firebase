import React, { Component } from 'react';

export default class Categories extends Component {
    constructor(props) {
        super(props);

    }

    render(){
        const active = {
            cafe: this.props.category[0] ? 'active' : '',
            bar: this.props.category[1] ? 'active' : '',
            resto: this.props.category[2] ? 'active' : ''
        };

        return (
            <div>
                <div
                    onClick={() => this.props.toggleCategory('cafe')}
                    className={"btn categoryApi " + active.cafe}>CC</div>
                <div
                    onClick={() => this.props.toggleCategory('bar')}
                    className={"btn categoryApi " + active.bar}>BB</div>
                <div
                    onClick={() => this.props.toggleCategory('resto')}
                    className={"btn categoryApi " + active.resto}>RR</div>
            </div>
        );
    }
}

import React, {Component} from 'react';
//import PropTypes from 'prop-types';

import Item from './Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';




import { defaultUrlApi } from '../store/kudagoApi';
import axios from 'axios';




export default class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = { dataApi: false };

    }

    componentDidMount() {
        const self = this;

        this.urlApi = '';
        Object.keys(defaultUrlApi).forEach( key => {
            this.urlApi += defaultUrlApi[key];
        });

        if(this.props.radius){
            this.requestApi(this.urlApi + this.props.radius);
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.radius != undefined){
            this.requestApi(this.urlApi + nextProps.radius);
        }

    }

    requestApi(urlApi){
        const self = this;
        axios({
            method:'get',
            url: urlApi,
            responseType:''
        })
        .then(function (response) {
            self.setState({dataApi: response.data.results});
        })
        .catch(function (error) {
            console.log(error);
        });


    }

    render() {
        //const self = this;

        return (
            <div >
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>

                    {this.state.dataApi ?
                        this.state.dataApi.map(item => {
                            return <Item
                                type="api"
                                key={ String(item.id) }
                                id={ String(item.id) }
                                like= '+'
                                title={ item.title }
                                subtitle={ item.description }
                                logoUrl={ item.images[0].image }/>;
                        }) : <div>Data api empty</div>
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../Room/Item';
import PreactCSSTransitionGroup from 'preact-css-transition-group';
import { defaultUrlApi } from '../../store/kudagoApi';
import axios from 'axios';
import '../../styles/loader.scss';
import geolocation from '../../services/geolocation';
import Loader from '../stateless/Loader';


export default class ApiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataApi: false
        };
        this.getCategories = this.getCategories.bind(this);
    }

    getCategories(){
        let categories = [];
        if(this.props.category[0]){
            categories.push('cafe');
        }
        if(this.props.category[1]){
            categories.push('bar');
        }
        if(this.props.category[2]){
            categories.push('restaurants');
        }
        categories = categories.join(',');

        return categories;
    }

    getCustomRequest(coord){
        const self = this;
        this.urlApi = '';

        geolocation
            .then( coord => {
                Object.keys(defaultUrlApi).forEach( key => {
                    if(key === 'categories'){
                        self.urlApi = self.urlApi + defaultUrlApi[key] + self.getCategories()
                    }else if(key === 'lon'){
                        self.urlApi = self.urlApi + '&lon=' + coord.lonUser;
                    }else if(key === 'lat'){
                        self.urlApi += self.urlApi + '&lat=' + coord.latUser;
                    }else{
                        self.urlApi += defaultUrlApi[key];
                    }
                });

                if(self.props.radius){
                    self.requestApi(self.urlApi + self.props.radius);
                }
            })
            .catch(error => {
                console.log('ERROR ', error);
            });
    }

    componentDidMount() {
        this.getCustomRequest();
    }

    componentWillReceiveProps(nextProps){
        this.setState({ dataApi: false });
        this.getCustomRequest();
    }

    shouldComponentUpdate(nextProps){
            return true
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
        return (
            <div>
                <PreactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={100}>

                    <div>{this.state.test}</div>
                    {this.state.dataApi ?
                        this.state.dataApi.map(item => {
                            return <Item
                                type     = "api"
                                key      = { String(item.id) }
                                id       = { String(item.id) }
                                like     = ''
                                title    = { item.title }
                                subtitle = { item.description }
                                logoUrl  = { item.images[0].image }/>;
                        }) : ( <Loader /> )
                    }
                </PreactCSSTransitionGroup>
            </div>
        );
    }
}

ApiList.propTypes = {
    radius: PropTypes.string.isRequired
};
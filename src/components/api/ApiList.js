import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { defaultUrlApi } from '../../store/kudagoApi';
import axios from 'axios';
import '../../styles/loader.css';
import geolocation from '../../services/geolocation';
import Loader from '../loader/Loader';




export default class ApiList extends Component {
    constructor(props) {
        super(props);

        this.state = { dataApi: false };
    }

    componentDidMount() {
        const self = this;
        this.urlApi = '';

        geolocation.then( coord => {
            Object.keys(defaultUrlApi).forEach( key => {
                if(key === 'lon'){
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
        });

    }

    componentWillReceiveProps(nextProps){
        this.setState({ dataApi: false });

        if(this.props.radius !== nextProps.radius){
            this.requestApi(this.urlApi + nextProps.radius);
        }else{
            return false;
        }
    }

    shouldComponentUpdate(nextProps){
        return true;
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
                        }) : ( <Loader /> )
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

ApiList.propTypes = {
    radius: PropTypes.string.isRequired
};
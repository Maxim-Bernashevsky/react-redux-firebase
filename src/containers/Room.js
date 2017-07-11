import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemsForm from '../components/Room/ItemsForm';
import ItemsList from '../components/Room/ItemsList';
import Chat from '../components/Room/Chat';
import ExtraButtons from '../components/Room/ExtraButtons';
import ApiComponent from "../components/api/ApiComponent";
import { init } from '../actions/ItemActions';
import { isAdmin } from '../store/localStorage';
import { Link } from 'react-router-dom'

import logo from '../img/peach_logo.png'

class App extends Component {
    constructor(props){
        super(props);


    }
    shouldComponentUpdate(nextProps, nextState){

        // active class showLider
        if(nextState.scroll <= this.state.scroll){
            //console.log("UP");
            this.upScroll = 'showLider';
        }else{
            this.upScroll = '';
        }
    }

    componentDidMount(){
        this.props.ItemActions.init(200);
        const self = this;

        window.addEventListener('scroll', function(e){
            self.setState({ scroll: e.srcElement.scrollingElement.scrollTop });
        });

    };

    render() {
       
        const dataEmpty = !this.props.list.data ? false : this.props.list.data;
        return (
            <div
                ref={ (sl) => this.scrollControl = sl }
                className={this.props.user.useStyle}>

                {!this.props.list.chat ?
                    <div>
                        <img src="https://media.giphy.com/media/3oKIPcWgF3TsoFuNcQ/giphy.gif"
                             alt="loading" className="loader"/>
                    </div> :
                    <div>

                        <h2 className="main__title">ROOM</h2>
                        <div>
                            <img
                                className="header__logo-pic"
                                src={logo}
                                width="100"
                                height="104"
                                alt="PeachLunch"
                            />                                                                                                  {/* // LOGO */}

                        </div>


                        <Link className="trueEnter btn" to="/">{'<'}Back</Link>                                             {/* // BACK */}
                        <br/>
                        <br/><br/><br/>


                        <h1 className={"lider " + this.upScroll}>{this.props.list.lider.title}</h1>
                        {isAdmin() ? <ExtraButtons dropVote={this.props.list.lider.dropVote}/>
                            : <div></div>
                        }
                        <Chat messages={this.props.list.chat} />
                        <ItemsForm formType="add"/>
                        <ItemsList data={dataEmpty} />
                        <ApiComponent />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        list: state.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators({init}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


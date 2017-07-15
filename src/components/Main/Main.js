import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../styles/main.scss'
import logo from '../../img/peach_logo.png'
import { init } from '../../actions/ItemActions'

class Main extends Component{
    constructor(props){
        super(props);

        this.state = {
            login: '',
        }
        this.onChangeLogin = this.onChangeLogin.bind(this)
        this.getListRoomsUser = this.getListRoomsUser.bind(this)
    }

    componentDidMount(){
        this.props.ItemActions.init(200);
        const self = this;
    }

    onChangeLogin(e){
        this.setState({login: e.target.value})
    }
    getListRoomsUser(){
        console.dir(this.props)
        const users = this.props.users
        Object.keys(users).forEach(key => {
            console.log(users[key])
            if(users[key].login === this.state.login){
                this.setState({listRooms: users[key].listRooms})
                console.dir(users[key].listRooms)
            }

        })
    }

    render(){
        return (
            <div>

                <br/>
               <h2 className="main__title">MAIN PAGE!</h2>
                <div>
                    <img
                        className="header__logo-pic"
                        src={logo}
                        width="100"
                        height="104"
                        alt="PeachLunch"
                    />
                </div>

                <br/><br/><br/>

                <label htmlFor="login">user login</label>

                <br/>
                <div>
                    <input
                        id="login"
                        className="main__input"
                        onChange={this.onChangeLogin}
                        value={this.state.login}

                        type="text"/>

                    <a className="main__input" onClick={this.getListRoomsUser}>OK</a>

                    <ul className="list__rooms">
                    {this.state.listRooms ? (
                        Object.keys(this.state.listRooms).map(key => {
                          const room = this.state.listRooms[key]
                          return (
                              <li>
                                  <Link to="/room">{room.name}</Link>
                              </li>
                          )
                        })
                    ) : ''}
                    </ul>
                </div>

                <br/><br/>
                <div>

                </div>
            </div>
        );
    }
}


function mapStateToProps (state) {
    console.dir(state.list.users)
    return {

        users: state.list.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators({init}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

Main.propTypes = {
    // messages: PropTypes.object.isRequired
};

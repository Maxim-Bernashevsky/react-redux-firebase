import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemsForm from '../components/ItemsForm';
import ItemsList from '../components/ItemsList';
import Chat from '../components/Chat';
import ExtraButtons from '../components/ExtraButtons';
import { init } from '../actions/ItemActions';
import { isAdmin } from '../store/localStorage';



class App extends Component {

    constructor(props){
        super(props);
    }


    componentDidMount(){
        this.props.ItemActions.init(200);
    };

    render() {
        const dataEmpty = !this.props.list.data ? false : this.props.list.data;
        return (
            <div>
                {!this.props.list.chat ?
                    <div >
                        <img src="https://media.giphy.com/media/3oKIPcWgF3TsoFuNcQ/giphy.gif"
                             alt="loading" className="loader"/>
                    </div> :
                    <div>
                        {isAdmin() ? <ExtraButtons dropVote={this.props.list.lider.dropVote}/>
                            : <div></div>
                        }
                        <h1 className="lider">{this.props.list.lider.title}</h1>
                        <Chat messages={this.props.list.chat} />
                        <ItemsForm formType="add"/>
                        <ItemsList data={dataEmpty} />
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


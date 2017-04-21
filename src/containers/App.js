import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ItemsForm from '../components/ItemsForm';
import ItemsList from '../components/ItemsList';
import Chat from '../components/Chat';
import * as ItemActions from '../actions/ItemActions';
import ExtraButtons from '../components/ExtraButtons';

class App extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.ItemActions.init(200);
    };

    render() {
        return (
            <div>
                {!this.props.list.data ?
                    <div>
                        <img src="https://media.giphy.com/media/nZQIwSpCXFweQ/giphy.gif"
                             alt="loader"/>
                    </div> :
                    <div>
                        <h1 className="lider">{this.props.list.lider.title}</h1>

                        <Chat
                            messages={this.props.list.chat}
                            addMessage={this.props.ItemActions.addMessage}
                        />

                        <ItemsForm
                            addItem={this.props.ItemActions.addItem}
                            formType="add"
                        />

                        <ItemsList
                            data={this.props.list.data}
                            likeItem={this.props.ItemActions.likeItem}
                            deleteItem={this.props.ItemActions.deleteItem}
                            editItem={this.props.ItemActions.editItem}
                        />
                    </div>
                }
                <ExtraButtons />
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
        ItemActions: bindActionCreators(ItemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


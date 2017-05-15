import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/chat.css';
import { addMessage, toggleStyle } from '../actions/ItemActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Chat extends Component{


    constructor(props){
        super(props);

        this.state = {
            user: localStorage.getItem('user'),
            message: '',
            chatDisplay: 'none'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.toggleStyle = this.toggleStyle.bind(this);


    }

    onFieldChange(fieldName, e) {
        const val = e.target.value;
        if(fieldName === 'user') {
            localStorage.setItem('user', val);
        }
        this.setState({
            [''+fieldName]: val
        });
    }

    toggleStyle(){
        console.log(this.props.user.useStyle);
        let newStyle = this.props.user.useStyle === 'black' ? 'white' : 'black';

        console.log(newStyle);
        this.props.ItemActions.toggleStyle(newStyle);
    }

    toggleForm(){
        this.setState({
            message: "",
            chatDisplay: (this.state.chatDisplay === 'none' ? 'inherit' : 'none')
        });
    }

    handleSubmit() {
        if(this.state.message.length) {
            this.setState({message: ''});
            return this.props.ItemActions.addMessage(`${this.state.user}: ${this.state.message}`);
        }
    }

    render(){
        const { messages  } = this.props;
        const { user, chatDisplay, message } = this.state;

        return (
            <div>
                <div className="btnFormToggle btn btnChat" onClick={this.toggleForm}>#</div>
                <div
                    className="chatBlock"
                    style={{ display: chatDisplay }}>

                    <input
                        className="chatName"
                        type="text"
                        onChange={this.onFieldChange.bind(this, 'user')}
                        value={user || ''}/>
                    <div>
                        <div className="messageList">
                            <ul>{ Object.keys(messages).map((key) => {
                                    let item = messages[key];
                                        return <li key={key}>{item.text}</li>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <form>
                        <label htmlFor="message">Chat</label>
                        <textarea
                            className="chatMessage"
                            type="text"
                            onChange={this.onFieldChange.bind(this, 'message')}
                            value={message || ''}
                            placeholder="text message"
                            rows="3"
                        />
                        <div
                            onClick={this.handleSubmit}
                            className="chatSubmit"
                            type="submit"
                        >>></div>
                        <div
                            onClick={this.toggleStyle}
                            className="btn"
                        >!!!!</div>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators({addMessage, toggleStyle}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

Chat.propTypes = {
    messages: PropTypes.object.isRequired
};

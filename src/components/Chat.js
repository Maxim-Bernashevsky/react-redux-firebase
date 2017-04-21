import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/chat.css';

export default class Chat extends Component{



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
    }

    onFieldChange(fieldName, e) {
        const val = e.target.value;
        if(fieldName === 'user') localStorage.setItem('user', val);
        this.setState({
            [''+fieldName]: val
        });
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
            return this.props.addMessage(`${this.state.user}: ${this.state.message}`);
        }
    }


    render(){
        return (
            <div>
                <div className="btnFormToggle btn btnChat" onClick={this.toggleForm}>#</div>
                <div
                    className="chatBlock"
                    style={{ display: this.state.chatDisplay }}>

                        <input
                            className="chatName"
                            type="text"
                            onChange={this.onFieldChange.bind(this, 'user')}
                            value={this.state.user || ''}/>
                    <div>
                        <div className="messageList">
                            <ul>{ Object.keys(this.props.messages).map((key) => {
                                    let item = this.props.messages[key];
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
                            value={this.state.message || ''}
                            placeholder="text message"
                            rows="3"
                        />
                        <div
                            onClick={this.handleSubmit}
                            className="chatSubmit"
                            type="submit"
                        >>></div>
                    </form>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    messages: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
};

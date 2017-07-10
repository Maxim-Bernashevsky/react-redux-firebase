import React, { Component } from 'react';
import '../../styles/extraButton.scss';
import { checkDropVote } from '../../store/localStorage';
import { newFlagDB } from '../../actions/ItemActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ExtraButtons extends Component {
    constructor(props) {
        super(props);

        this.checkFlag = checkDropVote.bind(this);
        this.flagDB = this.props.dropVote;
        this.checkFlag(this.flagDB);
        this.dropLikes = this.dropLikes.bind(this);
    }

    dropLikes(){
        const newFlagToDB = +new Date();
        this.props.ItemActions.newFlagDB(newFlagToDB);
        this.checkFlag(newFlagToDB);
    }

    render(){
        return (
            <div className="extra-buttons">
                <div className="btn" onClick={this.dropLikes}>Drop counters</div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators({ newFlagDB }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ExtraButtons);


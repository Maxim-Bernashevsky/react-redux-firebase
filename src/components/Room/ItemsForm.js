import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addItem, editItem, deleteItem, apiToBaseItem } from '../../actions/ItemActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isAdmin } from '../../store/localStorage';

let config = {
    form: {
        type: {
            edit: {
                titleForm: 'Редактировать место',
                titleSubmit: 'Сохранить',
                btnValue: '//'
            },
            add: {
                titleForm: 'Добавить новое место',
                titleSubmit: 'Добавить',
                btnValue: '+'
            }
        }
    }
};

class ItemsForm extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            subtitle: "",
            logoUrl: "",
            formDisplay: 'none'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.apiToBaseItem = this.apiToBaseItem.bind(this);
    }

    onFieldChange(fieldName, e) {
        const val = e.target.value;
        this.setState({
            [''+fieldName]: val
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let item = {};

        if(this.props.formType === 'edit'){
            item.id =  this.props.id;
            item.title = this.state.title || this.props.title || '';
            item.subtitle = this.state.subtitle || this.props.subtitle || '';
            item.logoUrl = this.state.logoUrl || 'https://source.unsplash.com/category/food';
            this.props.ItemActions.editItem(item);
        }else{
            item.id = false;
            item.title = this.state.title || this.props.title || '';
            item.subtitle = this.state.subtitle || this.props.subtitle || '';
            item.logoUrl = this.state.logoUrl ? this.state.logoUrl
                : 'https://source.unsplash.com/category/food';
            item.like = 0;
            this.props.ItemActions.addItem(item);
        }
        this.toggleForm();
    }

    toggleForm(){
        this.setState({
            id: this.props.id,
            title: this.props.title,
            subtitle: this.props.subtitle,
            logoUrl: this.props.logoUrl,
            formDisplay: (this.state.formDisplay === 'none' ? 'inherit' : 'none')
        });
    }

    apiToBaseItem(){
        const item = {
            id:  this.props.id,
            title: this.state.title || this.props.title || '',
            subtitle: this.state.subtitle || this.props.subtitle || '',
            logoUrl: this.state.logoUrl || this.props.logoUrl || 'https://source.unsplash.com/category/food',
            like: 0
        };
        this.props.ItemActions.apiToBaseItem(item);
    }


    render() {
        const self = this;
        const { typeItem, formType, id } = self.props;
        const { formDisplay, title, logoUrl, subtitle } = self.state;
        const stateBtn = {
            classBtn: self.state.formDisplay === 'none' ? 'btnFormToggle btn' : 'btnFormToggle btn btn-active',
            valBtn: config.form.type[formType].btnValue,
            typeItem: typeItem
        };
        if(formType === 'add'){
            stateBtn.toRender = (
                <div
                    className={stateBtn.classBtn}
                    onClick={this.toggleForm}>{stateBtn.valBtn}</div>
            );
        }else {
            stateBtn.toRender = (
                <div className="btn-block">
                    {isAdmin() ?
                        <div className="delete-btn btn"
                        onClick={() => this.props.ItemActions.deleteItem(id)}>X</div>
                        : <div></div> }
                    {stateBtn.typeItem === 'api' ?
                        <div className="delete-btn btn"
                             onClick={this.apiToBaseItem}>^</div>
                        : <div
                            className={stateBtn.classBtn}
                            onClick={this.toggleForm}>{stateBtn.valBtn}</div>
                    }
                </div>
            );
        }

        return (
            <div className={formType === 'add' ? 'newItem' : ''}>
                <div className="modal">
                    { stateBtn.toRender }

                    <form
                        className="bg-gradient-dark"
                        onSubmit={this.handleSubmit}
                        style={{ display: formDisplay }}>

                        <fieldset>
                            <legend>{config.form.type[formType].titleForm}</legend>
                            <label>
                                Название <br/>
                                <input
                                    type="text"
                                    value={title || ''}
                                    onChange={this.onFieldChange.bind(this, 'title')} />
                            </label>
                            <label>
                                Url изображения <br/>
                                <input
                                    type="text"
                                    value={logoUrl || ''}
                                    onChange={this.onFieldChange.bind(this, 'logoUrl')} />
                            </label>
                            <label>
                                Описание <br/>
                                <textarea
                                    rows="4"
                                    type="text"
                                    value={subtitle || ''}
                                    onChange={this.onFieldChange.bind(this, 'subtitle')} />
                            </label>
                            <div
                                className="submitBtn"
                                onClick={this.handleSubmit}
                                type="submit">{config.form.type[formType].titleSubmit}</div>

                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
};


function mapDispatchToProps(dispatch) {
    return {
        ItemActions: bindActionCreators({
            addItem, editItem, deleteItem, apiToBaseItem}, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(ItemsForm);

ItemsForm.propTypes = {
    typeItem: PropTypes.string,
    formType: PropTypes.string.isRequired,
    id: PropTypes.string,
    logoUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

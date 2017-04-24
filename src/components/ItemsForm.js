import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default class ItemsForm extends Component {

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

        if(this.props.editItem){
            item.id =  this.props.id;
            item.title = this.state.title || this.props.title || '';
            item.subtitle = this.state.subtitle || this.props.subtitle || '';
            item.logoUrl = this.state.logoUrl || 'https://source.unsplash.com/category/food';
            this.props.editItem(item);
        }else{
            item.id = false;
            item.title = this.state.title || this.props.title || '';
            item.subtitle = this.state.subtitle || this.props.subtitle || '';
            item.logoUrl = this.state.logoUrl ? this.state.logoUrl
                : 'https://source.unsplash.com/category/food';
            item.like = 0;
            this.props.addItem(item);
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

    render() {
        const self = this;
        let stateBtn = {
            classBtn: self.state.formDisplay === 'none' ? 'btnFormToggle btn' : 'btnFormToggle btn btn-active',
            valBtn: config.form.type[self.props.formType].btnValue,
        };
        if(this.props.formType === 'add'){
            stateBtn.toRender = (
                <div
                    className={stateBtn.classBtn}
                    onClick={this.toggleForm}>{stateBtn.valBtn}</div>
            );
        }else {
            stateBtn.toRender = (
                <div className="btn-block">
                    {localStorage.getItem('user') === 'Maxim' ?
                        <div className="delete-btn btn"
                        onClick={() => this.props.delete(this.props.id)}>X</div>
                        : <div></div>
                    }
                    <div
                        className={stateBtn.classBtn}
                        onClick={this.toggleForm}>{stateBtn.valBtn}</div>
                </div>
            );
        }

        return (
            <div className={this.props.formType === 'add' ? 'newItem' : ''}>
                <div className="modal">
                    { stateBtn.toRender }

                    <form
                        className="bg-gradient-dark"
                        onSubmit={this.handleSubmit}
                        style={{ display: this.state.formDisplay }}>

                        <fieldset>
                            <legend>{config.form.type[this.props.formType].titleForm}</legend>
                            <label>
                                Название <br/>
                                <input
                                    type="text"
                                    value={this.state.title || ''}
                                    ref="title"
                                    onChange={this.onFieldChange.bind(this, 'title')} />
                            </label>
                            <label>
                                Url изображния <br/>
                                <input
                                    type="text"
                                    value={this.state.logoUrl || ''}
                                    ref="logoUrl"
                                    onChange={this.onFieldChange.bind(this, 'logoUrl')} />
                            </label>
                            <label>
                                Описание <br/>
                                <textarea
                                    rows="4"
                                    type="text"
                                    value={this.state.subtitle || ''}
                                    ref="subtitle"
                                    onChange={this.onFieldChange.bind(this, 'subtitle')} />
                            </label>

                            <input
                                type="submit"
                                value={config.form.type[this.props.formType].titleSubmit}
                                ref='alert_button' />
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
};

ItemsForm.propTypes = {
    formType: PropTypes.string.isRequired,
    addItem: PropTypes.func,
    editItem: PropTypes.func,
    delete: PropTypes.func,
    id: PropTypes.string,
    logoUrl: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string
};

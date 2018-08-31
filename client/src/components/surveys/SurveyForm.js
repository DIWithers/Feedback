import React,  { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return (
            formFields.map(field => 
                <div key={field.name}>
                    <Field
                        label= {field.label}
                        type= {field.type}
                        name= {field.name} 
                        component= {SurveyField}
                    />
                </div>
            )
        )
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                        <i className="material-icons right">close</i>
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || "");

    formFields.forEach(({ name, required }) => {
        if (required && !values[name]) {
            errors[name] = `${capitalCase(name)} must be provided.`;
        }
    });
    return errors;
}

function capitalCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
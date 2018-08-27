import _ from 'lodash';
import React,  { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {label: "Survey Title", type: "text", name: "title", required: true},
    {label: "Survey Line", type: "text", name: "subject", required: true},
    {label: "Email Body", type: "text", name: "body", required: true},
    {label: "Recipient List", name: "emails", required: true}
]

class SurveyForm extends Component {
    renderFields() {
        return (
            FIELDS.map(field => 
                <div>
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

    errors.emails = validateEmails(values.emails || "");

    FIELDS.forEach(({ name, required }) => {
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
    form: 'surveyForm'
})(SurveyForm);
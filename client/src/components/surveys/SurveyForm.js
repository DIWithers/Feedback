import _ from 'lodash';
import React,  { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

const FIELDS = [
    {label: "Survey Title", type: "text", name: "title"},
    {label: "Survey Line", type: "text", name: "subject"},
    {label: "Email Body", type: "text", name: "body"},
    {label: "Recipient List", name: "emails"}
]

class SurveyForm extends Component {
    renderFields() {
        return (
            FIELDS.map(field => 
                <Field
                    label= {field.label}
                    type= {field.type}
                    name= {field.name} 
                    component= {SurveyField}
                />
            )
        )
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
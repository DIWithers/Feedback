import _ from 'lodash';
import React,  { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
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
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);
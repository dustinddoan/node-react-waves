import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../utils/form/FormField'
import { update, generateData, isFormValid } from '../utils/form/formActions'

class UpdateInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your last name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'update_user')
    
    this.setState({
      formError: false,
      formData: newFormdata
    })
  } 

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'update_user');

    let formIsValid = isFormValid(this.state.formData, 'update_user');

    if(formIsValid) {
      console.log(dataToSubmit);
      
    } else {
      this.setState({
        formError: true
      })
    }

  }

  render() {
    return (
      <div>
        info
      </div>
    );
  }
}

export default UpdateInfo;
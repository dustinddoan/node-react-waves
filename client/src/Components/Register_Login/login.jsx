import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; 
// to inject props from parent to children

import FormField from '../utils/form/FormField'
import { update, generateData, isFormValid } from '../utils/form/formActions'

import { loginUser } from '../../actions/user_actions';
class Login extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formData: {
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
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formData, 'login')
    
    this.setState({
      formError: false,
      formData: newFormdata
    })
  }
  
  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'login');

    let formIsValid = isFormValid(this.state.formData, 'login');

    if(formIsValid) {
      console.log(dataToSubmit);
      this.props.dispatch(loginUser(dataToSubmit))
        .then(response => {
          if (response.payload.loginSuccess) {
            console.log(response.payload)
            this.props.history.push('/user/dashboard')
          } else {
            this.setState({
              formError: true
            })
          }
        })
      // this.props.dispatch(loginUser(dataToSubmit)).then(response => {
      //   console.log(response)
      // })

    } else {
      this.setState({
        formError: true
      })
    }

  }

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>
          <FormField
            id={'email'}
            formdata={this.state.formData.email}
            change={(element) => this.updateForm(element)}
            // element = {event, id}
          />
          <FormField
            id={'password'}
            formdata={this.state.formData.password}
            change={(element) => this.updateForm(element)}         
          />

          { this.state.formError ?
            <div className="error_label">
              Please check your credential
            </div>
          : null }

          <button onClick={(event) => this.submitForm(event)}>
            Log in
          </button>

        </form>
        
      </div>
    )
  }
}

export default connect()(withRouter(Login));
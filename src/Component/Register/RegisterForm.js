import React from 'react'
import { Field, reduxForm } from 'redux-form'

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting,submitCB } = props
  return (
    <form onSubmit={handleSubmit(submitCB)}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            className = 'form-control'
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
            className = 'form-control'
          />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <Field
            name="lpassword"
            component="input"
            type="password"
            className = 'form-control'
          />
        </div>
      </div>
      <div>
        <label>Password Confirmation</label>
        <div>
          <Field
            name="passwordConfirmation"
            component="input"
            type="password"
            className = 'form-control'
          />
        </div>
      </div>
      <div>
        <button className = 'btn btn-bwm btn-form ' type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'registerForm' // a unique identifier for this form
})(RegisterForm)

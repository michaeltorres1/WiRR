import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState ({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  
  const onChange = e => setFormData ({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Invalid, passwords don't match!");
    } else {
      register({ name, email, password });
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1> Please sign Up</h1>
          <form className='form form-register' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                className="name-input-register"
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                className="email-input"
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                className="password-input"
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                className="password-input"
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary btn-register' value='Register' />
          </form>
          <p> or <Link to="/login" className="signup-or-signin">Sign In</Link></p>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register }
)(Register);

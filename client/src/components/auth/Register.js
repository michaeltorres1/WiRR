import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ register }) => {
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

  return (
    <div>
      <h1 className='large text-primary'>Sign Up</h1>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p>
        or <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired
};

export default connect(
  null,
  { register }
)(Register);

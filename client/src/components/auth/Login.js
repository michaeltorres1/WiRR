import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
    console.log('Logged in');
  }

  return (
    <div>
      <h1 className='large text-primary'>Sign In</h1>
      <form className='form' onSubmit={e => onSubmit(e)}>
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
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p>
        or <Link to="/login">Sign Up</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
}

export default connect(null, { login })(Login);

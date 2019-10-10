import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layout/alert';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  
  const onChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  
  const onSubmit = e => {
    e.preventDefault();

    if ("" in formData) {
      login ('demo@gmail.com', 'password');
    }
    
    login(email, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <section className="landing">
        <div className="landing-inner">
          <h1>Please sign in</h1>
          <Alert />
          <form className='form form-login' onSubmit={e => onSubmit(e)}>
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
            <input type='submit' className='btn btn-primary' value='Login' />
            <input type='submit' onClick={e => onChange(e)} className='btn btn-primary' value='DEMO' />
            <p> or <Link to="/register" className="signup-or-signin">Sign Up</Link></p>
          </form>
          </div>
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

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
    login(email, password);
    console.log('Logged in');
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <section className="login">
      <div className="dark-overlay">
        <div className="login-inner">
          <div className="container container-login">
          <h1 className="signin-title">Sign In</h1>
          <form className='form-login' onSubmit={e => onSubmit(e)}>
            <div className='form-group-login-email'>
              <input
                className="email-login"
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                className="password-login"
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary btn-login' value='Login' />
          </form>
          <p className="or-register"> or <Link to="/register">Sign Up</Link> </p>
          </div>
        </div>
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

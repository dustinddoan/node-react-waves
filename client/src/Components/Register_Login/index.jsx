import React from 'react';
import MyButton from '../utils/button'
import Login from './login'

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores repudiandae praesentium obcaecati nostrum distinctio vel corporis dolor quis aperiam quam, soluta sed sequi totam incidunt blanditiis, quidem alias nobis consectetur?</p>
            <MyButton 
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyle={{ margin: '10px 0 0 0 '}}
            />
          </div>
          
          <div className="right">
            <h2>Registered Customer</h2>
            <Login/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
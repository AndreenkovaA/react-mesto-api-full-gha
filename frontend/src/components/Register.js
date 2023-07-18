import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({formValue, setFormValue, onRegister}) => {
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (buttonDisabled()) {
      return;
    }

    onRegister();
  }

  const buttonDisabled = () => !formValue.email || !formValue.password;

  return (
    <div className="auth">
      <p className="auth__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="form__auth">
        <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder="Email" required />
        <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" required />
        <div className="auth__button-container">
          <button type="submit" onSubmit={handleSubmit} className={`form__button-submit  form__button-submit_type_auth 
          ${!formValue.email ? 'form__button-submit_disabled-auth' : !formValue.password ? 'form__button-submit_disabled-auth' : ''}`}>Зарегистрироваться</button>
        </div>
      </form>
      <div className="auth__signin">
        <p className="auth__question">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link">Войти</Link>
      </div>
    </div>
  );
}


export default Register; 
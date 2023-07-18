import React from 'react';

const Login = ({formValue, setFormValue, onLogin}) => {

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }

    onLogin();
  }

  return (
    <div className="auth">
      <p className="auth__title">Вход</p>
      <form onSubmit={handleSubmit} className="form__auth">
        <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder="Email" required />
        <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder="Пароль" required />
        <div className="auth__button-container">
          <button type="submit" onSubmit={handleSubmit} className="form__button-submit form__button-submit_type_auth">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
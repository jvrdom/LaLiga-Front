import React from 'react';
import { useLogin, useNotify } from 'react-admin';
import LoginButtons from './loginButtons';

export default function Login() {
  const login = useLogin();
  const notify = useNotify();

  function onLoginSocial(event) {
    login({ idProvider: event.target.dataset.provider })
      .catch((error) => notify(`${error}`));
  }

  return (
    <div className="limiter">
      <div className="container">
        <div className="wrapper">
          <LoginButtons onClickBtn={onLoginSocial} />
        </div>
      </div>
    </div>
  );
}

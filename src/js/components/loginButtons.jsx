import React from 'react';
import PropTypes from 'prop-types';

import FacebookIcon from '../../icons/facebook.svg';
import GoogleIcon from '../../icons/google.svg';
import TwitterIcon from '../../icons/twitter.svg';

export default function LoginButtons(props) {
  const { onClickBtn } = props;

  const buttons = [
    {
      icon: <FacebookIcon />,
      text: 'Facebook',
      class: 'btn--facebook',
      provider: 'facebook',
    },
    {
      icon: <GoogleIcon />,
      text: 'Google',
      class: 'btn--google',
      provider: 'google',
    },
    {
      icon: <TwitterIcon />,
      text: 'Twitter',
      class: 'btn--twitter',
      provider: 'twitter',
    },
  ];

  return (
    <form className="social-form">
      <span className="social-form__title">Sign In With</span>
      {
        buttons.map((btn) => (
          <button
            className={`btn ${btn.class}`}
            data-provider={btn.provider}
            key={btn.text.toLowerCase()}
            onClick={(e) => onClickBtn(e)}
            type="button"
          >
            {btn.icon}
            {btn.text}
          </button>
        ))
      }
    </form>
  );
}

LoginButtons.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
};

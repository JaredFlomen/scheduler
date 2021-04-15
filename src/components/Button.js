import React from 'react';
import classnames from 'classnames';
import '../styles/Button.scss';

export default function Button({
  confirm,
  danger,
  disabled,
  onClick,
  children,
}) {
  const buttonClass = classnames('button', {
    'button--confirm': confirm,
    'button--danger': danger,
  });

  return (
    <button disabled={disabled} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

import React from 'react';
import Button from '../Button';

export default function Confirm({ message, keepInterview, cancelInterview }) {
  return (
    <main className='appointment__card appointment__card--confirm'>
      <h1 className='text--semi-bold'>{message}</h1>
      <section className='appointment__actions'>
        <Button danger onClick={keepInterview}>
          Cancel
        </Button>
        <Button danger onClick={cancelInterview}>
          Confirm
        </Button>
      </section>
    </main>
  );
}

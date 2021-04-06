import React from 'react';
import 'styles/styles.scss';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';
import useVisualMode from 'Hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = 'SAVE';
const CONFIRM = 'CONFIRM';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment({
  id,
  time,
  interviewers,
  interview,
  bookInterview,
  cancelInterview,
}) {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function cancelInterview() {
    transition(CONFIRM);
  }

  function keepInterview() {
    transition(SHOW);
  }

  function editInterview() {
    transition(EDIT);
  }

  function confirmCancelInterview() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className='appointment' data-testid='appointment'>
      <Header time={time} />
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          cancelInterview={cancelInterview}
          editInterview={editInterview}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message='Are you sure you would like to delete?'
          cancelInterview={confirmCancelInterview}
          keepInterview={keepInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message='Could not save the appointment'
          cancelInterview={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message='Could not delete the appointment'
          cancelInterview={keepInterview}
        />
      )}
      {mode === SAVE && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
    </article>
  );
}

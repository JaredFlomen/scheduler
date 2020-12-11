import React from "react";
import "styles/styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'Hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
  }

  function cancelInterview() { transition(CONFIRM) }

  function keepInterview() { transition(SHOW) }

  function editInterview() { transition(EDIT) }

  function confirmCancelInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(res => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={onSave}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers} 
            onCancel={() => back()}
            onSave={onSave}
          />
        )}
        {mode === EMPTY && (
          <Empty 
            onAdd={() => transition(CREATE)} 
          />
        )}
        {mode === SHOW && (
          <Show 
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            cancelInterview={cancelInterview}
            editInterview={editInterview}
          />
        )}
        {mode === SAVE && (<Status message="Saving" /> )}
        {mode === DELETING && (<Status message="Deleting" />)}
        {mode === CONFIRM && (
          <Confirm 
            message="Are you sure you would like to delete?" 
            cancelInterview={confirmCancelInterview}
            keepInterview={keepInterview}
          />)}
    </article>
  );
}
import React from "react";
import classnames from 'classnames';
import "../styles/InterviewerList.scss";


export default function InterviewrList() { 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
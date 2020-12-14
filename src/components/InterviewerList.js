import React from "react";
import InterviewerListItem from './InterviewerListItem'
import "../styles/InterviewerList.scss";
import PropTypes from 'prop-types';


export default function InterviewerList(props) { 
  const { interviewers } = props

  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };

  const parsedInterviewList = interviewers.map(interviewer => <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.interviewer}
    setInterviewer={event => props.setInterviewer(interviewer.id)}
  />)
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { parsedInterviewList }
      </ul>
    </section>
  );
}
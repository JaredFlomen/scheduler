import React from "react";
import InterviewerListItem from './InterviewerListItem'
import "../styles/InterviewerList.scss";


export default function InterviewerList(props) { 
  const { interviewers } = props
  const parsedInterviewList = interviewers.map(interview => <InterviewerListItem 
    key={interview.id}
    name={interview.name}
    avatar={interview.avatar}
    selected={interview.id === props.interviewer}
    setInterviewer={props.setInterviewer}
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
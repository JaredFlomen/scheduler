import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';
import '../styles/InterviewerList.scss';

export default function InterviewerList({
  interviewer,
  interviewers,
  setInterviewer,
}) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired,
  };

  const parsedInterviewList = interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
      //Name of the interviewer
      name={interviewer.name}
      //Url to an image of the interviewer
      avatar={interviewer.avatar}
      //Boolean to determine if selected or not
      selected={interviewer.id === interviewer}
      //Sets the interviewer upon selection
      setInterviewer={() => setInterviewer(interviewer.id)}
    />
  ));

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{parsedInterviewList}</ul>
    </section>
  );
}

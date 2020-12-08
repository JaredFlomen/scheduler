import React, { useState } from "react";
import classnames from 'classnames';
import "../styles/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item--image": props.avatar,
  });


  return (
    <li className="interviewers__item"> 
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
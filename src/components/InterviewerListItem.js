import React, { useState } from "react";
import classnames from 'classnames';
import "../styles/InterviewerListItem.scss";

export default function InterviewerListItem() {
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
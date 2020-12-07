import React from 'react';
import classnames from 'classnames';
import "components/DayListItem.scss";
import { action } from "@storybook/addon-actions/dist/preview";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });  

  const formatSpots = (spots) => {
    if (spots === 0) return "no spots remaining"
    if (spots === 1) return "1 spot remaining"
    return `${spots} spots remaining`
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h3>{props.name}</h3>
      <h2>{formatSpots(props.spots)}</h2>
    </li>
  );
}
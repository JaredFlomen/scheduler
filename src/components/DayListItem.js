import React from 'react';
import classnames from 'classnames';
import '../styles/DayListItem.scss';

export default function DayListItem(props) {
  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = spots => {
    if (spots === 0) return 'No spots remaining';
    if (spots === 1) return '1 spot remaining';
    return `${spots} spots remaining`;
  };

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid='day'
    >
      <h3>{props.name}</h3>
      <h2>{formatSpots(props.spots)}</h2>
    </li>
  );
}

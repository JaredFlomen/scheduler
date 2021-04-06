import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList({ days, day, setDay }) {
  const parsedDayList = days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === day}
      setDay={setDay}
    />
  ));
  return <ul>{parsedDayList}</ul>;
}

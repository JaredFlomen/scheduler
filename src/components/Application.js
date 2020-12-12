import React, { useState, useEffect } from "react";
import axios from 'axios';
import { parse } from "@babel/core";
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import "../styles/Application.scss";
import getAppointmentsForDay from '../Helpers/selectors';
import { getInterviewersForDay } from 'Helpers/selectors';
import { getInterview } from '../Helpers/selectors';
import useApplicationData from 'Hooks/useApplicationData'

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //Transforming the data from the API request
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  //An array with data of the interviewers for a given day
  const interviewers = getInterviewersForDay(state, state.day);

  //Iterates over the dailyAppointments array 
  const parsedAppointments = dailyAppointments.map(appointment => {

  return (
    <Appointment 
      key={appointment.id}
      id={appointment.id}
      time={appointment.time} 
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />);
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { parsedAppointments }
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}

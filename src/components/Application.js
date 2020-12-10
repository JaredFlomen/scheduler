import React, { useState, useEffect } from "react";
import axios from 'axios';
import { parse } from "@babel/core";

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';

import "../styles/Application.scss";

import getAppointmentsForDay from '../Helpers/selectors';
import { getInterviewersForDay } from 'Helpers/selectors';
import { getInterview } from '../Helpers/selectors';
import useVisualMode from 'Hooks/useVisualMode';

export default function Application(props) {

  //Grouping state in one object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  //Transforming the data from the API request returning an array of appointments for the given day
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  //Iterates over the dailyAppointments array 
  const parsedAppointments = dailyAppointments.map(appointment => {

    //An object containing interview data
    const interview = getInterview(state, appointment.interview);

    //Finds the interviewers for a given day
    const interviewers = getInterviewersForDay(state, state.day);

    return (<Appointment 
      key={appointment.id} 
      id={appointment.id} 
      time={appointment.time} 
      interview={interview} 
      interviewers={interviewers}
    />);
  });

  //Tracks when the day is changed
  const setDay = day => setState({ ...state, day });

  //Resovles many Promieses and handles them
  useEffect(() => {
    Promise.all([ 
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      //Updating both days and appointments request at the same time
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

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
      </section>
    </main>
  );
}

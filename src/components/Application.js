import React from 'react';
import '../styles/Application.scss';
import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import getAppointmentsForDay, {
  getInterviewersForDay,
  getInterview,
} from 'Helpers/selectors';
import useApplicationData from 'Hooks/useApplicationData';

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  //An array with data of appointments for a given day
  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {parsedAppointments}
        <Appointment id='last' time='5pm' />
      </section>
    </main>
  );
}

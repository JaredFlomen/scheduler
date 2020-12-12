import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  //Grouping state in one object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  function bookInterview(id, interview) {
      const axiosPromise = axios.put(`/api/appointments/${id}`, {
        interview
      })
      .then(res => {
        
        for (let day of [...state.days]) {
          if (day.appointments.includes(id)) {
            day.spots -= 1;
          }
        }
          
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
      })
      return axiosPromise;
  }

  function cancelInterview(id) {

      const axiosPromise = axios.delete(`/api/appointments/${id}`, {
      })
      .then(res => {

        for (let day of [...state.days]) {
          if (day.appointments.includes(id)) {
            day.spots += 1;
          }
        }
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({
          ...state,
          appointments
        });
      })
      return axiosPromise;
  }

  //Tracks when the day is changed
  const setDay = day => setState({ ...state, day });

  //Resovles many Promieses and handles them
  useEffect(() => {
    Promise.all([ 
      axios.get('api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then((all) => {
      //Updates the days, appointments and interviewers request at the same time
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview }

}
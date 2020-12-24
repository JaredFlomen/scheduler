import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  //Grouping state in one object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  })

  //Tracks when the day is changed
  const setDay = day => setState({ ...state, day });

  //Resovles many Promieses and handles them
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      //Updates the days, appointments and interviewers request at the same time
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  function bookInterview(id, interview) {
      const axiosPromise = axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
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
      .then(() => {
        return axios.get('/api/days')
      })
      //Updates spots remaining
      .then(res => {
        setState(prev => ({...prev, days: res.data}))
      })
      return axiosPromise;
  }

  function cancelInterview(id) {

      const axiosPromise = axios.delete(`/api/appointments/${id}`)
      .then(() => {
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
      .then(() => {
        return axios.get('/api/days')
      })
      //Updates spots remaining
      .then(res => {
        setState(prev => ({...prev, days: res.data}))
      })
      return axiosPromise;
  }
  return { state, setDay, bookInterview, cancelInterview }
}
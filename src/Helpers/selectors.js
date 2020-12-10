export default function getAppointmentsForDay(state, day) {
  if (!state.days.length) return []

  //Finds the correct day in the state array
  const parsedDays = state.days.filter(currentDay => currentDay.name === day);

  if (!parsedDays.length) return [];

  //An array containing values (numbers) which correspond to appointment IDs
  const appointmentKeys = parsedDays[0].appointments

  //Iterating over the IDs to build an array containing the appointments
  const appointmentArray = appointmentKeys.map(apptID => state.appointments[apptID])

  return appointmentArray
}

export function getInterviewersForDay(state, day) {
  if (!state.days.length) return []

  //Finds the correct day in the state array
  const parsedDays = state.days.filter(currentDay => currentDay.name === day);

  if (!parsedDays.length) return [];

  //An array containing numbers which correspond to IDs of interviewers
  const interviewersKey = parsedDays[0].interviewers

  //Iterating over the IDs, building an array with the interviewers data
  const interviewerArray = interviewersKey.map(intKey => state.interviewers[intKey])

  return interviewerArray
}


export function getInterview(state, interview) {
  if (!interview) return null;

  //A number that will correspond to the ID of an interivewer
  const interviewerID = interview.interviewer

  //An object that contains information of the interviewer
  const interviewerObject = state.interviewers[interviewerID]

  //An object containing interview data (student and interviewer)
  const interviewObject = {
    student: interview.student, 
    interviewer: interviewerObject
  }
  
  return interviewObject;
}
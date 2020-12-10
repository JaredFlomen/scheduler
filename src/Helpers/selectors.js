export default function getAppointmentsForDay(state, day) {
  if (!state.days.length) return []

  //Finds the correct day in the state array
  const parsedDays = state.days.filter(week => week.name === day);

  if (!parsedDays.length) return [];

  //An array containing values (numbers) which correspond to appointment IDs
  const appointmentKeys = parsedDays[0].appointments

  //Iterating over the IDs to build an array containing the appointments
  const appointmentArray = appointmentKeys.map(apptID => state.appointments[apptID])

  return appointmentArray
}


export function getInterview(state, interview) {
  if (!interview) return null;

  //A number that will correspond to the ID of an interivewer
  const interviewerKey = interview.interviewer

  //An object that contains information of the interviewer
  const interviewersObject = state.interviewers[interviewerKey]

  //An object containing interview data (student and interviewer)
  const interviewObject = {
    student: interview.student, 
    interviewer: interviewersObject
  }
  
  return interviewObject;
}
export function getAppointmentsForDay(state, day) {
  if (!state.days.length) return []

  const parsedDays = state.days.filter(week => week.name === day);

  if (!parsedDays.length) return [];

  const appointmentKey = parsedDays[0].appointments

  return (
    appointmentObj = appointmentKey.map(appt => state.appointments[appt])
  );
}
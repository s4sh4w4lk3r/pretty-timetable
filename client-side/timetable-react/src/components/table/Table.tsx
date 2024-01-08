function getCurrentWeekNumber() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
    - 3 + (week1.getDay() + 6) % 7) / 7);
}

export default function Table() {

// const timetable = dada.getActualTimetableByGroupId(12);

// const items = timetable?.cards?.map(e=> <li>{ `${e.teacher.lastname} ${e.subject.name} ${e.cabinet.fullName} ${e.subGroup} ${e.date}`}</li>)

  

  return (<div></div>)
}

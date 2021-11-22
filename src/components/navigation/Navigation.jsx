import React from "react";

import { days } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        let todayDate = dayDate.getDate() === new Date().getDate() &&
          days[dayDate.getDay()] === days[new Date().getDay()] ?
          'today day-label__day-number' : 'day-label__day-number';
        let todayName = days[dayDate.getDay()] === days[new Date().getDay()] &&
          dayDate.getDate() === new Date().getDate() ?
          'day-label__day-name todayName ' : 'day-label__day-name';
        return (
          <div key={dayDate} className="calendar__day-label day-label">
            <span className={todayName}>{days[dayDate.getDay()]}</span>
            <span className={todayDate}>{dayDate.getDate()}</span>
          </div>
        )
      })}
      
    </header>
  );
};

export default Navigation;

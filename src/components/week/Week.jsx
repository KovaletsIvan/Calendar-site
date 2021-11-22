import React from "react";
import Day from "../day/Day";

import "./week.scss";

const Week = ({ weekDates, events, showElem, removeEvents, getEventData, redline, togleVisibility }) => {


  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            showElem={showElem}
            removeEvents={removeEvents}
            getEventData={getEventData}
            redline={redline}
            togleVisibility={togleVisibility}
          />
        );
      })}
    </div>
  );
};

export default Week;

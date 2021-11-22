import React from "react";
import Hour from "../hour/Hour";
import "./day.scss";



const Day = ({ dataDay, dayEvents, removeEvents, getEventData, redline }) => {


  const hours = Array(24)
    .fill()
    .map((val, index) => index);
  const thisDay = new Date().getDate()

  const redLine = thisDay === dataDay ? redline : null;

  return (
    <div className="calendar__day" data-day={dataDay}>

      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            removeEvents={removeEvents}
            getEventData={getEventData}
          />
        );
      })}
      {redLine}
    </div>
  );
};

export default Day;

import React from "react";
import { useState } from "react";
import { removeEvent } from "../../gateway/events";

import "./event.scss";

const Event = ({ height, marginTop, title, time, id, removeEvents, getEventData }) => {
  const [classBtn, setClassBtn] = useState(false)

  const eventStyle = {
    height,
    marginTop,
  };
  let classToSet = classBtn ? 'delete-event-btn' : 'btn delete-event-btn'
  return (
    <div style={eventStyle} className="event" id={id} onClick={() => setClassBtn(!classBtn)}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <button id={id}
        className={classToSet}
        onClick={(e) => { removeEvents(e); getEventData(); }}>
        <i className="fas fa-trash"></i>remove</button>
    </div>

  );
};

export default Event;

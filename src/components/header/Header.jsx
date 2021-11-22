import React from "react";
import { months } from "../../utils/dateUtils.js";
import "./header.scss";

const Header = (props) => {

  const uniqeMonthesInArray = [... new Set(props.weekDates.map(elem => elem.getMonth()))]
  const month = uniqeMonthesInArray.length > 1
    ? `${months[uniqeMonthesInArray[0]]} - ${months[uniqeMonthesInArray[1]]}` :
    months[uniqeMonthesInArray[0]]
  
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={props.togleVisibility}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button"
          onClick={props.today}>Today</button>
        <button className="icon-button navigation__nav-icon"
          onClick={props.onWeekBackward}>
          <i className="fas fa-chevron-left" ></i>
        </button>
        <button className="icon-button navigation__nav-icon"
          onClick={props.onWeekForward}>
          <i className="fas fa-chevron-right" ></i>
        </button>
        <span className="navigation__displayed-month">{month}</span>
      </div>
    </header>
  );
};

export default Header;

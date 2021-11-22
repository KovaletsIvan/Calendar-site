import React, { Component } from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import { removeEvent } from '../../gateway/events.js'
import "./calendar.scss";

class Calendar extends Component {

  state = {
    style: {
      top: new Date().getHours() * 60 + new Date().getMinutes(),
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        style: {
          top: new Date().getHours() * 60 + new Date().getMinutes()
        }
      })
    }, 60000)
  }


  componentWillUnmount() {
    clearInterval(this.timer)
  }


  timer = setInterval(() => {
    this.setState({
      style: {
        top: new Date().getHours() * 60 + new Date().getMinutes()
      }
    })
  }, 60000)


  removeEvents = (e) => {
    removeEvent(e.target.id)
    this.props.getEventData()
  }

  render() {

    const spanElem = <span className='red-line' style={this.state.style}><i className="fas fa-circle"></i></span>
    const { weekDates } = this.props;
    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={this.props.events}
              removeEvents={this.removeEvents}
              getEventData={this.props.getEventData}
              redline={spanElem}
              togleVisibility={this.props.togleVisibility}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
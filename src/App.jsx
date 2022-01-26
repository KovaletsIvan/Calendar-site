import React, { Component } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";
import Modal from "./components/modal/Modal.jsx";
import { baseUrl, getData } from "./gateway/events.js";
import "./common.scss";

class App extends Component {
  state = {
    weekStartDate: new Date(),
    modalVisibility: false,
    events: [],
  };

  componentDidMount() {
    this.getEventData();
  }

  getEventData = () => {
    getData().then((res) => {
      this.setState({ events: res });
    });
  };

  onWeekForward = () => {
    this.setState({
      weekStartDate: new Date(
        this.state.weekStartDate.setDate(
          new Date(this.state.weekStartDate).getDate() + 7
        )
      ),
    });
  };
  onWeekBackward = () => {
    this.setState({
      weekStartDate: new Date(
        this.state.weekStartDate.setDate(
          new Date(this.state.weekStartDate).getDate() - 7
        )
      ),
    });
  };

  today = () => {
    this.setState({
      weekStartDate: new Date(),
    });
  };

  togleVisibility = () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
    });
    this.getEventData();
  };

  render() {
    const { weekStartDate } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
    const numberOfMounth = this.state.weekStartDate.getMonth();

    return (
      <>
        <Header
          onWeekForward={this.onWeekForward}
          onWeekBackward={this.onWeekBackward}
          today={this.today}
          numberOfMounth={numberOfMounth}
          weekDates={weekDates}
          togleVisibility={this.togleVisibility}
        />
        <Calendar
          weekDates={weekDates}
          events={this.state.events}
          getEventData={this.getEventData}
          togleVisibility={this.togleVisibility}
        />
        {this.state.modalVisibility ? (
          <Modal
            togleVisibility={this.togleVisibility}
            getEventData={this.getEventData}
          />
        ) : null}
      </>
    );
  }
}

export default App;

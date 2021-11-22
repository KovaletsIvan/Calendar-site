import React, { Component } from "react";
import { compareEvent } from "../../gateway/events";
import "./modal.scss";

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: {
        date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() > 10 ? new Date().getDate() : `0${new Date().getDate()}`}`,
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      event: {
        ...this.state.event,
        [e.target.name]: e.target.value
      }
    })
  }



  onSubmit = (e) => {
    e.preventDefault();
    compareEvent(this.state.event)
    this.props.togleVisibility()
    this.props.getEventData()

  }

  render() {

    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn"
              onClick={this.props.togleVisibility}>+</button>
            <form className="event-form" onSubmit={this.onSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="title event-form__field"
                onChange={this.handleChange}
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={this.state.event.date}
                  onChange={this.handleChange} />
                <input
                  type="time"
                  name="dateFrom"
                  className="event-form__field"
                  onChange={this.handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="dateTo"
                  className="event-form__field"
                  onChange={this.handleChange}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                onChange={this.handleChange}
              ></textarea>
              <button type="submit"
                className="event-form__submit-btn"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

// const formData = [...new FormData(document.querySelector('.event-form'))]
// .reduce((obj, [field, value]) => ({ ...obj, [field]: value }), {})
// date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() > 10 ? new Date().getDate() : `0${new Date().getDate()}`}`,
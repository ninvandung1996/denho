import React, { Component } from "react";
import './index.scss';
import { connect } from "react-redux";
import clone from "clone";
import ModalEvents from "./modalEvents";
import { CalendarStyleWrapper } from "./calendar.style";
import DnDCalendar from "./DnDCalendar";
import {
  changeView, changeEvents, getApartment,
  getBooking, addBooking, editBooking, deleteBooking
} from "../../redux/actions/Calendar";
import moment from 'moment';

const getIndex = (events, selectedEvent) =>
  events.findIndex(event => event._id === selectedEvent._id);

const formItemStyle = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 }
}

class FullCalender extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: props.view,
      modalVisible: false,
      selectedData: undefined
    };
  }

  componentDidMount() {
    let { getApartment, token } = this.props;
    getApartment(token);
  }

  onSelectEvent = selectedData => {
    this.setState({ modalVisible: "update", selectedData });
  }

  onSelectSlot = selectedData => {
    this.setState({ modalVisible: "new", selectedData });
  }

  onView = view => {
    this.props.changeView(view);
  }

  onEventDrop = newOption => {
    const { event, start, end } = newOption;
    const events = clone(this.props.events);
    const updatedEvent = { ...event, start, end };
    const index = getIndex(events, updatedEvent);
    events[index] = clone(updatedEvent);
    let { changeEvents, editBooking, token } = this.props;
    editBooking(updatedEvent._id, {
      dateStart: updatedEvent.start,
      dateEnd: updatedEvent.end,
      apartment: this.props.selectedApartment._id
    }, token, (err, res) => {
      if (!err) {
        changeEvents(events);
      }
    })
  }

  setModalData = (type, selectedData) => {
    const { changeEvents, addBooking, editBooking, deleteBooking, token } = this.props;
    const events = clone(this.props.events);
    const { modalVisible } = this.state;
    if (type === "cancel") {
      this.setState({ modalVisible: false, selectedData: undefined });
    } else if (type === "delete") {
      const index = getIndex(events, selectedData);
      if (index > -1) {
        deleteBooking(selectedData._id, token, (err, res) => {
          if (!err) {
            events.splice(index, 1);
            changeEvents(events);
            this.setState({ modalVisible: false, selectedData: undefined });
          }
        })
      }
    } else {
      let { start, end, user, checkin, checkout } = selectedData;
      let { selectedApartment } = this.props;
      if (modalVisible === "new") {
        addBooking({ dateStart: moment(start).hours(12).toDate(), dateEnd: moment(end).hours(10).toDate(), user, apartment: selectedApartment._id }, token);
      } else {
        const index = getIndex(events, selectedData);
        if (index > -1) {
          editBooking(selectedData._id, {
            dateStart: moment(start).hours(12).toDate(),
            dateEnd: moment(end).hours(10).toDate(),
            apartment: selectedApartment._id,
            checkin, checkout
          }, token, (err, res) => {
            if (!err) {
              events[index] = selectedData;
            }
            this.forceUpdate()
          })
        }
        changeEvents(events);
      }
      this.setState({ modalVisible: false, selectedData: undefined });
    }
  }
  eventStyleGetter = (event) => {
    var style = {
      backgroundColor: event.checkin ? (event.checkout ? "lightred" : "lightgreen") : "lightgrey",
      textAlign: "center"
    }
    return { style }
  }
  render() {
    const { view, events } = this.props;
    const { modalVisible, selectedData } = this.state;
    const calendarOptions = {
      events,
      view,
      selectedData,
      onSelectEvent: this.onSelectEvent,
      onSelectSlot: this.onSelectSlot,
      onView: this.onView,
      onEventDrop: this.onEventDrop,
      eventPropGetter: this.eventStyleGetter
    };
    return (
      <CalendarStyleWrapper className="isomorphicCalendarWrapper" >
        {
          modalVisible && (
            <ModalEvents
              modalVisible={modalVisible}
              selectedData={selectedData}
              setModalData={this.setModalData}
            />
          )
        }
        <DnDCalendar {...calendarOptions} />
      </CalendarStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.Auth.token,
    ...state.Calendar
  };
}
export default connect(
  mapStateToProps
  , {
    changeView, changeEvents, getApartment,
    getBooking, addBooking, editBooking, deleteBooking
  })(
    FullCalender
  );

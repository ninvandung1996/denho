import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllBooking } from '../../../redux/actions/Booking';

class TableBooking extends Component {
  componentDidMount() {
    let { token, getAllBooking } = this.props;
    getAllBooking(token);
  }
  render() {
    const { bookingList } = this.props;
    const data = [];

    bookingList.forEach((booking, index) => {
      data.push({
        key: booking._id,
        id: index + 1,
        user: booking.user.email,
        apartment: booking.apartment.name,
        dateStart: new Date(booking.dateStart).toLocaleDateString(),
        dateEnd: new Date(booking.dateEnd).toLocaleDateString(),
        checkin: booking.checkin,
        checkout: booking.checkout,
        data: booking
      });
    });
    return (
      <Table columns={columns} dataSource={data} />
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }), {
    getAllBooking
  }
)(TableBooking);

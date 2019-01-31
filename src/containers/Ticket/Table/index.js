import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllTicket } from '../../../redux/actions/Ticket';

class TableData extends Component {
  componentDidMount() {
    let { token, getAllTicket } = this.props;
    getAllTicket(token);
  }
  render() {
    const { data } = this.props;
    const dataSource = [];

    data.forEach((value, index) => {
      dataSource.push({
        key: value._id,
        id: index + 1,
        user: value.booking.user.email,
        apartment: value.booking.apartment.name,
        date: value.date,
        data: value
      });
    });

    return (
      <Table columns={columns} dataSource={dataSource} />
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }), {
    getAllTicket
  }
)(TableData);

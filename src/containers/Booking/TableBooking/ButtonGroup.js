import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import './buttonGroup.scss';
import { connect } from 'react-redux';
import { editBooking, deleteBooking } from '../../../redux/actions/Booking';
import Popup from '../Popup';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "" };
  }
  showModal = (type) => {
    return () => {
      this.setState({ type })
    }
  }
  handleOk = ({ checkin, checkout, dateStart, dateEnd }) => {
    if (this.state.type === "view") {
      return this.setState({ type: "" })
    }
    let { token, booking, editBooking } = this.props;
    editBooking(booking.key, { ...booking, checkin, checkout, dateStart, dateEnd }, token, (err, res) => {
      if (!err) this.setState({ type: "" })
    })
  }
  handleCancel = () => {
    this.setState({
      type: ""
    });
  }
  onConfirmDelete = () => {
    let { token, booking, deleteBooking } = this.props;
    deleteBooking(booking.key, token);
  }
  render() {
    const { type } = this.state;
    const { booking } = this.props;
    return (
      <div className="button-group">
        <button className="button-group--1" onClick={this.showModal("view")}>Xem</button>
        <button className="button-group--2" onClick={this.showModal("edit")}>Sửa</button>
        <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
          <button className="button-group--3">Xóa</button>
        </Popconfirm>
        {
          type !== "" && <Popup type={type} selectedBooking={booking} handleOk={this.handleOk} handleCancel={this.handleCancel} />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token,
  }),
  {
    editBooking,
    deleteBooking
  }
)(ButtonGroup);
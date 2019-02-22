import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import './buttonGroup.scss';
import { connect } from 'react-redux';
import { editContract, deleteContract, addBooking, editBooking } from '../../../redux/actions/Contract';
import Popup from '../Popup';
import PopupBooking from './PopupBooking';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { contractModal: "", bookingModal: "" };
  }
  showModal = (name, value) => {
    return () => {
      this.setState({ [name + "Modal"]: value });
    }
  }
  handleOk = (name) => {
    if (name === "contract") {
      return (data) => {
        if (this.state.contractModal === "view") {
          return this.setState({ type: "" })
        }
        let { token, value, editContract } = this.props;
        editContract(value._id, data, token, (err, res) => {
          if (!err) this.setState({ contractModal: "" })
        })
      }
    }
    else if (name === "booking") {
      return (data) => {
        let { token, addBooking, editBooking, value } = this.props;
        if (this.state.bookingModal === "add") {
          addBooking(data, token, (err, res) => {
            if (!err) this.setState({ bookingModal: "" })
          })
        } else {
          console.log(value);
          editBooking(value.booking._id, data, token, (err, res) => {
            if (!err) this.setState({ bookingModal: "" })
          })
        }
      }
    }
  }
  handleCancel = (name) => {
    return () =>
      this.setState({
        [name + "Modal"]: ""
      });
  }
  onConfirmDelete = () => {
    let { token, value, deleteContract } = this.props;
    deleteContract(value._id, token);
  }
  render() {
    const { contractModal, bookingModal } = this.state;
    const { value } = this.props;
    return (
      <div className="button-group-contract">
        <button className="button-group-contract--1" onClick={this.showModal("contract", "view")}>Xem</button>
        {
          value.booking ? (
            <button className="button-group-contract--2" onClick={this.showModal("booking", "edit")}>Sửa booking</button>
          ) : (
              <button className="button-group-contract--2" onClick={this.showModal("booking", "add")}>Tạo booking</button>
            )
        }
        <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
          <button className="button-group-contract--3">Xóa</button>
        </Popconfirm>
        {
          contractModal !== "" && <Popup type={contractModal} dataSource={value} handleOk={this.handleOk("contract")} handleCancel={this.handleCancel("contract")} />
        },
        {
          bookingModal !== "" && <PopupBooking type={bookingModal} dataSource={value} handleOk={this.handleOk("booking")} handleCancel={this.handleCancel("booking")} />
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
    editContract,
    deleteContract,
    addBooking,
    editBooking
  }
)(ButtonGroup);
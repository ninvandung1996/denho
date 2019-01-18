import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import './buttonGroup.scss';
import { connect } from 'react-redux';
import { editFAQ, deleteFAQ } from '../../../redux/actions/FAQ';
import Popup from '../Popup';

class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "", selectedFAQ: null };
  }
  showModal = (type) => {
    return () => {
      this.setState({ type });
    }
  }
  handleOk = (data) => {
    if (this.state.type === "view") {
      return this.setState({ type: "" })
    }
    let { token, selectedFAQ, editFAQ } = this.props;
    editFAQ(selectedFAQ.key, data, token, (err, res) => {
      if (!err) this.setState({ type: "" })
    })
  }
  handleCancel = () => {
    this.setState({
      type: ""
    });
  }
  onConfirmDelete = () => {
    let { token, selectedFAQ, deleteFAQ } = this.props;
    deleteFAQ(selectedFAQ.key, token);
  }
  render() {
    const { type } = this.state;
    const { selectedFAQ } = this.props;
    return (
      <div className="button-group">
        <button className="button-group--1" onClick={this.showModal("view")}>Xem</button>
        <button className="button-group--2" onClick={this.showModal("edit")}>Sửa</button>
        <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
          <button className="button-group--3">Xóa</button>
        </Popconfirm>
        {
          type !== "" && <Popup type={type} FAQ={selectedFAQ} handleOk={this.handleOk} handleCancel={this.handleCancel} />
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
    editFAQ,
    deleteFAQ
  }
)(ButtonGroup);
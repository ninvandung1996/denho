import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import './buttonGroup.scss';
import { connect } from 'react-redux';
import { resetPassword } from '../../../redux/actions/User';

class ButtonGroup extends Component {
  resetPassword = () => {
    let { token, resetPassword, selectedData } = this.props;
    resetPassword({ email: selectedData.email }, token);
  }
  render() {
    return (
      <div className="button-group">
        <Popconfirm placement="top" title="Bạn có chắc chắn muốn reset mật khẩu?" onConfirm={this.resetPassword} okText="Có" cancelText="Không">
          <button className="button-group--1" >Reset</button>
        </Popconfirm>
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token,
  }),
  {
    resetPassword
  }
)(ButtonGroup);
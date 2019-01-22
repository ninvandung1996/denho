import React, { Component } from 'react';
import { Popconfirm, message } from 'antd';
import './buttonGroup.scss';
import { Link } from 'react-router-dom';
import { actGetSingleNotification, actRemoveNotification } from '../../../redux/actions/notification';
import { connect } from 'react-redux';

class ButtonGroup extends Component {

  confirm = () => {
    message.info('Xóa thành công');
  }

  render() {
    const { token, notificationId, actRemoveNotification } = this.props;
    
    return (
      <div className="button-group">
        <Link to={`/dashboard/notify/view/${notificationId}`}>
          <button className="button-group--1">Xem</button>
        </Link>

        <Link to={`/dashboard/notify/edit/${notificationId}`}>
          <button className="button-group--2">
            Sửa
          </button>
        </Link>
        
        <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={() => actRemoveNotification(token, notificationId)} okText="Có" cancelText="Không">
          <button className="button-group--3">Xóa</button>
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
    actGetSingleNotification,
    actRemoveNotification
  }
)(ButtonGroup);
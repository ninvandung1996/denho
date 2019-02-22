import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import './buttonGroup.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePromotion } from '../../../redux/actions/Promotion';

class ButtonGroup extends Component {

  onConfirmDelete = () => {
    let { token, promotionId, deletePromotion } = this.props;
    deletePromotion(promotionId, token);
  }

  render() {
    const { promotionId } = this.props;
    return (
      <div className="button-group">
        <Link to={`/dashboard/promotion/view/${promotionId}`}>
          <button className="button-group--1">Xem</button>
        </Link>
        <Link to={`/dashboard/promotion/edit/${promotionId}`}>
          <button className="button-group--2">
            Sửa
          </button>
        </Link>
        <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
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
    deletePromotion
  }
)(ButtonGroup);
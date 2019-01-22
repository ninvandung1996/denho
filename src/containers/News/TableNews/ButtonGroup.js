import React, { Component } from 'react';
import { Popconfirm, message } from 'antd';
import './buttonGroup.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteNews } from '../../../redux/actions/News';

class ButtonGroup extends Component {

  onConfirmDelete = () => {
    let { token, newsId, deleteNews } = this.props;
    deleteNews(newsId, token);
  }

  render() {
    const { newsId } = this.props;
    return (
      <div className="button-group">
        <Link to={`/dashboard/News/view/${newsId}`}>
          <button className="button-group--1">Xem</button>
        </Link>
        <Link to={`/dashboard/News/edit/${newsId}`}>
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
    deleteNews
  }
)(ButtonGroup);
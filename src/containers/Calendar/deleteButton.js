import React, { Component } from 'react';
import Popconfirm from '../../components/feedback/popconfirm';
import Button from '../../components/uielements/button';

export default class extends Component {
  render() {
    const { handleDelete } = this.props;
    return (
      <Popconfirm
        title="Xóa Booking?"
        okText="Xóa"
        cancelText="Hủy"
        onConfirm={() => {
          handleDelete();
        }}
      >
        <Button icon="close" type="button" className="isoDeleteBtn" />
      </Popconfirm>
    );
  }
}

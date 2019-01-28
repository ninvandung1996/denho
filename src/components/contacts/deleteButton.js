import React, { Component } from 'react';
import Popconfirm from '../feedback/popconfirm';
import Button from '../uielements/button';
import notification from '../notification';
import { Modal } from 'antd';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  toggleDelete = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }))
  }
  render() {
    const { contact, deleteContact } = this.props;
    let name = '';
    if (contact.firstName) {
      name = `${contact.firstName} `;
    }
    if (contact.lastName) {
      name = `${name}${contact.lastName}`;
    }
    if (!name) {
      name = 'No Name';
    }
    if (contact.apartments.length) {
      return (
        <React.Fragment>
          <Button icon="close" type="button" className="isoDeleteBtn" onClick={this.toggleDelete} />
          {
            this.state.visible && (
              <Modal
                title={"Xóa dự án"}
                visible={true}
                onCancel={this.toggleDelete}
                footer={null}
              >
                <span>Không thể xóa dự án khi chưa xóa hết các căn hộ trong dự án đó!</span>
              </Modal>
            )
          }
        </React.Fragment>
      )
    }
    return (
      <Popconfirm
        title={"Bạn có chắc chắn muốn xóa?"}
        okText="Có"
        cancelText="Không"
        onConfirm={() => {
          deleteContact(contact.id);
        }}
      >
        <Button icon="close" type="button" className="isoDeleteBtn" />
      </Popconfirm>
    );
  }
}

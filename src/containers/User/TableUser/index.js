import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllUser } from '../../../redux/actions/User';

class TableUser extends Component {
  componentDidMount() {
    let { token, getAllUser } = this.props;
    getAllUser(token);
  }
  render() {
    const { userList } = this.props;
    const data = [];

    userList.forEach((user, index) => {
      data.push({
        key: user._id,
        id: index + 1,
        email: user.email
      });
    });

    return (
      <Table columns={columns} dataSource={data} />
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }), {
    getAllUser
  }
)(TableUser);

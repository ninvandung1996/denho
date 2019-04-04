import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllUser } from "../../../redux/actions/User";
import { endpointImage } from "../../../redux/api/common";

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
        email: user.email || "",
        phone: user.phone || "",
        avatar: user.avatar ? `${endpointImage}${user.avatar}` : "",
        name: user.name || ""
      });
    });
    console.log(data);

    return <Table columns={columns} dataSource={data} />;
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  {
    getAllUser
  }
)(TableUser);

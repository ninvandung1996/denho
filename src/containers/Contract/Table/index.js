import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllContract } from '../../../redux/actions/Contract';

class TableData extends Component {
  componentDidMount() {
    let { token, getAllContract } = this.props;
    getAllContract(token);
  }
  render() {
    const { data } = this.props;
    const dataSource = [];

    data.forEach((value, index) => {
      dataSource.push({
        key: value._id,
        id: index + 1,
        user: value.mainUser.email,
        code: value.code,
        data: value,
        description: value.description
      });
    });

    return (
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 970 }} />
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }), {
    getAllContract
  }
)(TableData);

import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllService } from '../../../redux/actions/Service';

class TableService extends Component {
  componentDidMount() {
    let { token, getAllService } = this.props;
    getAllService(token);
  }
  render() {
    const { serviceList } = this.props;
    const data = [];

    serviceList.forEach((service, index) => {
      data.push({
        key: service._id,
        id: index + 1,
        thumbnail: service.thumbnail,
        detail: service.detail,
        dateAndTime: service.dateAndTime,
        project: service.project
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
    getAllService
  }
)(TableService);

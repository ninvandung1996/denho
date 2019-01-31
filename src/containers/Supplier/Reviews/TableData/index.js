import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";

class TableData extends Component {
  render() {
    const { reviewList } = this.props;
    const data = [];

    reviewList.forEach((review, index) => {
      data.push({
        key: review._id,
        id: index + 1,
        name: review.supplier,
        content: review.content
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
  }
)(TableData);

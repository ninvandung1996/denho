import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllFeedBack } from '../../../redux/actions/FeedBack';
import moment from "moment";

class TableFeedBack extends Component {
  componentDidMount() {
    let { token, getAllFeedBack } = this.props;
    getAllFeedBack(token);
  }
  render() {
    const { feedbackList } = this.props;
    const data = [];

    feedbackList.forEach((feedback, index) => {
      data.push({
        key: feedback._id,
        id: index + 1,
        title: feedback.title,
        content: feedback.content,
        createdAt: moment(feedback.createdAt).format("DD/MM/YYYY hh:mm")
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
    getAllFeedBack
  }
)(TableFeedBack);

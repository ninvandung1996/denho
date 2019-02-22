import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllFAQ } from '../../../redux/actions/FAQ';

class TableFAQ extends Component {
  componentDidMount() {
    let { token, getAllFAQ } = this.props;
    getAllFAQ(token);
  }
  render() {
    const { faqList } = this.props;
    const data = [];

    faqList.forEach((faq, index) => {
      data.push({
        key: faq._id,
        id: index + 1,
        question: faq.question,
        answer: faq.answer
      });
    });

    return (
      <Table columns={columns} dataSource={data} scroll={{ x: 1500}} />
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }), {
    getAllFAQ
  }
)(TableFAQ);

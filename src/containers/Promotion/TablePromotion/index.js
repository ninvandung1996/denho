import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllPromotion } from '../../../redux/actions/Promotion';

class TablePromotion extends Component {
  componentDidMount() {
    let { token, getAllPromotion } = this.props;
    getAllPromotion(token);
  }
  render() {
    const { promotionList } = this.props;
    const data = [];

    promotionList.forEach((promotion, index) => {
      const date = new Date(promotion.date);
      data.push({
        key: promotion._id,
        id: index + 1,
        title: promotion.title,
        thumbnail: promotion.thumbnail,
        content: promotion.content,
        date: date.toLocaleTimeString()
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
    getAllPromotion
  }
)(TablePromotion);

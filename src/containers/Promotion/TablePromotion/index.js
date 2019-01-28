import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllPromotion } from '../../../redux/actions/Promotion';
import moment from 'moment';

class TablePromotion extends Component {
  componentDidMount() {
    let { token, getAllPromotion } = this.props;
    getAllPromotion(token);
  }
  render() {
    const { promotionList } = this.props;
    const data = [];

    promotionList.forEach((promotion, index) => {
      data.push({
        key: promotion._id,
        id: index + 1,
        title: promotion.title,
        thumbnail: promotion.thumbnail,
        content: promotion.content,
        date: moment(promotion.date).format("DD/MM/YYYY hh:mm")
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

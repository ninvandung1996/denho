import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllNews } from '../../../redux/actions/News';
import moment from 'moment';

class TableNews extends Component {
  componentDidMount() {
    let { token, getAllNews } = this.props;
    getAllNews(token);
  }
  render() {
    const { newsList } = this.props;
    const data = [];

    newsList.forEach((news, index) => {
      data.push({
        key: news._id,
        id: index + 1,
        thumbnail: news.thumbnail,
        title: news.title,
        content: news.content,
        date: moment(news.date).format("DD/MM/YYYY")
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
    getAllNews
  }
)(TableNews);

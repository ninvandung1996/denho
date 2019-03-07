import React, { Component } from "react";
import { connect } from "react-redux";
import { actGetAllNotification } from "../../../redux/actions/notification";
import moment from "moment";
import { columns } from "./fakeData";
import { Table } from "antd";

class TableListNotify extends Component {
  async componentDidMount() {
    const { token, actGetAllNotification } = this.props;
    await actGetAllNotification(token);
  }

  render() {
    const { listNotification } = this.props;
    const data = [];

    listNotification.forEach((notification, index) => {
      const pushtime = new Date(notification.pushTime);
      data.push({
        key: notification._id,
        id: index + 1,
        title: notification.title,
        pushtime: `${moment(pushtime).format("DD/MM/YYYY hh:mm")}`,
        push: notification.sent ? "Đã gửi" : "Chưa gửi"
      });
    });

    return (
      // sử dụng scroll={{ x: 600 }} để có thể reposive hơn trên các thiết bị mobile
      // kết hợp với thuộc tính <fixed: 'left'> của column
      <Table columns={columns} dataSource={data} scroll={{ x: 970}} />
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
    // listNotification: state.Notifications.listNotification,
  }),
  {
    actGetAllNotification
  }
)(TableListNotify);

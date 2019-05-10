import React, { Component } from "react";
import columns from "./columns";
import { Table } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { getUser } from "../../../redux/actions/User";

const formatDate = "DD/MM/YYYY";

class TableData extends Component {
  componentDidMount() {
    let { token, getUser } = this.props;
    getUser(token);
  }
  render() {
    const { dataList } = this.props;
    const data = [];

    dataList.forEach((element, index) => {
      data.push({
        key: element._id,
        id: index + 1,
        business_type: element.business_type,
        name: element.name,
        number_phone: element.number_phone,
        subdomain: element.subdomain,
        register_date: moment(element.register_date).format(formatDate),
        end_date: moment(element.end_date).format(formatDate),
        officical_date: moment(element.officical_date).format(formatDate),
        isAdmin: element.isAdmin,
        module: element.module
      });
    });

    return <Table columns={columns} dataSource={[{}]}  />;
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  {
    getUser
  }
)(TableData);

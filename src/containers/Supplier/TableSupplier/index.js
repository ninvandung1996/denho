import React, { Component } from "react";
import { columns } from "./fakeData";
import { Table } from "antd";
import { connect } from "react-redux";
import { getAllSupplier } from '../../../redux/actions/Supplier';

class TableSupplier extends Component {
  componentDidMount() {
    let { token, getAllSupplier } = this.props;
    getAllSupplier(token);
  }
  render() {
    const { supplierList } = this.props;
    const data = [];

    supplierList.forEach((Supplier, index) => {
      data.push({
        key: Supplier._id,
        id: index + 1,
        name: Supplier.name,
        about: Supplier.about,
        star: Supplier.star,
        thumbnail: Supplier.thumbnail,
        data: Supplier
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
    getAllSupplier
  }
)(TableSupplier);

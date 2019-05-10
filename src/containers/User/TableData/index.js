import React, { Component } from "react";
import columns from "./columns";
import { Table, Row, Col, Tag } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { getUser } from "../../../redux/actions/User";

const formatDate = "DD/MM/YYYY";

const ExpandedRowRender = props => {
  return (
    <React.Fragment>
      <Row style={{marginBottom: "1rem"}}>
        <Col span={6}><span>Ngày đăng ký:</span></Col>
        <Col span={18}><span>{props.register_date}</span></Col>
      </Row>
      <Row style={{marginBottom: "1rem"}}>
        <Col span={6}><span>Ngày hết hạn:</span></Col>
        <Col span={18}><span>{props.end_date}</span></Col>
      </Row>
      <Row style={{marginBottom: "1rem"}}>
        <Col span={6}><span>Ngày chính thức:</span></Col>
        <Col span={18}><span>{props.officical_date}</span></Col>
      </Row>
      <Row style={{marginBottom: "1rem"}}>
        <Col span={6}><span>Ứng dụng:</span></Col>
        <Col span={18}>
          {props.modules.map((value, key) => (
            <Tag key={key} color="#2db7f5">{value.name}</Tag>
          ))}
        </Col>
      </Row>
    </React.Fragment>
  );
};

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
        business_type: element.bussiness_type,
        name: element.name,
        number_phone: element.number_phone,
        subdomain: element.subdomain,
        register_date: moment(element.register_date).format(formatDate),
        end_date: moment(element.end_date).format(formatDate),
        officical_date: moment(element.officical_date).format(formatDate),
        isAdmin: element.isAdmin,
        modules: element.modules
      });
    });

    return (
      <Table
        columns={columns}
        dataSource={data}
        expandedRowRender={record => <ExpandedRowRender {...record} />}
      />
    );
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

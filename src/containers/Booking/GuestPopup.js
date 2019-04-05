import React from "react";
import { Modal, Table } from "antd";
import moment from "moment";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
    width: "35vw"
  },
  {
    title: "Số lượng",
    dataIndex: "number",
    width: "20vw"
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "visitDate",
    width: "20vw"
  },
  {
    title: "Ở đến ngày",
    dataIndex: "stayUntil",
    width: "20vw"
  }
];

export default class extends React.Component {
  render() {
    let dataList = this.props.data.map((value, key) => ({
      key: value._id,
      id: key,
      ...value,
      visitDate: moment(value.visitDate).format("DD/MM/YYYY"),
      stayUntil: moment(value.stayUntil).format("DD/MM/YYYY")
    }));
    return (
      <Modal
        title="Danh sách đăng ký khách"
        visible={true}
        className="config-modal-guest"
        footer={null}
        onCancel={this.props.toggle}
      >
        <Table columns={columns} dataSource={dataList} pagination={false} />
      </Modal>
    );
  }
}

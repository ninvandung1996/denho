import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw",
    fixed: "left"
  },
  {
    title: "Người dùng",
    dataIndex: "user",
    width: "20vw"
  },
  {
    title: "Căn hộ",
    dataIndex: "apartment",
    width: "15vw"
  },
  {
    title: "Bắt đầu",
    dataIndex: "dateStart",
    width: "10vw"
  },
  {
    title: "Kết thúc",
    dataIndex: "dateEnd",
    width: "10vw"
  },
  {
    title: "Trạng thái",
    render: (text, record) => {
      return <span style={{
        width: "1rem", height: "1rem", display: "inline-block",
        backgroundColor: record.checkin ? (record.checkout ? "lightcoral" : "lightgreen") : "lightgrey"
      }}></span>
    },
    width: "10vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup booking={record} />
    },
    width: "30vw"
  }
];

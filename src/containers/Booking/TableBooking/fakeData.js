import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Người dùng",
    dataIndex: "user",
    width: "15vw"
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
    title: "Check in",
    dataIndex: "checkin",
    render: (text, record) => {
      return record.checkin ? "yes" : "no"
    },
    width: "5vw"
  },
  {
    title: "Check out",
    dataIndex: "checkout",
    render: (text, record) => {
      return record.checkout ? "yes" : "no"
    },
    width: "5vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup booking={record} />
    },
    width: "35vw"
  }
];

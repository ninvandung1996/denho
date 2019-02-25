import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "10vw"
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "35vw"
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    width: "20vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup selectedData={record} />
    },
    width: "35vw"
  }
];

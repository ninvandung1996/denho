import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: "25vw"
  },
  {
    title: "Thông tin",
    dataIndex: "about",
    width: "25vw"
  },
  {
    title: "Sao",
    dataIndex: "star",
    width: "10vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup supplierId={record.key} />
    },
    width: "35vw"
  }
];

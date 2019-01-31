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
    title: "Thời gian",
    dataIndex: "date",
    width: "20vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup value={record.data} />
    },
    width: "35vw"
  }
];

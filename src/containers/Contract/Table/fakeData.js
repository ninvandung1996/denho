import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw",
  },
  {
    title: "Người dùng",
    dataIndex: "user",
    width: "25vw",
  },
  {
    title: "Mã",
    dataIndex: "code",
    width: "30vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup value={record.data} />
    },
    width: "40vw"
  }
];

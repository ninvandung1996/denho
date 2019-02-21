import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "50px",
    fixed: "left"
  },
  {
    title: "Người dùng",
    dataIndex: "user",
    width: "200px",
    fixed: "left"
  },
  {
    title: "Mã",
    dataIndex: "code",
    width: "50vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup value={record.data} />
    },
    width: "45vw"
  }
];

import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Thumbnail",
    dataIndex: "thumbnail",
    render: (text, record) => {
      return <img style={{ width: "100%" }} src={record.thumbnail} />
    },
    width: "15vw"
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: "15vw"
  },
  {
    title: "Thông tin",
    dataIndex: "about",
    width: "20vw"
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

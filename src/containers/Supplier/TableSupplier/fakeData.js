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
      return <img style={{ width: "100%" }} src={record.thumbnail} alt="" />
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
    width: "25vw"
  },
  {
    title: "Rate",
    dataIndex: "star",
    width: "10vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup supplier={record.data} />
    },
    width: "30vw"
  }
];

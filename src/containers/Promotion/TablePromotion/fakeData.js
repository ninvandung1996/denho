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
      return <img style={{ width: "102px", objectFit: "cover" }} src={record.thumbnail} />
    },
    width: "15vw"
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: "30vw"
  },
  {
    title: "Thời gian",
    dataIndex: "date",
    width: "15vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup promotionId={record.key} />
    },
    width: "35vw"
  }
];

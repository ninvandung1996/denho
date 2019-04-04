import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "thumbnail",
    render: (text, record) => {
      return <img style={{ width: "100px", height: "100px", objectFit: "cover" }} src={record.thumbnail} alt="" />
    },
    width: "20vw"
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: "40vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup newsId={record.key} />
    },
    width: "35vw"
  }
];

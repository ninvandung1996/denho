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
    width: "15vw"
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    render: (text, record) => {
      return <div dangerouslySetInnerHTML={{ __html: record.content }} />
    },
    width: "20vw"
  },
  {
    title: "Thời gian",
    dataIndex: "date",
    width: "10vw"
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

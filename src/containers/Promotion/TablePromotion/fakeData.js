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
    width: "10vw"
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
    width: "25vw"
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
      return <ButtonGroup promotionId={record.key} />
    },
    width: "35vw"
  }
];

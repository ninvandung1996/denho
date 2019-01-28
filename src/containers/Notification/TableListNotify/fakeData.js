import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: "35vw"
  },
  {
    title: "Thời gian gửi",
    dataIndex: "pushtime",
    width: "20vw"
  },
  {
    title: "Gửi hay chưa?",
    dataIndex: "push",
    width: "15vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup notificationId={record.key}/>
    },
    width: "35vw"
  }
];

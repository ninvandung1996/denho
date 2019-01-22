import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    fixed: 'left'
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: "25vw"
  },
  {
    title: "Thời gian gửi",
    dataIndex: "pushtime"
  },
  {
    title: "Gửi hay chưa?",
    dataIndex: "push"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup notificationId={record.key}/>
    }
  }
];

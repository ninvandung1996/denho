import React from "react";
import ButtonGroup from './ButtonGroup';

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "5vw",
    fixed: "left"
  },
  {
    title: "Câu hỏi",
    dataIndex: "question",
    width: "25vw"
  },
  {
    title: "Câu trả lời",
    dataIndex: "answer",
    width: "30vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup selectedFAQ={record} />
    },
    width: "40vw"
  }
];

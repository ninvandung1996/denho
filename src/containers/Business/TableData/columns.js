import React from "react";
import ActionButton from "./ActionButton";

export default [
  {
    title: "STT",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Tên loại hình",
    dataIndex: "name",
    width: "75vw"
  },
  {
    dataIndex: "action_button",
    width: "20vw",
    render: (text, record) => {
      return <ActionButton />;
    }
  }
];

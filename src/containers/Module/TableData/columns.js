import React from "react";
import { Tag } from "antd";
import ActionButton from "./ActionButton";

export default [
  {
    title: "STT",
    dataIndex: "id",
    width: "5vw"
  },
  {
    title: "Logo",
    dataIndex: "logo",
    width: "20vw"
  },
  {
    title: "Tên ứng dụng",
    dataIndex: "logo",
    width: "20vw"
  },
  {
    title: "Mã ứng dụng",
    dataIndex: "id_module",
    width: "20vw"
  },
  {
    dataIndex: "action_button",
    width: "20vw",
    render: (text, record) => {
      return <ActionButton />;
    }
  }
];

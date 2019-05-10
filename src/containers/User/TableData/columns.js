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
    title: "Tên",
    dataIndex: "name",
    width: "20vw"
  },
  {
    title: "Loại hình kinh doanh",
    dataIndex: "business_type",
    width: "20vw",
    render: (text, record) => {
      return record.business_type ? <Tag color="#f50">{record.business_type.name}</Tag> : "";
    }
  },
  {
    title: "Điện thoại",
    dataIndex: "number_phone",
    width: "20vw"
  },
  {
    title: "Tên miền",
    dataIndex: "subdomain",
    width: "20vw",
    render: (text, record) => {
      return <Tag color="#108ee9">{text}</Tag>;
    }
  },
  {
    dataIndex: "action_button",
    width: "20vw",
    render: (text, record) => {
      return <ActionButton />;
    }
  }
];

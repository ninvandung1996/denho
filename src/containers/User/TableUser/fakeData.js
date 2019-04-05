import React from "react";
import ButtonGroup from './ButtonGroup';
import {Avatar} from "antd";

export const columns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "10vw"
  },
  {
    title: "Avatar",
    dataIndex: "avatar",
    render: (text, record) => {
      return record.avatar !== "" ? <Avatar size="large" shape="square" src={record.avatar} /> :
      <Avatar size="large" shape="square" icon="user" />
    },
    width: "15vw"
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "25vw"
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: "15vw"
  },
  {
    title: "Điện thoại",
    dataIndex: "phone",
    width: "20vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup selectedData={record} />
    },
    width: "15vw"
  }
];

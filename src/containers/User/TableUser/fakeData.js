import React from "react";
import ButtonGroup from './ButtonGroup';

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
      return <img style={{ width: "75px", height: "100px", objectFit: "cover" }} src={record.avatar} alt="" />
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

import React from "react";
import ButtonGroup from './ButtonGroup';
import moment from 'moment';

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
      return <img style={{ width: "100px", height: "100px", objectFit: "cover" }} src={record.thumbnail} alt="" />
    },
    width: "15vw"
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: "15vw"
  },
  {
    title: "Chi tiết",
    dataIndex: "detail",
    width: "20vw"
  },
  {
    title: "Thời gian",
    dataIndex: "dateAndTime",
    width: "15vw"
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    render: (text, record) => {
      return <ButtonGroup selectedData={record} />
    },
    width: "30vw"
  }
];

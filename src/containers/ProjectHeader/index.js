import React, { Component } from 'react';
import './index.scss';
import { connect } from "react-redux";
import { addNewProject, editProject } from '../../redux/actions/Project';
import { Layout, Button, Tooltip, Popconfirm } from 'antd';
import Popup from './Popup';

const { Header } = Layout;

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "" };
  }
  showModal = (type) => {
    return () => {
      this.setState({ type });
    }
  }
  handleOk = (data) => {
    let { type } = this.state;
    let { addNewProject, editProject, token } = this.props;
    if (type === "add") {
      let { projectList, changeProject } = this.props;
      let length = projectList.length;
      addNewProject(data, token, (err, res) => {
        if (!err) {
          if (length === 0) {
            changeProject(res.data._id);
          }
        }
      })
    } else {
      editProject(data, token);
    }
    this.setState({ type: "" });
  }
  handleCancel = () => {
    this.setState({
      type: ""
    });
  }
  render() {
    const { selectedProject, deleteProject } = this.props;
    const { type } = this.state;
    return (
      <Header className="isoHeader projectHeader">
        {
          selectedProject && (
            <div className="projectHeader-info" span={20}>
              <div className="projectHeader-info-item">
                <span>Tên dự án:</span>
                <span>{selectedProject.name}</span>
              </div>
              <div className="projectHeader-info-item">
                <span>Vị trí:</span>
                <span>{selectedProject.location}</span>
              </div>
              <div className="projectHeader-info-item">
                <span>Địa chỉ:</span>
                <span>{selectedProject.address}</span>
              </div>
            </div>
          )
        }
        <div className="projectHeader-btns" span={4}>
          <Tooltip placement="top" title="Thêm dự án mới">
            <Button icon="plus" className="button-group__single" onClick={this.showModal("add")} />
          </Tooltip>
          {
            selectedProject && (
              <React.Fragment>
                <Tooltip placement="top" title="Chỉnh sửa thông tin dự án">
                  <Button
                    className="button-group__single"
                    icon="edit"
                    onClick={this.showModal("edit")}
                  />
                </Tooltip>
                <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={deleteProject} okText="Có" cancelText="Không">
                  <Tooltip placement="top" title="Xóa dự án hiện tại">
                    <Button className="button-group__single" icon="close" />
                  </Tooltip>
                </Popconfirm>
              </React.Fragment>
            )
          }
        </div>
        {
          type !== "" && <Popup handleOk={this.handleOk} handleCancel={this.handleCancel} type={type} project={selectedProject} />
        }
      </Header>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token,
    projectList: state.Project.projectList,
    selectedProject: state.Project.selectedProject
  }),
  {
    addNewProject,
    editProject
  }
)(ProjectHeader);
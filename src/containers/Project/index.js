import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProject, deleteProject, getProject, saveDeleteProject } from "../../redux/actions/Project";
import { Layout, Icon } from "antd";
import Button from "../../components/uielements/button";
import ContactList from "../../components/contacts/contactList";
import SingleContactView from "../../components/contacts/singleView";
import EditContactView from "../../components/contacts/editView";
import DeleteButton from "../../components/contacts/deleteButton";
import IntlMessages from "../../components/utility/intlMessages";
import { ContactsWrapper } from "./contacts.style";
import Scrollbar from "../../components/utility/customScrollBar.js";
import ProjectContent from '../ProjectContent';
import ProjectHeader from '../ProjectHeader';

const { Content } = Layout;
class Project extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let { getProject, getAllProject, token } = this.props;
    getAllProject(token, (err, res) => {
      if (!err && res.data.length > 0) {
        getProject(res.data[0]._id, token);
      }
    });
  }
  changeProject = (_id) => {
    this.props.getProject(_id, this.props.token);
  }
  deleteProject = () => {
    let { selectedProject, deleteProject, saveDeleteProject } = this.props;
    deleteProject(selectedProject._id, this.props.token, (err, res) => {
      if (!err) {
        let { projectList } = this.props;
        projectList = projectList.filter(value => value._id !== res.data._id);
        saveDeleteProject(projectList);
        if (projectList.length > 0) {
          this.changeProject(projectList[0]._id);
        }
      }
    })
  }
  render() {
    const { projectList, selectedProject } = this.props;
    let data = projectList.map(value=>(
      {...value, avatar: value.thumbnail}
    ))
    return (
      <ContactsWrapper
        className="isomorphicContacts"
        style={{ background: "none" }}
      >
        <div className="isoContactListBar">
          <ContactList
            contacts={data}
            selectedId={selectedProject !== null ? selectedProject._id : ""}
            changeContact={this.changeProject}
            deleteContact={this.deleteProject}
            intl="Chọn dự án"
          />
        </div>
        <Layout className="isoContactBoxWrapper" style={{ width: "calc(100% - 340px)", marginLeft: "20px" }} >
          <ProjectHeader changeProject={this.changeProject} deleteProject={this.deleteProject} />
          {
            selectedProject && (
              <Content className="isoNoteEditingArea">
                <ProjectContent selectedProject={selectedProject} />
              </Content>
            )
          }
        </Layout>
      </ContactsWrapper>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token,
    ...state.Project
  }),
  {
    getAllProject,
    getProject,
    deleteProject,
    saveDeleteProject
  }
)(Project);

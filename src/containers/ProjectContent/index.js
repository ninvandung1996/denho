import React, { Component } from 'react';
import './ProjectContent.scss';
import { Layout, Button, Col, Row } from 'antd';
import Apartment from './Apartment/index';
import Popup from './Apartment/Popup';
import { addNewApartment } from '../../redux/actions/Project';
import { connect } from 'react-redux';

const { Header, Content } = Layout;

class ProjectContent extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  showModal = () => {
    this.setState({ visible: true });
  }
  handleOk = (data) => {
    let { token, selectedProject, addNewApartment } = this.props;
    addNewApartment({ ...data, project: selectedProject._id }, token, (err, res) => {
      if (!err) this.setState({ visible: false });
    })
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { selectedProject } = this.props;
    const { visible } = this.state;
    if (!selectedProject) {
      return (
        <React.Fragment>
        </React.Fragment>
      )
    }
    return (
      <Layout className="pc-layout">
        <Header className="pc-layout-header">
          <Col span={24} type="flex" justify="center" >
            <Button type="primary" icon="plus" onClick={this.showModal}>Thêm căn hộ</Button>
          </Col>
        </Header>
        <Content className="pc-layout-content">
          <Row>
            {
              selectedProject.apartments.map(value => <Apartment key={value._id} data={value} />)
            }
          </Row>
        </Content>
        {
          visible && <Popup handleOk={this.handleOk} handleCancel={this.handleCancel} type="add" />
        }
      </Layout>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  {
    addNewApartment
  }
)(ProjectContent);
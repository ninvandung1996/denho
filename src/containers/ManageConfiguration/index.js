import React, { Component } from "react";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LeftForm from "./LeftForm";
import "./index.scss";
import { connect } from "react-redux";
import { getConfig, updateConfig } from "../../redux/actions/Config";

class ManageConfigutation extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    const { token, getConfig } = this.props;
    getConfig(token, (err, res) => {
      if (!err) this.setState({ data: res.data.contact })
    })
  }

  updateConfig = (data, callback) => {
    let { token, updateConfig } = this.props;
    updateConfig({ contact: data }, token, (err, res) => {
      if (!err) this.setState({ data: res.data.contact })
      callback(err, res.data.contact);
    });
  }

  render() {
    const { data } = this.state;

    return (
      <LayoutContentWrapper className="manage-configuration">
        <LeftForm data={data} update={this.updateConfig} />
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  { getConfig, updateConfig }
)(ManageConfigutation);

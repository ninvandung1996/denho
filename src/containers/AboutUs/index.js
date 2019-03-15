import React, { Component } from "react";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LeftForm from "./LeftForm";
import "./index.scss";
import { connect } from "react-redux";
import { getConfig, updateConfig } from "../../redux/actions/Config";

class ManageConfigutation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      att: props.location.pathname.replace("/dashboard/", "") === "aboutus" ? "aboutUs" : "term"
    }
  }

  componentDidMount() {
    const { token, getConfig } = this.props;
    let { att } = this.state;
    getConfig(token, (err, res) => {
      if (!err) this.setState({ data: res.data[att] || "" })
    })
  }

  updateConfig = (data) => {
    let { token, updateConfig } = this.props;
    let { att } = this.state;
    updateConfig({ [att]: data }, token, (err, res) => {

    });
  }

  render() {
    const { data, att } = this.state;
    return (
      <LayoutContentWrapper className="manage-configuration">
        {
          data !== "" && <LeftForm att={att} data={data} update={this.updateConfig} />
        }
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

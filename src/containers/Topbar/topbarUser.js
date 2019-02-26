import React, { Component } from "react";
import { connect } from "react-redux";
import Popover from "../../components/uielements/popover";
import IntlMessages from "../../components/utility/intlMessages";
import userpic from "../../image/user1.png";
import { logout } from "../../redux/actions/auth";
import { closeAll } from "../../redux/actions/app";
import TopbarDropdownWrapper from "./topbarDropdown.style";

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a
          className="isoDropdownLink"
          onClick={() => {
            this.props.logout();
            this.props.closeAll();
          }}
        >
          <IntlMessages id="topbar.logout" />
        </a>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div className="isoImgWrapper">
          <img alt="user" src={userpic} />
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(
  null,
  { logout, closeAll }
)(TopbarUser);

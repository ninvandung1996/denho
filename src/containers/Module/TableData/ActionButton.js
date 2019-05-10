import React from "react";
import { connect } from "react-redux";
import { Tooltip, Button } from "antd";

class ActionButton extends React.Component {
  render() {
    return (
      <div className="action-btn">
        <Tooltip placement="bottom" title="Cập nhật">
          <Button className="action-btn-update" icon="form" />
        </Tooltip>
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  {}
)(ActionButton);

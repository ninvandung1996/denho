import React, { Component } from "react";
import { validateState } from "../../helpers/validateState";
import Editor from "../../components/editor";

class LeftForm extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }

  getCustomPropsEditor = () => ({
    init: {
      min_height: 500
    },
    value: this.state.data,
    onChange: e => {
      this.setState({ data: e.target.getContent(), error: "" });
    }
  });

  onSubmit = async () => {
    let { data } = this.state;
    let checkNullState = validateState(this.state, ["data"]);
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    if (data === this.props.data)
      return this.setState({ error: "Bạn chưa thay đổi thông tin trường nào" });
    this.props.update(data);
  };

  render() {
    const { error } = this.state;
    return (
      <div className="left-form">
        <div className="form-title">
          {this.props.att === "aboutUs" ? "Về chúng tôi" : "Điều khoản"}
        </div>
        <div className="left-form__input">
          <div className="notify-edit__editor">
            <Editor customProps={this.getCustomPropsEditor()} />
          </div>
          <span className="form__error">{error}</span>
          <button
            className="form__button"
            onClick={this.onSubmit}
            type="submit"
          >
            Cập nhật
          </button>
        </div>
      </div>
    );
  }
}

export default LeftForm;

import React, { Component } from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import { actUpdateLink } from "../.././redux/actions/configuration";

const initialState = {
  book: "",
  finance: "",
  error: ""
};

const optionInput = [
  {
    name: "book",
    label: "Link cẩm nang*",
    required: "required"
  },
  {
    name: "finance",
    label: "Link hỗ trợ tài chính*",
    required: "required"
  }
];

class RightForm extends Component {
  state = initialState;

  componentWillReceiveProps(nextProps) {
    const { linkFinance, linkBook } = this.props;
    if (
      linkBook !== nextProps.linkBook &&
      linkFinance !== nextProps.linkFinance
    ) {
      this.setState({
        book: nextProps.linkBook,
        finance: nextProps.linkFinance
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { token, actUpdateLink, linkBook, linkFinance } = this.props;
    const { book, finance } = this.state;

    if (linkBook && linkFinance) {
      if (book === "" || finance === "") {
        this.setState({ error: "*Bạn cần điền đầy đủ tất cả thông tin" });
      } else if (linkBook === book && linkFinance === finance) {
        this.setState({
          error: "*Bạn chưa thay đổi thông tin"
        })
      } else {
        actUpdateLink(token, { linkBook: book, linkFinance: finance }, (err, res) => {
          this.setState({
            error: ""
          })
        });
      }
    } else if (book === "" || finance === "") {
      this.setState({ error: "*Bạn cần điền đầy đủ tất cả thông tin" });
    }
  };

  handleChangeInput = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value, error: "" });
  };

  renderInput = () => {
    return optionInput.map((option, index) => (
      <div key={index} className="input-item--right ">
        <label> {option.label} </label>
        <Input
          name={option.name}
          value={this.state[option.name]}
          onChange={this.handleChangeInput}
          required={option.required}
        />
      </div>
    ));
  };

  render() {
    return (
      <div className="right-form">
        <div className="form-title">Cấu hình</div>

        <div className="right-form__input">
          {this.renderInput()}
          <span className="form__error">{this.state.error}</span>
          <button className="form__button" onClick={this.handleSubmit}>
            Cập nhật
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  {
    actUpdateLink
  }
)(RightForm);

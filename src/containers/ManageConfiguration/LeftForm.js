import React, { Component } from "react";
import { Input } from "antd";
import { checkChanged, validateState } from "../../helpers/validateState";

const initialState = {
  address: "",
  email: "",
  phone: "",
  website: "",
  fanpage: "",
  error: ""
};

const optionInput = [
  {
    name: "address",
    label: "Địa chỉ *",
    type: "string",
    required: "required"
  },
  {
    name: "email",
    label: "Email *",
    type: "email",
    required: "required"
  },
  {
    name: "phone",
    label: "Số điện thoại *",
    type: "string",
    required: "required"
  },
  {
    name: "website",
    label: "Link website *",
    type: "string",
    required: "required"
  },
  {
    name: "fanpage",
    label: "Fanpage ",
    type: "string"
  }
];

class LeftForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState, ...props.data }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.data })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { data, update } = this.props;
    const { address, email, phone, website, fanpage } = this.state;
    const checkNullState = validateState(this.state, ["address", "email", "phone", "website"]);
    const checkChangedState = checkChanged(data, this.state, ["address", "email", "phone", "website", "fanpage"]);
    if (checkChangedState.error)
      return this.setState({ error: checkChangedState.error });
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    update({ address, email, phone, website, fanpage }, (err, data) => {
      if (!err) this.setState({ ...initialState, ...data })
    });
  };

  handleChangeInput = e => {
    console.log(e.target.value);
    const { value, name } = e.target;
    this.setState({ [name]: value, error: "" });
  };

  renderInput = () => {
    return optionInput.map((option, index) => (
      <div key={index} className="input-item--left">
        <label> {option.label} </label>
        <Input
          name={option.name}
          value={this.state[option.name]}
          onChange={this.handleChangeInput}
          type={option.type}
          required={option.required}
        />
      </div>
    ));
  };

  render() {
    const { error } = this.state;
    return (
      <div className="left-form">
        <div className="form-title">Liên hệ</div>
        <div className="left-form__input">
          {this.renderInput()}
          <span className="form__error">{error}</span>
          <button
            className="form__button"
            onClick={this.handleSubmit}
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

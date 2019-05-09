import React from "react";
import "./style.css";
import { Form, Button, Checkbox, Icon, Input } from "antd";
import logo from "../../../image/logo-color.png";
import background from "../../../image/background-login.jpg";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";

class Login extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.props.history.push("/cms");
    }
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values, (err, res) => {
          if (!err) {
            this.props.history.push("/dashboard");
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        className="login"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center"
        }}
      >
        <div className="login-wrap">
          <div className="login-title">
            <img src={logo} alt="" />
          </div>
          <Form className="login-form" onSubmit={this.onSubmit}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Nhớ mật khẩu</Checkbox>)}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginWrap = Form.create({})(Login);

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(LoginWrap);

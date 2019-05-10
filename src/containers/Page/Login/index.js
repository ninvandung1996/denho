import React from "react";
import "./style.css";
import { Form, Button, Checkbox, Icon, Input } from "antd";
import logo from "../../../image/logo-color.png";
import background from "../../../image/background-login.jpg";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/auth";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, { email, password }) => {
      if (!err) {
        this.props.login({ email, password }, (err, res) => {
          if (!err) {
            this.props.history.push("/dashboard");
          }
        });
      }
    });
  };
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

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
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input your email!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="email"
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
    isLoggedIn: state.Auth.loggedIn
  }),
  { login }
)(LoginWrap);

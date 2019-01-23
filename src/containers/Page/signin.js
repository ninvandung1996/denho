import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Button from "../../components/uielements/button";
import Form from "../../components/uielements/form";
import { login } from "../../redux/actions/auth";
import SignInStyleWrapper from "./signin.style";

import vinCityImg from "../../image/logo-vincity.png";

class SignIn extends Component {
  state = {
    email: "admin@twinger.co",
    password: "Vinhome@1218",
    redirectToReferrer: false,
    errorText: ""
  };

  componentDidMount() {
    if (this.props.isLoggedIn) this.setState({ redirectToReferrer: true });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.isLoggedIn);
    // if (nextProps.isLoggedIn) this.setState({ redirectToReferrer: true });
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value, errorText: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log({ e });
    this.handleLogin();
  };

  handleLogin = () => {
    const { login } = this.props;
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        errorText: "Bạn cần nhập đầy đủ thông tin các trường!"
      });
    } else {
      login({ email, password }, (err, data) => {
        if (!err) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            errorText: "Email hoặc mật khẩu  đăng nhập sai!"
          });
        }
      });
    }
  };

  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <a href="/dashboard">
                <img alt="ảnh logo" src={vinCityImg} className="vinCity-logo" />
              </a>
            </div>

            <Form className="isoSignInForm" onSubmit={this.handleSubmit}>
              <div className="isoInputWrapper">
                <Input
                  name="email"
                  value={this.state.email}
                  size="large"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  name="password"
                  value={this.state.password}
                  size="large"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleLogin}
                >
                  Đăng nhập
                </Button>
              </div>

              <div style={{ color: "red" }}>{this.state.errorText}</div>
            </Form>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.token !== null ? true : false
  }),
  { login }
)(SignIn);

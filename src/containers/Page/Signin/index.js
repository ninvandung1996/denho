import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../../components/uielements/input";
import Button from "../../../components/uielements/button";
import { login } from "../../../redux/actions/auth";
import IntlMessages from "../../../components/utility/intlMessages";
import SignInStyleWrapper from "./signin.style";
import Form from "../../../components/uielements/form";

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    username: "admin@twinger",
    password: "twinger.co@SNB2018",
    errorText: ""
  };
  componentWillReceiveProps(nextProps) {
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
  }
  handleSubmit = e => {
    e.preventDefault();
    this.handleLogin();
  }
  handleLogin = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({
        errorText: "Bạn cần nhập đầy đủ thông tin các trường!"
      });
    } else {
      login({ username, password }, (err, data) => {
        if (!err) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({
            errorText: "Tài khoản hoặc mật khẩu  đăng nhập sai!"
          });
        }
      });
    }
  }

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
              {/* <IntlMessages id="page.signInTitle" /> */}
              <div className="isoLogoWrapper-title">
                <b>KPI</b>Why
              </div>
            </div>

            <Form className="isoSignInForm" onSubmit={this.handleSubmit}>
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Tài khoản" name="username" value={this.state.username} onChange={this.handleChange} />
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Mật khẩu" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Button
                  className="isoInputWrapper-btn"
                  type="primary"
                  onClick={this.handleLogin}
                >
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(SignIn);

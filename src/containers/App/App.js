import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Modal } from "antd";
import { Debounce } from "react-throttle";
import WindowResizeListener from "react-window-size-listener";
import { ThemeProvider } from "styled-components";
import { logout } from "../../redux/actions/auth";
import { toggleAll } from "../../redux/actions/app";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import AppRouter from "./AppRouter";
import { siteConfig } from "../../settings";
import themes from "../../settings/themes";
import { themeConfig } from "../../settings";
import AppHolder from "./commonStyle";
import "./global.css";
import firebase from './firebase';
import 'firebase/messaging';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import { saveIsRequestNotification } from '../../redux/actions/app';
import { savePushToken } from '../../redux/actions/auth';

let messaging = null;

if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BE6g3lBd8qnTW7WeygxO_iFko_Kef3WkxjcWk1xIEQF3Px78LgrlRqPMOnZCcENN4Q7CSztvjSq1Uk6HG0Lmd5w"
  );
}


const { Content, Footer } = Layout;
// const { logout } = authAction;
// const { toggleAll } = appActions;
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleModal: firebase.messaging.isSupported() }
  }
  componentWillReceiveProps(nextProps) {
    //lưu thông tin người dùng cho phép gửi notification
    const { isRequestNotification } = nextProps;
    if (!isRequestNotification && this.props.isRequestNotification) {
      // nếu người dùng cho phép gửi notification thì sử dụng lấy token cho firebase
      this.getPushToken();
    }
  }
  // hỏi quyền và lấy token cho firebase
  getPushToken = () => {
    const { auth, savePushToken } = this.props;
    // request notification
    messaging.requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then(deviceToken => {
        console.log(deviceToken);
        const token = auth.token;
        const deviceId = navigator.userAgent;
        const deviceType = 'web';
        savePushToken(token, { deviceId, deviceToken, deviceType });
      })
      .catch(() => {
        console.log("Notification permission denied!")
      })
  }
  //xử lý nếu người dùng chấp nhận gửi notification
  handleAcceptNotification = () => {
    const { saveIsRequestNotification } = this.props;
    // ẩn modal
    this.setState({ visibleModal: false });
    // lưu lại thông tin isRequestNotification bằng false để lần sau không hỏi lại
    saveIsRequestNotification(false);
  }
  handleCancelNotification = () => {
    // ẩn modal
    this.setState({ visibleModal: false });
  }

  render() {
    const { url } = this.props.match;
    const { height, isRequestNotification } = this.props;
    const appHeight = window.innerHeight;
    return (
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <AppHolder>
          <Layout style={{ height: appHeight }}>
            <Modal
              title="Chấp nhận thông báo"
              style={{ top: "50px" }}
              visible={this.state.visibleModal && isRequestNotification}
              onOk={() => this.handleAcceptNotification()}
              onCancel={() => this.handleCancelNotification()}
            >
              <p>Bạn có đồng ý nhận thông báo từ trình duyệt này ?</p>
            </Modal>
            <Debounce time="1000" handler="onResize">
              <WindowResizeListener
                onResize={windowSize =>
                  this.props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight
                  )
                }
              />
            </Debounce>
            <Topbar url={url} />
            <Layout style={{ flexDirection: "row", overflowX: "hidden" }}>
              <Sidebar url={url} />
              <Layout
                className="isoContentMainLayout"
                style={{
                  height: height
                }}
              >
                <Content
                  className="isomorphicContent"
                  style={{
                    padding: "70px 0 0",
                    flexShrink: "0",
                    background: "#f1f3f6",
                    position: "relative"
                  }}
                >
                  <AppRouter url={url} />
                </Content>
                <Footer
                  style={{
                    background: "#ffffff",
                    textAlign: "center",
                    borderTop: "1px solid #ededed"
                  }}
                >
                  {siteConfig.footerText}
                </Footer>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
      </ThemeProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    height: state.App.height,
    isRequestNotification: state.App.isRequestNotification
  }),
  { logout, toggleAll, savePushToken, saveIsRequestNotification }
)(App);

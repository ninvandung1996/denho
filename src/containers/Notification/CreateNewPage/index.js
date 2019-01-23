import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Form, Input, DatePicker } from "antd";
import { connect } from "react-redux";
import {
  actCreateNotification,
  actGetSingleNotification,
  actUpdateNotification
} from "../../../redux/actions/notification";
import Editor from "../../../components/editor";
import moment from "moment";
// import "moment/locale/vi";
import "./index.scss";
import { validateState } from "../../../helpers/validateState";

const FormItem = Form.Item;
// function range(start, end) {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// }

// function disabledDate(current) {
//   // Can not select days before today and today
//   console.log({ current, moment: moment().endOf("day") });
//   return current && current < moment().endOf("day");
// }

// function disabledDateTime() {
//   return {
//     disabledHours: () => range(0, 24).splice(4, 20),
//     disabledMinutes: () => range(30, 60),
//     disabledSeconds: () => [55, 56]
//   };
// }

const initialState = {
  title: "",
  content: "",
  pushTime: moment(),
  error: ""
};

class CreateNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      id: props.match.params.idNotification
    };
  }
  componentDidMount() {
    // const id = this.props.match;
    if (this.state.id) {
      const { token, actGetSingleNotification } = this.props;

      actGetSingleNotification(token, this.state.id, (err, res) => {
        res &&
          this.setState({
            title: res.data.title,
            content: res.data.content,
            pushTime: res.data.pushTime
          });
      });
    }
  }

  onChangeTitle = e => {
    this.setState({
      title: e.target.value, error: ""
    });
  };

  onDateChange = (value, dateString) => {
    console.log({ value: moment, dateString });
    value && this.setState({ pushTime: value, error: "" });
    // value && this.setState({ pushTime: value._d });/
    !value && this.setState({ pushTime: new Date(), error: "" });
  };

  onSubmit = async () => {
    const { token, actCreateNotification, actUpdateNotification } = this.props;
    const { id, title, pushTime, content } = this.state;
    let res = "";
    let { state } = this;
    delete state.loading;
    delete state.error;
    let checkNullState = validateState(this.state, ["title", "content", "pushTime"]);
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    if (id) {
      res = await actUpdateNotification(
        token,
        { content, title, pushTime },
        id
      );
    } else
      res = await actCreateNotification(token, { content, title, pushTime });

    res &&
      setTimeout(() => {
        this.props.history.push("/dashboard/notify");
      }, 500);
  };

  getCustomPropsEditor = () => ({
    init: {
      min_height: 500
      // images_upload_url: "postAcceptor.php"
    },
    value: this.state.content,
    onChange: e => {
      this.setState({ content: e.target.getContent(), error: "" });
    }
  });

  render() {
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <div className="new-notify">
            <Form layout="vertical">
              <FormItem label="Tiêu đề">
                <Input
                  style={{ marginTop: "1rem" }}
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </FormItem>

              <FormItem label="Nội dung">
                <div className="new-notify__editor">
                  <Editor customProps={this.getCustomPropsEditor()} />
                </div>
              </FormItem>

              <FormItem label="Thời gian gửi">
                <DatePicker
                  style={{ width: "300", marginTop: "1rem" }}
                  onChange={this.onDateChange}
                  format="DD-MM-YYYY HH:mm"
                  value={moment(this.state.pushTime, "DD-MM-YYYY HH:mm")}
                  defaultValue={moment(this.state.pushTime, "DD-MM-YYYY HH:mm")}
                  placeholder="Chọn thời gian"
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm") }}
                />
              </FormItem>

              <FormItem>
                <button className="new-notify__button" onClick={this.onSubmit}>
                  {this.state.id ? "Cập nhật" : "Tạo mới"}
                </button>
              </FormItem>
              <span className="form__error">{this.state.error}</span>
            </Form>
          </div>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  { actCreateNotification, actGetSingleNotification, actUpdateNotification }
)(CreateNewPage);

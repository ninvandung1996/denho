import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Form, Input, DatePicker } from "antd";
import { connect } from "react-redux";
import {
  getPromotion,
  addPromotion,
  editPromotion
} from "../../../redux/actions/Promotion";
import Editor from "../../../components/editor";
import moment from "moment";
import "moment/locale/vi";
import "./index.scss";

const FormItem = Form.Item;

const initState = {
  title: "",
  content: "",
  date: new Date(),
  thumbnail: ""
};

class CreateNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initState,
      id: props.match.params.idPromotion
    };
  }
  componentDidMount() {
    let _id = this.props.match.params.idPromotion;
    if (_id) {
      const { token, getPromotion } = this.props;
      getPromotion(_id, token, (err, res) => {
        if (!err) {
          this.setState({
            title: res.data.title,
            content: res.data.content,
            date: res.data.date,
            thumbnail: res.data.thumbnail
          })
        }
      })
    }
  }
  onChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  }
  onDateChange = (value) => {
    value && this.setState({ pushTime: value });
    !value && this.setState({ pushTime: new Date() });
  }
  getCustomPropsEditor = () => ({
    init: {
      min_height: 500
    },
    value: this.state.content,
    onChange: e => {
      this.setState({ content: e.target.getContent() });
    }
  })
  onSubmit = async () => {
    let _id = this.props.match.params.idPromotion;
    let { token, addPromotion, editPromotion } = this.props;
    let res = null;
    if (_id) {
      res = await editPromotion(_id, this.state, token);
    } else {
      res = await addPromotion(this.state, token);
    }
    if (res) {
      setTimeout(() => {
        this.props.history.push("/dashboard/promotion");
      }, 1000);
    }
  }
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
                  value={moment(this.state.date, "DD-MM-YYYY HH:mm")}
                  defaultValue={moment(this.state.date, "DD-MM-YYYY HH:mm")}
                  placeholder="Chọn thời gian"
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm") }}
                />
              </FormItem>
              <FormItem>
                <button className="new-notify__button" onClick={this.onSubmit}>
                  {this.props.match.params.idPromotion ? "Cập nhật" : "Tạo mới"}
                </button>
              </FormItem>
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
  }), {
    getPromotion,
    addPromotion,
    editPromotion
  }
)(CreateNewPage);

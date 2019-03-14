import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Form, Input, DatePicker, Upload, Icon, message, Select } from "antd";
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
import configs from '../../../redux/constants/configs';
import { validateState } from "../../../helpers/validateState";

const FormItem = Form.Item;

const initState = {
  title: "",
  content: "",
  date: moment(),
  thumbnail: "",
  type: "",
  loading: false,
  error: ""
};

const Option = Select.Option;

const types = [
  "Tin tức", "Quảng cáo", "Thông báo"
]

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
  }
  return isLt2M;
}

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
      title: e.target.value, error: ""
    });
  }
  thumbnailChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
        thumbnail: `${configs.endPointImage}${info.file.response.data.name}`, error: ""
      })
    }
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
      this.setState({ content: e.target.getContent(), error: "" });
    }
  })
  onChangeType = (type) => {
    this.setState({ type });
  }
  onSubmit = async () => {
    let _id = this.props.match.params.idPromotion;
    let { token, addPromotion, editPromotion } = this.props;
    let res = null;
    let { state } = this;
    delete state.loading;
    delete state.error;
    let checkNullState = validateState(this.state, ["title", "content", "date", "thumbnail", "type"]);
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    if (_id) {
      res = await editPromotion(_id, state, token);
    } else {
      res = await addPromotion(state, token);
    }
    if (res) {
      setTimeout(() => {
        this.props.history.push("/dashboard/promotion");
      }, 1000);
    }
  }
  render() {
    let { thumbnail, error } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
              <FormItem label="Loại">
                <Select value={this.state.type} onChange={this.onChangeType}>
                  {
                    types.map((value, key) => (
                      <Option key={key} value={key}>{value}</Option>
                    ))
                  }
                </Select>
              </FormItem>
              <FormItem label="Thumbnail">
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={`${configs.endPointImage}`}
                  headers={{ Authorization: `access_token ${this.props.token}` }}
                  beforeUpload={beforeUpload}
                  onChange={this.thumbnailChange}
                >
                  {thumbnail ? <img style={{ width: "100%" }} src={thumbnail} alt="thumbnail" /> : uploadButton}
                </Upload>
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
                  value={moment(this.state.date)}
                  defaultValue={moment(this.state.date)}
                  placeholder="Chọn thời gian"
                  showTime={{ defaultValue: moment("00:00:00", "HH:mm") }}
                />
              </FormItem>
              <FormItem>
                <button className="new-notify__button" onClick={this.onSubmit}>
                  {this.props.match.params.idPromotion ? "Cập nhật" : "Tạo mới"}
                </button>
              </FormItem>
              <span className="form__error">{error}</span>
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

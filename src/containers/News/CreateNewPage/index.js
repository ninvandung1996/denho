import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Form, Input, DatePicker, Upload, Icon, message } from "antd";
import { connect } from "react-redux";
import {
  getNews,
  addNews,
  editNews
} from "../../../redux/actions/News";
import Editor from "../../../components/editor";
import moment from "moment";
import "moment/locale/vi";
import "./index.scss";
import configs from '../../../redux/constants/configs';

const FormItem = Form.Item;

const initState = {
  title: "",
  content: "",
  date: new Date(),
  thumbnail: "",
  loading: false
};

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('Chỉ có thể upload file JPG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
  }
  return isJPG && isLt2M;
}

class CreateNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initState,
      id: props.match.params.idNews
    };
  }
  componentDidMount() {
    let _id = this.props.match.params.idNews;
    if (_id) {
      const { token, getNews } = this.props;
      getNews(_id, token, (err, res) => {
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
  thumbnailChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
        thumbnail: `${configs.endPointImage}/uploads/files/${info.file.response.data.name}`
      })
    }
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
    let _id = this.props.match.params.idNews;
    let { token, addNews, editNews } = this.props;
    let res = null;
    let { state } = this;
    delete state.loading;
    if (_id) {
      res = await editNews(_id, state, token);
    } else {
      res = await addNews(state, token);
    }
    if (res) {
      setTimeout(() => {
        this.props.history.push("/dashboard/News");
      }, 1000);
    }
  }
  render() {
    let { thumbnail } = this.state;
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
              <FormItem label="Thumbnail">
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={`${configs.endPointImage}/uploads/files`}
                  headers={{ Authorization: `access_token ${this.props.token}` }}
                  beforeUpload={beforeUpload}
                  onChange={this.thumbnailChange}
                >
                  {thumbnail ? <img style={{ width: "100%" }} src={thumbnail} alt="thumbnail" /> : uploadButton}
                </Upload>
              </FormItem>
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
                  {this.props.match.params.idNews ? "Cập nhật" : "Tạo mới"}
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
    getNews,
    addNews,
    editNews
  }
)(CreateNewPage);
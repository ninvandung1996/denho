import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Form, Input, Upload, Icon, message } from "antd";
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
import { validateState } from "../../../helpers/validateState";

const FormItem = Form.Item;

const initState = {
  title: "",
  content: "",
  thumbnail: "",
  loading: false,
  error: ""
};

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
            date: moment(res.data.date),
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
        thumbnail: `${configs.endPointImage}/uploads/files/${info.file.response.data.name}`, error: ""
      })
    }
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
  onSubmit = async () => {
    let _id = this.props.match.params.idNews;
    let { token, addNews, editNews } = this.props;
    let res = null;
    let { state } = this;
    delete state.loading;
    delete state.error;
    let checkNullState = validateState(this.state, ["title", "content", "thumbnail"]);
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
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
              <FormItem label="Ảnh đại diện">
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
              <FormItem>
                <button className="new-notify__button" onClick={this.onSubmit}>
                  {this.props.match.params.idNews ? "Cập nhật" : "Tạo mới"}
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
    getNews,
    addNews,
    editNews
  }
)(CreateNewPage);

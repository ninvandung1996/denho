import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Editor } from "react-draft-wysiwyg";
import { Form, Input, Upload, message, Icon } from "antd";
import {
  EditorState,
  convertToRaw,
  ContentState,
} from "draft-js";
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  editNews,
  getNews
} from "../../../redux/actions/News";
import "moment/locale/vi";
import "./index.scss";
import configs from '../../../redux/constants/configs';
import { validateState } from "../../../helpers/validateState";

const FormItem = Form.Item;

const initialState = {
  title: "",
  content: "",
  thumbnail: "",
  error: ""
};

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
  }
  return isLt2M;
}

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    let _id = this.props.match.params.idNews;
    const { token, getNews } = this.props;

    //sau khi chuyển tới trang Edit Page thì sẽ tự động tìm trên url id của thông báo
    // và gọi action để lấy nội dung thông báo đó về để hiển thị ra màn hình
    await getNews(_id, token, (err, res) => {
      this.setState({
        thumbnail: res.data.thumbnail,
        title: res.data.title,
        content: res.data.content
      });

      // đây là cách khởi tạo dữ liệu cho editor trong draft.js từ dữ liệu gốc là định dạng các thẻ HTML,
      const contentBlock = htmlToDraft(this.state.content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );

      this.setState({
        ...this.state,
        editorState: EditorState.createWithContent(contentState)
      });
    });
  }

  // hàm của Edior tròng draft.js
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };
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

  onSubmit =  () => {
    // khi update nội dung thôn báo, ta sẽ lấy nội dụng thông báo hiện tại và
    // chuyển nội dung đó sang định dạng HTML, sau đó mới push lên API
    let _id = this.props.match.params.idNews;
    const content = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    let { state } = this;
    delete state.error;
    let checkNullState = validateState({ ...state, content }, ["title", "content", "thumbnail"]);
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    const { token, editNews } = this.props;
    const { title, thumbnail } = this.state;
    // sau khi update xong thì đẩy về trang trước để xem danh sách các thông báo
    editNews(_id, { content, title, thumbnail }, token, () => {
      this.props.history.push("/dashboard/news");
    });
  };

  render() {
    const { editorState, thumbnail } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>)
    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <div className="notify-edit">
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
                <div className="notify-edit__editor">
                  <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </div>
              </FormItem>
              <FormItem>
                <button className="notify-edit__button" onClick={this.onSubmit}>
                  Cập nhật
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
    token: state.Auth.token,
    selectedNotification: state.Notifications.selectedNotification
  }),
  {
    editNews,
    getNews
  }
)(EditPage);

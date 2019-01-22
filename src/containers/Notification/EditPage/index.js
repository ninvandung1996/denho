import React, { Component } from "react";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import { Editor } from "react-draft-wysiwyg";
import { Form, Input, DatePicker } from "antd";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  actUpdateNotification,
  actGetSingleNotification
} from "../../../redux/actions/notification";
import moment from "moment";
import "moment/locale/vi";
import "./index.scss";

const FormItem = Form.Item;

const initialState = {
  title: "",
  content: "",
  pushTime: ""
};

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  async componentDidMount() {
    const id = this.props.match.params.idNotification;
    const { token, actGetSingleNotification } = this.props;

    //sau khi chuyển tới trang Edit Page thì sẽ tự động tìm trên url id của thông báo
    // và gọi action để lấy nội dung thông báo đó về để hiển thị ra màn hình
    await actGetSingleNotification(token, id, (err, res) => {
      this.setState({
        title: res.data.title,
        content: res.data.content,
        pushTime: res.data.pushTime
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

  onDateChange = (value, dateString) => {
    this.setState({ pushTime: value._d });
  };

  onSubmit = () => {
    // khi update nội dung thôn báo, ta sẽ lấy nội dụng thông báo hiện tại và
    // chuyển nội dung đó sang định dạng HTML, sau đó mới push lên API
    const id = this.props.match.params.idNotification;
    const content = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    const { token, actUpdateNotification } = this.props;
    const { title, pushTime } = this.state;

    // sau khi update xong thì đẩy về trang trước để xem danh sách các thông báo
    actUpdateNotification(token, { content, title, pushTime }, id, () => {
      this.props.history.push("/dashboard/notify");
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <LayoutContentWrapper>
        <LayoutContent>
          <div className="notify-edit">
            <Form layout="vertical">
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

              <FormItem label="Thời gian gửi">
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="DD-MM-YYYY HH:mm"
                  placeholder="Chọn thời gian"
                  onChange={this.onDateChange}
                  value={moment(this.state.pushTime)}
                  style={{ width: "300", marginTop: "1rem" }}
                />
              </FormItem>

              <FormItem>
                <button className="notify-edit__button" onClick={this.onSubmit}>
                  Cập nhật
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
    token: state.Auth.token,
    selectedNotification: state.Notifications.selectedNotification
  }),
  {
    actUpdateNotification,
    actGetSingleNotification
  }
)(EditPage);

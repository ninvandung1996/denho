import React, { Component } from "react";
import { checkChanged, validateState } from "../../helpers/validateState";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
} from "draft-js";

class LeftForm extends Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data }
  }

  componentDidMount() {
    const contentBlock = htmlToDraft(this.state.data);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    this.setState({
      ...this.state,
      editorState: EditorState.createWithContent(contentState)
    });
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSubmit = async () => {
    let checkNullState = validateState(this.state, ["data"]);
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    const content = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    if (content === this.props.data)
      return this.setState({ error: "Bạn chưa thay đổi thông tin trường nào" });
    this.props.update(content);
  };

  render() {
    const { error, editorState } = this.state;
    return (
      <div className="left-form">
        <div className="form-title">{this.props.att === "aboutUs" ? "Về chúng tôi" : "Điều khoản"}</div>
        <div className="left-form__input">
          <div className="notify-edit__editor">
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <span className="form__error">{error}</span>
          <button
            className="form__button"
            onClick={this.onSubmit}
            type="submit"
          >
            Cập nhật
          </button>
        </div>
      </div>
    );
  }
}

export default LeftForm;

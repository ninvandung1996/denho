import React from "react";
import { Modal, Form, AutoComplete, Select } from "antd";
import {
  checkChanged,
  validateState,
  validateEmail
} from "../../helpers/validateState";
import { getAllUser } from "../../redux/actions/Contract";
import { connect } from "react-redux";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";

const formItemStyle = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const Option = Select.Option;

const title = {
  view: "Thông tin hợp đồng",
  add: "Thêm hợp đồng",
  edit: "Sửa thông tin hợp đồng"
};

const initState = {
  mainEmail: "",
  listEmails: [],
  error: "",
  userList: [],
  description: `
  <p><span style="font-size: 16px;"><strong>Costs:</strong></span></p>
<p>Retal costs: $27000</p>
<p>Management costs: $200</p>
<p>Other fees included in the contract: $1200</p>
<p><span style="font-size: 16px;"><strong>Deposits:</strong></span></p>
<p>Amount of payment: $17000</p>
<p><span style="font-size: 16px;"><strong>Payment infomation:</strong></span></p>
<p><strong><em>House rental period:</em></strong> every 3 months</p>
<p><strong><em>Next payment time</em></strong>: 03/04/2020</p>
<p><strong><em>Monthly Service fee period:</em></strong> every 3 months</p>
<p><strong><em>Next payment time</em></strong><strong>:</strong> 03/04/2020</p>
<p><strong><em>VRS's bank accounts:</em></strong></p>
<p>Techcombank - CN SGB TP HCM</p>
  `
};

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      this.props.type === "add"
        ? initState
        : {
            ...props.dataSource,
            mainEmail: props.dataSource.mainUser.email,
            listEmails: props.dataSource.users.map(value => value.email),
            error: "",
            userList: []
          };
  }
  componentDidMount() {
    if (this.props.type === "add" || this.props.type === "edit") {
      let { token, getAllUser } = this.props;
      getAllUser(token, (err, res) => {
        if (!err) this.setState({ userList: res.data });
      });
    }
    const contentBlock = htmlToDraft(this.state.description);
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
  onChange = name => {
    return value => {
      this.setState({ [name]: value, error: "" });
    };
  };
  onInputChange = e => {
    this.setState({ description: e.target.value });
  };
  handleOk = () => {
    let { mainEmail, listEmails } = this.state;
    const description = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    let { type, dataSource } = this.props;
    if (type === "edit") {
      dataSource = {
        mainEmail: dataSource.mainUser.email,
        listEmails: dataSource.users.map(value => value.email),
        description: dataSource.description
      };
    }
    const checkNullState = validateState({ ...this.state, description }, [
      "mainEmail",
      "listEmails",
      "description"
    ]);
    const checkChangedState =
      type === "edit"
        ? checkChanged(dataSource, { ...this.state, description }, [
            "mainEmail",
            "listEmails",
            "description"
          ])
        : { error: false };
    const checkEmail = validateEmail(mainEmail);
    let checkListEmail = true;
    listEmails.forEach(value => {
      if (!validateEmail(value)) checkListEmail = false;
    });
    if (checkChangedState.error)
      return this.setState({ error: checkChangedState.error });
    if (checkNullState.error)
      return this.setState({ error: checkNullState.error });
    if (!checkEmail)
      return this.setState({ error: "*Email chủ hợp đồng không hợp lệ!" });
    if (!checkListEmail)
      return this.setState({ error: "*Email người dùng không hợp lệ!" });
    this.props.handleOk({ mainEmail, listEmails, description });
  };
  handleCancel = () => {
    this.props.handleCancel();
  };
  render() {
    let {
      mainEmail,
      listEmails,
      userList,
      code,
      error,
      description
    } = this.state;
    if (this.props.type === "view") {
      return (
        <Modal
          title={title[this.props.type]}
          visible={true}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item
              label="Chủ hợp đồng"
              {...formItemStyle}
              className="form-item"
            >
              <span>{mainEmail}</span>
            </Form.Item>
            <Form.Item
              label="Người dùng"
              {...formItemStyle}
              className="form-item"
            >
              <div className="project-list">
                {listEmails.map((value, key) => (
                  <div key={key} className="project-list-item">
                    {value}
                  </div>
                ))}
              </div>
            </Form.Item>
            <Form.Item label="Mã" {...formItemStyle} className="form-item">
              <span>{code}</span>
            </Form.Item>
            <Form.Item label="Mô tả" {...formItemStyle} className="form-item">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </Form.Item>
          </Form>
        </Modal>
      );
    }
    return (
      <Modal
        title={title[this.props.type]}
        visible={true}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        okText={`${this.props.type === "add" ? "Thêm" : "Sửa"}`}
      >
        <Form style={{ width: "800px !important" }}>
          <Form.Item
            label="Người dùng"
            {...formItemStyle}
            className="form-item"
            required={true}
          >
            <Select
              mode="multiple"
              value={listEmails}
              placeholder={"Chọn danh sách email"}
              style={{ width: "100%" }}
              onChange={this.onChange("listEmails")}
            >
              {userList.map((value, key) => (
                <Option
                  disabled={value.email === mainEmail}
                  key={key}
                  value={value.email}
                >
                  {value.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {listEmails.length > 0 && (
            <Form.Item
              label="Chủ hợp đồng"
              {...formItemStyle}
              className="form-item"
              required={true}
            >
              <AutoComplete
                style={{ width: "100%" }}
                dataSource={listEmails}
                value={mainEmail}
                onChange={this.onChange("mainEmail")}
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
                placeholder="Chọn email"
                disabled={this.props.type === "edit"}
              />
            </Form.Item>
          )}
          <Form.Item
            label="Mô tả"
            {...formItemStyle}
            className="form-item"
            required={true}
          >
            <div
              style={{
                padding: "5px",
                border: "1px solid #d9d9d9",
                borderRadius: "3px",
                height: "auto",
                minHeight: "500px"
              }}
            >
              <Editor
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign"
                  ],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  history: { inDropdown: true }
                }}
                editorState={this.state.editorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
          </Form.Item>
        </Form>
        <span className="form__error">{error}</span>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  { getAllUser }
)(Popup);

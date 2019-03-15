import React from 'react';
import { Modal, Form, AutoComplete, Select, Input } from 'antd';
import { checkChanged, validateState, validateEmail } from "../../helpers/validateState";
import { getAllUser } from '../../redux/actions/Contract';
import { connect } from 'react-redux';

const formItemStyle = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const Option = Select.Option;

const title = {
    view: "Thông tin hợp đồng",
    add: "Thêm hợp đồng",
    edit: "Sửa thông tin hợp đồng",
}

const initState = {
    mainEmail: "", listEmails: [], error: "", userList: [], description: ""
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : {
            ...props.dataSource,
            mainEmail: props.dataSource.mainUser.email,
            listEmails: props.dataSource.users.map(value => value.email),
            error: "",
            userList: []
        }
    }
    componentDidMount() {
        console.log(this.props.type);
        if (this.props.type === "add" || this.props.type === "edit") {
            let { token, getAllUser } = this.props;
            getAllUser(token, (err, res) => {
                if (!err) this.setState({ userList: res.data })
            })
        }
    }
    onChange = (name) => {
        return value => {
            this.setState({ [name]: value, error: "" })
        }
    }
    onInputChange = (e) => {
        this.setState({ description: e.target.value });
    }
    handleOk = () => {
        let { mainEmail, listEmails, description } = this.state;
        let { type, dataSource } = this.props;
        const checkNullState = validateState(this.state, ["mainEmail", "listEmails", "description"]);
        const checkChangedState = type === "edit" ? checkChanged(dataSource, this.state, ["mainEmail", "listEmails", "description"]) : { error: false };
        const checkEmail = validateEmail(mainEmail);
        let checkListEmail = true;
        listEmails.forEach(value => {
            if (!validateEmail(value)) checkListEmail = false;
        })
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        if (!checkEmail)
            return this.setState({ error: "*Main Email không hợp lệ!" })
        if (!checkListEmail)
            return this.setState({ error: "*List Email không hợp lệ!" })
        this.props.handleOk({ mainEmail, listEmails, description });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { mainEmail, listEmails, userList, code, error, description } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Chủ hợp đồng" {...formItemStyle} className="form-item">
                            <span>{mainEmail}</span>
                        </Form.Item>
                        <Form.Item label="Người dùng" {...formItemStyle} className="form-item">
                            <div className="project-list">
                                {listEmails.map((value, key) => (
                                    <div key={key} className="project-list-item">{value}</div>
                                ))}
                            </div>
                        </Form.Item>
                        <Form.Item label="Mã" {...formItemStyle} className="form-item">
                            <span>{code}</span>
                        </Form.Item>
                        <Form.Item label="Mô tả" {...formItemStyle} className="form-item">
                            <span>{description}</span>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
        return (
            <Modal
                title={title[this.props.type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={`${this.props.type === "add" ? "Thêm" : "Sửa"}`}
            >
                <Form>
                    <Form.Item label="Người dùng" {...formItemStyle} className="form-item" required={true}>
                        <Select mode="tags" value={listEmails} placeholder={"Chọn danh sách email"} style={{ width: "100%" }} onChange={this.onChange("listEmails")}>
                            {
                                userList.map(value => (
                                    <Option disabled={value.email === mainEmail} key={value._id} value={value.email}>{value.email}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    {
                        listEmails.length > 0 && (
                            <Form.Item label="Chủ hợp đồng" {...formItemStyle} className="form-item" required={true}>
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
                        )
                    }
                    <Form.Item label="Mô tả" {...formItemStyle} className="form-item" required={true}>
                        <Input.TextArea placeholder="Mô tả" rows={4} value={description} onChange={this.onInputChange} />
                    </Form.Item>
                </Form>
                <span className="form__error">{error}</span>
            </Modal>
        )
    }
}

export default connect(
    state => ({
        token: state.Auth.token
    }), { getAllUser }
)(Popup)
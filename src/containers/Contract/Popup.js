import React from 'react';
import { Modal, Form, AutoComplete, Input } from 'antd';
import { checkChanged, validateState, validateEmail } from "../../helpers/validateState";
import { getAllUser } from '../../redux/actions/Contract';
import { connect } from 'react-redux';

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const title = {
    view: "Thông tin hợp đồng",
    add: "Thêm hợp đồng",
    edit: "Sửa thông tin hợp đồng",
}

const initState = {
    email: "", error: "", emailList: []
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : {
            ...props.dataSource,
            email: props.dataSource.user.email,
            error: ""
        }
    }
    componentDidMount() {
        if (this.props.type === "add") {
            let { token, getAllUser } = this.props;
            getAllUser(token, (err, res) => {
                if (!err) this.setState({ emailList: res.data })
            })
        }
    }
    onChange = (email) => {
        this.setState({ email, error: "" })
    }
    handleOk = () => {
        let { email } = this.state;
        let { type, dataSource } = this.props;
        const checkNullState = validateState(this.state, ["email"]);
        const checkChangedState = type === "edit" ? checkChanged(dataSource, this.state, ["email"]) : { error: false };
        const checkEmail = validateEmail(email);
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        if (!checkEmail)
            return this.setState({ error: "*Email không hợp lệ!" })
        this.props.handleOk({ email });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { email, code, error } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Email" {...formItemStyle} className="form-item">
                            <span>{email}</span>
                        </Form.Item>
                        <Form.Item label="Mã" {...formItemStyle} className="form-item">
                            <span>{code}</span>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
        let dataSource = this.state.emailList.map(value => value.email);
        return (
            <Modal
                title={title[this.props.type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <Form.Item label="Email" {...formItemStyle} className="form-item" required={true}>
                        <AutoComplete
                            style={{ width: "100%" }}
                            dataSource={dataSource}
                            value={email}
                            onChange={this.onChange}
                            filterOption={(inputValue, option) =>
                                option.props.children
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
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
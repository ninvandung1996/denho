import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const title = {
    view: "Thông tin nhà cung cấp",
    add: "Thêm nhà cung cấp",
    edit: "Sửa thông tin nhà cung cấp",
}

const initState = {
    name: "", about: "", star: "", contact: { numberphone: "", message: "" }
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.supplier }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value })
        }
    }
    changeContact = (name) => {
        return (e) => {
            let { contact } = this.state;
            this.setState({ contact: { ...contact, [name]: e.target.value } });
        }
    }
    handleOk = () => {
        this.props.handleOk(this.state);
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { name, about, star, contact } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Tên dự án" {...formItemStyle} className="form-item">
                            <span>{name}</span>
                        </Form.Item>
                        <Form.Item label="Thông tin" {...formItemStyle} className="form-item">
                            <span>{about}</span>
                        </Form.Item>
                        <Form.Item label="Sao" {...formItemStyle} className="form-item">
                            <span>{star}</span>
                        </Form.Item>
                        <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item">
                            <span>{contact.numberphone}</span>
                        </Form.Item>
                        <Form.Item label="Tin nhắn" {...formItemStyle} className="form-item">
                            <span>{contact.message}</span>
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
            >
                <Form>
                    <Form.Item label="Tên dự án" {...formItemStyle} className="form-item">
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Thông tin" {...formItemStyle} className="form-item">
                        <Input value={about} onChange={this.onChange("about")} />
                    </Form.Item>
                    <Form.Item label="Sao" {...formItemStyle} className="form-item">
                        <InputNumber min={1} max={5} defaultValue={star} onChange={this.onChange("star")} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item">
                        <Input value={contact.numberphone} onChange={this.changeContact("numberphone")} />
                    </Form.Item>
                    <Form.Item label="Tin nhắn" {...formItemStyle} className="form-item">
                        <Input value={contact.message} onChange={this.changeContact("message")} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
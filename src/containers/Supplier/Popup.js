import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { checkChanged, validateState } from "../../helpers/validateState";

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
    name: "", about: "", star: 5, contact: { numberphone: "", message: "" }, error: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.supplier, error: "" }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value, error: "" })
        }
    }
    onNumberChange = (value) => {
        this.setState({ star: value, error: "" });
    }
    changeContact = (name) => {
        return (e) => {
            let { contact } = this.state;
            this.setState({ contact: { ...contact, [name]: e.target.value }, error: "" });
        }
    }
    handleOk = () => {
        let { name, about, star, contact, contact: { numberphone, message } } = this.state;
        let { type, supplier } = this.props;
        const checkNullState = validateState({name,about,star,numberphone,message}, ["name", "about", "star", "numberphone", "message"]);
        const checkChangedState = type === "edit" ? checkChanged({
            ...supplier, numberphone: supplier.contact.numberphone, message: supplier.contact.message
        }, { ...this.state, numberphone, message }, ["name", "about", "star", "numberphone", "message"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ name, about, star, contact });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { name, about, star, contact, error } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Tên" {...formItemStyle} className="form-item">
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
                    <Form.Item label="Tên" {...formItemStyle} className="form-item" required={true}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Thông tin" {...formItemStyle} className="form-item" required={true}>
                        <Input value={about} onChange={this.onChange("about")} />
                    </Form.Item>
                    <Form.Item label="Sao" {...formItemStyle} className="form-item" required={true}>
                        <InputNumber min={1} max={5} defaultValue={star} onChange={this.onNumberChange} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item" required={true}>
                        <Input value={contact.numberphone} onChange={this.changeContact("numberphone")} />
                    </Form.Item>
                    <Form.Item label="Tin nhắn" {...formItemStyle} className="form-item" required={true}>
                        <Input value={contact.message} onChange={this.changeContact("message")} />
                    </Form.Item>
                </Form>
                <span className="form__error">{error}</span>
            </Modal>
        )
    }
}
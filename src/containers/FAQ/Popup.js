import React from 'react';
import { Modal, Form, Input } from 'antd';

const formItemStyle = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

const title = {
    view: "Thông tin FAQ",
    add: "Thêm FAQ",
    edit: "Sửa FAQ",
}

const initState = {
    question: "", answer: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.FAQ }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value })
        }
    }
    handleOk = () => {
        this.props.handleOk(this.state);
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { question, answer } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Câu hỏi" {...formItemStyle} className="form-item">
                            <span>{question}</span>
                        </Form.Item>
                        <Form.Item label="Trả lời" {...formItemStyle} className="form-item">
                            <span>{answer}</span>
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
                    <Form.Item label="Câu hỏi" {...formItemStyle} className="form-item">
                        <Input value={question} onChange={this.onChange("question")} />
                    </Form.Item>
                    <Form.Item label="Trả lời" {...formItemStyle} className="form-item">
                        <Input value={answer} onChange={this.onChange("answer")} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
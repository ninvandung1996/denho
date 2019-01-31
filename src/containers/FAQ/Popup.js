import React from 'react';
import { Modal, Form, Input } from 'antd';
import { checkChanged, validateState } from "../../helpers/validateState";
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
    question: "", answer: "", error: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.FAQ, error: "" }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value, error: "" })
        }
    }
    handleOk = () => {
        let { question, answer } = this.state;
        let { type, FAQ } = this.props;
        const checkNullState = validateState(this.state, ["question", "answer"]);
        const checkChangedState = type === "edit" ? checkChanged(FAQ, this.state, ["question", "answer"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ question, answer });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { question, answer, error } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    footer={null}
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
                    <Form.Item label="Câu hỏi" {...formItemStyle} className="form-item" required={true}>
                        <Input value={question} onChange={this.onChange("question")} />
                    </Form.Item>
                    <Form.Item label="Trả lời" {...formItemStyle} className="form-item" required={true}>
                        <Input value={answer} onChange={this.onChange("answer")} />
                    </Form.Item>
                </Form>
                <span className="form__error">{error}</span>
            </Modal>
        )
    }
}
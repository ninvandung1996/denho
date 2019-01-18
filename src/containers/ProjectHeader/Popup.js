import React from 'react';
import { Button, Modal, Form, Input, Upload, Icon } from 'antd';

const formItemStyle = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

const title = {
    add: "Thêm dự án mới", edit: "Sửa thông tin dự án"
}

const initState = {
    name: "", address: "", location: "", thumbnail: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.project }
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
        let { name, address, location, thumbnail } = this.state;
        return (
            <Modal
                title={title[this.props.type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <Form.Item label="Tên dự án" {...formItemStyle}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" {...formItemStyle}>
                        <Input value={address} onChange={this.onChange("address")} />
                    </Form.Item>
                    <Form.Item label="Khu vực" {...formItemStyle}>
                        <Input value={location} onChange={this.onChange("location")} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" {...formItemStyle}>
                        <Upload action="http://localhost:3000" listType='picture' defaultFileList={[]}>
                            <Button>
                                <Icon type="upload" /> Thêm ảnh
                    </Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
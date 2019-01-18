import React from 'react';
import { Button, Modal, Form, Input, Upload, Icon } from 'antd';

const formItemStyle = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

const title = { add: "Thêm căn hộ mới", edit: "Sửa thông tin căn hộ" }

const initState = {
    name: "", location: "", area: "", cost: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : {
            name: this.props.apartment.name,
            location: this.props.apartment.location,
            area: this.props.apartment.area,
            cost: this.props.apartment.cost
        }
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
        let { name, location, area, cost } = this.state;
        let { type } = this.props;
        return (
            <Modal
                title={title[type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <Form.Item label="Tên" {...formItemStyle}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Vị trí" {...formItemStyle}>
                        <Input value={location} onChange={this.onChange("location")} />
                    </Form.Item>
                    <Form.Item label="Diện tích" {...formItemStyle}>
                        <Input type="number" value={area} onChange={this.onChange("area")} />
                    </Form.Item>
                    <Form.Item label="Giá tiền" {...formItemStyle}>
                        <Input type="number" value={cost} onChange={this.onChange("cost")} />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
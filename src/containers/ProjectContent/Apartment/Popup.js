import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { checkChanged, validateState } from "../../../helpers/validateState";

const formItemStyle = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const title = { add: "Thêm căn hộ mới", edit: "Sửa thông tin căn hộ" }

const initState = {
    name: "", location: "", area: "", cost: "", maxMembers: "", error: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : {
            name: this.props.apartment.name,
            location: this.props.apartment.location,
            area: this.props.apartment.area,
            cost: this.props.apartment.cost,
            maxMembers: this.props.apartment.maxMembers,
            error: ""
        }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value, error: "" })
        }
    }
    numberChange = (name) => {
        return (value) => {
            this.setState({ [name]: value, error: "" })
        }
    }
    handleOk = () => {
        let { name, location, area, cost, maxMembers } = this.state;
        let { type, apartment } = this.props;
        const checkNullState = validateState(this.state, ["name", "location", "area", "cost", "maxMembers"]);
        const checkChangedState = type === "edit" ? checkChanged(apartment, this.state, ["name", "location", "area", "cost", "maxMembers"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ name, location, area, cost, maxMembers });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { name, location, area, cost, maxMembers, error } = this.state;
        let { type } = this.props;
        return (
            <Modal
                title={title[type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={type === "add" ? "Thêm" : "Sửa"}
            >
                <Form>
                    <Form.Item label="Tên" {...formItemStyle} required={true}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Vị trí" {...formItemStyle} required={true}>
                        <Input value={location} onChange={this.onChange("location")} />
                    </Form.Item>
                    <Form.Item label="Diện tích" {...formItemStyle} required={true}>
                        <InputNumber value={area} onChange={this.numberChange("area")} />
                    </Form.Item>
                    <Form.Item label="Giá tiền" {...formItemStyle} required={true}>
                        <InputNumber value={cost} onChange={this.numberChange("cost")} />
                    </Form.Item>
                    <Form.Item label="Thành viên" {...formItemStyle} required={true}>
                        <InputNumber value={maxMembers} onChange={this.numberChange("maxMembers")} />
                    </Form.Item>
                </Form>
                <span className="form__error">{error}</span>
            </Modal>
        )
    }
}
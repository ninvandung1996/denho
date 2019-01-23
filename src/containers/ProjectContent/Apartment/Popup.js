import React from 'react';
import { Button, Modal, Form, Input, Upload, Icon } from 'antd';
import { checkChanged, validateState } from "../../../helpers/validateState";

const formItemStyle = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

const title = { add: "Thêm căn hộ mới", edit: "Sửa thông tin căn hộ" }

const initState = {
    name: "", location: "", area: "", cost: "", error: ""
}

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : {
            name: this.props.apartment.name,
            location: this.props.apartment.location,
            area: this.props.apartment.area,
            cost: this.props.apartment.cost,
            error: ""
        }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value, error: "" })
        }
    }
    handleOk = () => {
        let { name, location, area, cost } = this.state;
        let { type, apartment } = this.props;
        const checkNullState = validateState(this.state, ["name", "location", "area", "cost"]);
        const checkChangedState = type === "edit" ? checkChanged(apartment, this.state, ["name", "location", "area", "cost"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ name, location, area, cost });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { name, location, area, cost, error } = this.state;
        let { type } = this.props;
        return (
            <Modal
                title={title[type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <Form.Item label="Tên" {...formItemStyle} required={true}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Vị trí" {...formItemStyle} required={true}>
                        <Input value={location} onChange={this.onChange("location")} />
                    </Form.Item>
                    <Form.Item label="Diện tích" {...formItemStyle} required={true}>
                        <Input type="number" value={area} onChange={this.onChange("area")} />
                    </Form.Item>
                    <Form.Item label="Giá tiền" {...formItemStyle} required={true}>
                        <Input type="number" value={cost} onChange={this.onChange("cost")} />
                    </Form.Item>
                </Form>
                <span className="form__error">{error}</span>
            </Modal>
        )
    }
}
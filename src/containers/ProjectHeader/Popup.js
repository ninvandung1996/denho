import React from 'react';
import { Modal, Form, Input, Upload, Icon, message } from 'antd';
import configs from '../../redux/constants/configs';
import { connect } from 'react-redux';
import { checkChanged, validateState } from "../../helpers/validateState";

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const title = {
    add: "Thêm dự án mới", edit: "Sửa thông tin dự án"
}

const initState = {
    name: "", address: "", location: "", thumbnail: "", loading: false, error: ""
}

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Kích thước ảnh tối đa là 2MB!');
    }
    return isLt2M;
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.project, loading: false, error: "" }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value, error: "" })
        }
    }
    handleOk = () => {
        let { name, address, location, thumbnail } = this.state;
        let { type, project } = this.props;
        const checkNullState = validateState(this.state, ["name", "address", "location", "thumbnail"]);
        const checkChangedState = type === "edit" ? checkChanged(project, this.state, ["name", "address", "location", "thumbnail"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ name, address, location, thumbnail });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    thumbnailChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                loading: false,
                thumbnail: `${configs.endPointImage}${info.file.response.data.name}`
            })
        }
    }
    render() {
        let { name, address, location, thumbnail, error } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Modal
                title={title[this.props.type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={`${this.props.type === "add" ? "Thêm" : "Sửa"}`}
            >
                <Form>
                    <Form.Item label="Tên dự án" {...formItemStyle} required={true}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" {...formItemStyle} required={true}>
                        <Input value={address} onChange={this.onChange("address")} />
                    </Form.Item>
                    <Form.Item label="Khu vực" {...formItemStyle} required={true}>
                        <Input value={location} onChange={this.onChange("location")} />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" {...formItemStyle} required={true}>
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`${configs.endPointImage}`}
                            headers={{ Authorization: `access_token ${this.props.token}` }}
                            beforeUpload={beforeUpload}
                            onChange={this.thumbnailChange}
                        >
                            {thumbnail ? <img style={{ width: "100%" }} src={thumbnail} alt="thumbnail" /> : uploadButton}
                        </Upload>
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
    }), {
    }
)(Popup)
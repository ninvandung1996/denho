import React from 'react';
import { Modal, Form, Input, Upload, Icon, message } from 'antd';
import configs from '../../redux/constants/configs';
import { connect } from 'react-redux';
const timeFormat = "DD/MM/YYYY MM:HH";

const formItemStyle = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

const title = {
    add: "Thêm dự án mới", edit: "Sửa thông tin dự án"
}

const initState = {
    name: "", address: "", location: "", thumbnail: "", loading: false
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('Chỉ có thể upload ảnh JPG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Kích thước ảnh tối đa là 2MB!');
    }
    return isJPG && isLt2M;
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : { ...this.props.project, loading: false }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value })
        }
    }
    handleOk = () => {
        let { name, address, location, thumbnail } = this.state;
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
                thumbnail: `${configs.endPointImage}/uploads/files/${info.file.response.data.name}`
            })
        }
    }
    render() {
        let { name, address, location, thumbnail } = this.state;
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
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`${configs.endPointImage}/uploads/files`}
                            headers={{ Authorization: `access_token ${this.props.token}` }}
                            beforeUpload={beforeUpload}
                            onChange={this.thumbnailChange}
                        >
                            {thumbnail ? <img style={{ width: "100%" }} src={thumbnail} alt="thumbnail" /> : uploadButton}
                        </Upload>
                    </Form.Item>
                </Form>
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
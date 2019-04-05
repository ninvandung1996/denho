import React from 'react';
import { Modal, Form, Input, Select, Upload, Icon, message, Switch } from 'antd';
import { connect } from 'react-redux';
import { getAllProject } from '../../redux/actions/Service';
import configs from '../../redux/constants/configs';
import { checkChanged, validateState } from "../../helpers/validateState";

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const title = {
    view: "Thông tin dịch vụ",
    add: "Thêm dịch vụ",
    edit: "Sửa thông tin dịch vụ",
}

const Option = Select.Option;

const initState = {
    thumbnail: "", name: "", detail: "", dateAndTime: "", projects: [], projectList: [], loading: false, error: "",
    createBy: "", status: true
}

function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
    }
    return isLt2M;
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.type === "add" ? initState : {
            ...props.data,
            projects: props.data.projects.map(value => value._id)
            , projectList: [], error: ""
        }
    }
    componentDidMount() {
        let { token, getAllProject } = this.props;
        getAllProject(token, (err, res) => {
            if (!err) {
                this.setState({ projectList: res.data })
            }
        })
    }
    onChange = (name) => {
        return e =>
            this.setState({ [name]: e.target.value, error: "" });
    }
    projectChange = (projects) => {
        this.setState({ projects, error: "" })
    }
    timeChange = (dateAndTime) => {
        this.setState({ dateAndTime, error: "" })
    }
    thumbnailChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                loading: false,
                thumbnail: `${configs.endPointImage}${info.file.response.data.name}`,
                error: ""
            })
        }
    }
    onSwitchChange = (name) => {
        return value => {
            this.setState({ [name]: value });
        }
    }
    handleOk = () => {
        let { thumbnail, detail, dateAndTime, projects, name, createBy,status } = this.state;
        let { type, data } = this.props;
        const checkNullState = validateState(this.state, ["thumbnail", "detail", "dateAndTime", "projects", "name", "createBy"]);
        const checkChangedState = type === "edit" ? checkChanged({ ...data }, this.state, ["thumbnail", "detail", "dateAndTime", "projects", "name", "createBy", "status"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        if(type === "add"){
            return this.props.handleOk({ thumbnail, detail, dateAndTime, projects, name, createBy });
        }
        this.props.handleOk({ thumbnail, detail, dateAndTime, projects, name, createBy, status });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { thumbnail, name, detail, dateAndTime, projects, projectList, createBy, error, status } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Thumbnail" {...formItemStyle} className="form-item">
                            <img style={{ width: "102px", objectFit: "cover" }} src={thumbnail} alt="" />
                        </Form.Item>
                        <Form.Item label="Tên" {...formItemStyle} className="form-item">
                            <span>{name}</span>
                        </Form.Item>
                        <Form.Item label="Chi tiết" {...formItemStyle} className="form-item">
                            <span>{detail}</span>
                        </Form.Item>
                        <Form.Item label="Thời gian" {...formItemStyle} className="form-item">
                            <span>{dateAndTime}</span>
                        </Form.Item>
                        <Form.Item label="Người tạo" {...formItemStyle} className="form-item">
                            <span>{createBy}</span>
                        </Form.Item>
                        <Form.Item label="Trạng thái" {...formItemStyle} className="form-item">
                            <Switch disabled={true} defaultChecked={status} checkedChildren="Hoạt động" unCheckedChildren="Ngừng hoạt động" />
                        </Form.Item>
                        <Form.Item label="Dự án" {...formItemStyle} className="form-item">
                            <div className="project-list">
                                {this.props.data.projects.map(value => (
                                    <div key={value._id} className="project-list-item">{value.name}</div>
                                ))}
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        };
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
                    <Form.Item label="Thumbnail" {...formItemStyle} className="form-item" required={true}>
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
                    <Form.Item label="Tên" {...formItemStyle} className="form-item" required={true}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Chi tiết" {...formItemStyle} className="form-item" required={true}>
                        <Input.TextArea autosize={{ minRows: 2 }} value={detail} onChange={this.onChange("detail")} />
                    </Form.Item>
                    <Form.Item label="Thời gian" {...formItemStyle} className="form-item" required={true}>
                        <Input.TextArea rows={4} value={dateAndTime} onChange={this.onChange("dateAndTime")} />
                    </Form.Item>
                    {
                        this.props.type === "edit" && (
                            <Form.Item label="Trạng thái" {...formItemStyle} className="form-item" required={true}>
                                <Switch checked={status} onChange={this.onSwitchChange('status')} checkedChildren="Hoạt động" unCheckedChildren="Ngừng hoạt động" />
                            </Form.Item>
                        )
                    }
                    <Form.Item label="Người tạo" {...formItemStyle} className="form-item" required={true}>
                        <Input value={createBy} onChange={this.onChange("createBy")} />
                    </Form.Item>
                    <Form.Item label="Dự án" {...formItemStyle} className="form-item" required={true}>
                        <Select mode="multiple" value={projects} placeholder={"Chọn dự án"} style={{ width: "100%" }} onChange={this.projectChange}>
                            {
                                projectList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.name}</Option>
                                ))
                            }
                        </Select>
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
        getAllProject
    }
)(Popup);
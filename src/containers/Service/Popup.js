import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Upload, Icon, message } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllProject } from '../../redux/actions/Service';
import configs from '../../redux/constants/configs';
import { checkChanged, validateState } from "../../helpers/validateState";
const timeFormat = "DD/MM/YYYY MM:HH";

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
    thumbnail: "", detail: "", dateAndTime: moment(), project: "", projectList: [], loading: false, error: ""
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('Chỉ có thể upload file JPG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Dung lượng ảnh phải nhỏ hơn 2MB!');
    }
    return isJPG && isLt2M;
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.type === "add" ? initState : {
            ...props.data,
            project: props.data.project._id
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
    detailChange = (e) => {
        this.setState({ detail: e.target.value, error: "" });
    }
    projectChange = (project) => {
        this.setState({ project, error: "" })
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
                thumbnail: `${configs.endPointImage}/uploads/files/${info.file.response.data.name}`,
                error: ""
            })
        }
    }
    handleOk = () => {
        let { thumbnail, detail, dateAndTime, project } = this.state;
        let { type, data } = this.props;
        const checkNullState = validateState(this.state, ["thumbnail", "detail", "dateAndTime", "project"]);
        const checkChangedState = type === "edit" ? checkChanged({ ...data, project: data.project._id }, this.state, ["thumbnail", "detail", "dateAndTime", "project"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ thumbnail, detail, dateAndTime, project });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { thumbnail, detail, dateAndTime, project, projectList, error } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Thumbnail" {...formItemStyle} className="form-item">
                            <img style={{ width: "102px", objectFit: "cover" }} src={thumbnail} />
                        </Form.Item>
                        <Form.Item label="Chi tiết" {...formItemStyle} className="form-item">
                            <span>{detail}</span>
                        </Form.Item>
                        <Form.Item label="Thời gian" {...formItemStyle} className="form-item">
                            <span>{moment(dateAndTime).format(timeFormat)}</span>
                        </Form.Item>
                        <Form.Item label="Dự án" {...formItemStyle} className="form-item">
                            <span>{this.props.data.project.name}</span>
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
            >
                <Form>
                    <Form.Item label="Thumbnail" {...formItemStyle} className="form-item" required={true}>
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
                    <Form.Item label="Chi tiết" {...formItemStyle} className="form-item" required={true}>
                        <Input value={detail} onChange={this.detailChange} />
                    </Form.Item>
                    <Form.Item label="Thời gian" {...formItemStyle} className="form-item" required={true}>
                        <DatePicker
                            showTime
                            value={moment(dateAndTime)}
                            format={timeFormat} placeholder="Chọn thời gian" onChange={this.timeChange} onOk={this.timeChange}
                        />
                    </Form.Item>
                    <Form.Item label="Dự án" {...formItemStyle} className="form-item" required={true}>
                        <Select defaultValue={project} value={project} placeholder={"Chọn dự án"} style={{ width: "100%" }} onChange={this.projectChange}>
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
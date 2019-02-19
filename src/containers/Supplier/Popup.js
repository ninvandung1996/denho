import React from 'react';
import { Modal, Form, Input, InputNumber, Upload, Icon, message, Select, AutoComplete } from 'antd';
import { checkChanged, validateState } from "../../helpers/validateState";
import configs from '../../redux/constants/configs';
import { connect } from 'react-redux';
import { getAllProject, getCategory } from '../../redux/actions/Supplier';

const Option = Select.Option;

const formItemStyle = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
}

const title = {
    view: "Thông tin nhà cung cấp",
    add: "Thêm nhà cung cấp",
    edit: "Sửa thông tin nhà cung cấp",
}

const initState = {
    name: "", about: "", star: 5, contact: { numberphone: "", message: "" }, error: "", thumbnail: "", category: "",
    projects: [], projectList: [], categoryList: []
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
            ...props.supplier,
            projects: props.supplier.projects.map(value => value._id),
            projectList: [], categoryList: [], error: ""
        }
    }
    componentDidMount() {
        if (this.props.type === "add" || this.props.type === "edit") {
            let { token, getAllProject, getCategory } = this.props;
            getAllProject(token, (err, res) => {
                if (!err) this.setState({ projectList: res.data })
            })
            getCategory(token, (err, res) => {
                console.log(res)
                if (!err) this.setState({ categoryList: res.data });
            })
        }
    }
    onChange = (name) => {
        return (e) => {
            this.setState({ [name]: e.target.value, error: "" })
        }
    }
    onNumberChange = (value) => {
        this.setState({ star: value, error: "" });
    }
    changeCategory = (value) => {
        this.setState({ category: value, error: "" });
    }
    changeContact = (name) => {
        return (e) => {
            let { contact } = this.state;
            this.setState({ contact: { ...contact, [name]: e.target.value }, error: "" });
        }
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
        let { name, about, star, contact, contact: { numberphone, message }, thumbnail, projects, category } = this.state;
        let { type, supplier } = this.props;
        const checkNullState = validateState({ name, about, star, numberphone, message, thumbnail, projects, category }, ["name", "about", "star", "numberphone", "message", "thumbnail", "projects", "category"]);
        const checkChangedState = type === "edit" ? checkChanged({
            ...supplier, numberphone: supplier.contact.numberphone, message: supplier.contact.message
        }, { ...this.state, numberphone, message }, ["name", "about", "star", "numberphone", "message", "thumbnail", "projects", "category"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ name, about, star, contact, thumbnail, projects, category });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    projectChange = (projects) => {
        this.setState({ projects, error: "" })
    }
    render() {
        let { name, about, star, contact, error, thumbnail, projects, category, categoryList } = this.state;
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
                            <img style={{ width: "102px", objectFit: "cover" }} src={thumbnail} />
                        </Form.Item>
                        <Form.Item label="Tên" {...formItemStyle} className="form-item">
                            <span>{name}</span>
                        </Form.Item>
                        <Form.Item label="Thông tin" {...formItemStyle} className="form-item">
                            <span>{about}</span>
                        </Form.Item>
                        <Form.Item label="Danh mục" {...formItemStyle} className="form-item">
                            <span>{category}</span>
                        </Form.Item>
                        <Form.Item label="Sao" {...formItemStyle} className="form-item">
                            <span>{star}</span>
                        </Form.Item>
                        <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item">
                            <span>{contact.numberphone}</span>
                        </Form.Item>
                        <Form.Item label="Tin nhắn" {...formItemStyle} className="form-item">
                            <span>{contact.message}</span>
                        </Form.Item>
                        <Form.Item label="Dự án" {...formItemStyle} className="form-item">
                            <div className="project-list">
                                {this.props.supplier.projects.map(value => (
                                    <div key={value._id} className="project-list-item">{value.name}</div>
                                ))}
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
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
                    <Form.Item label="Tên" {...formItemStyle} className="form-item" required={true}>
                        <Input value={name} onChange={this.onChange("name")} />
                    </Form.Item>
                    <Form.Item label="Thông tin" {...formItemStyle} className="form-item" required={true}>
                        <Input.TextArea autosize={{ minRows: 2 }} value={about} onChange={this.onChange("about")} />
                    </Form.Item>
                    <Form.Item label="Danh mục" {...formItemStyle} className="form-item" required={true}>
                        <AutoComplete
                            dataSource={categoryList}
                            value={category}
                            onChange={this.changeCategory}
                            filterOption={(inputValue, option) =>
                                option.props.children
                                    .toUpperCase()
                                    .indexOf(inputValue.toUpperCase()) !== -1
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Sao" {...formItemStyle} className="form-item" required={true}>
                        <InputNumber min={1} max={5} defaultValue={star} onChange={this.onNumberChange} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item" required={true}>
                        <Input value={contact.numberphone} onChange={this.changeContact("numberphone")} />
                    </Form.Item>
                    <Form.Item label="Tin nhắn" {...formItemStyle} className="form-item" required={true}>
                        <Input value={contact.message} onChange={this.changeContact("message")} />
                    </Form.Item>
                    <Form.Item label="Dự án" {...formItemStyle} className="form-item" required={true}>
                        <Select mode="multiple" value={projects} placeholder={"Chọn dự án"} style={{ width: "100%" }} onChange={this.projectChange}>
                            {
                                this.state.projectList.map(value => (
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
        getAllProject, getCategory
    }
)(Popup)
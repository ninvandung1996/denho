import React from 'react';
import { Modal, Form, Input, Upload, Icon, message, Select, AutoComplete } from 'antd';
import { checkChanged, validateState } from "../../helpers/validateState";
import configs from '../../redux/constants/configs';
import { connect } from 'react-redux';
import { getAllProject, getCategory, getAllService } from '../../redux/actions/Supplier';

const Option = Select.Option;

const formItemStyle = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

const title = {
    view: "Thông tin nhà cung cấp",
    add: "Thêm nhà cung cấp",
    edit: "Sửa thông tin nhà cung cấp",
}

const initState = {
    name: "", about: "", contact: { numberphone: "", message: "" }, error: "", thumbnail: "", category: "",
    projects: [], projectList: [], categoryList: [], address: "", time: "", listServices: [], services: []
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
            projectList: [], categoryList: [], error: "", services: [],
            listServies: props.supplier.listServies ? props.supplier.listServies.map(value => value._id) : []
        }
    }
    componentDidMount() {
        if (this.props.type === "add" || this.props.type === "edit") {
            let { token, getAllProject, getCategory, getAllService } = this.props;
            getAllProject(token, (err, res) => {
                if (!err) this.setState({ projectList: res.data })
            })
            getAllService(token, (err, res) => {
                if (!err) this.setState({ services: res.data });
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
                thumbnail: `${configs.endPointImage}${info.file.response.data.name}`,
                error: ""
            })
        }
    }
    handleOk = () => {
        let { name, about, contact, contact: { numberphone, message }, thumbnail, projects, category, address, time, listServices } = this.state;
        console.log(listServices)
        let { type, supplier } = this.props;
        const checkNullState = validateState({ name, about, numberphone, message, thumbnail, projects, category, address, time, listServices }, ["name", "about", "numberphone", "message", "thumbnail", "projects", "category", "address", "time", "listServices"]);
        const checkChangedState = type === "edit" ? checkChanged({
            ...supplier, numberphone: supplier.contact.numberphone, message: supplier.contact.message
        }, { ...this.state, numberphone, message }, ["name", "about", "numberphone", "message", "thumbnail", "projects", "category", "address", "time", "listServices"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        this.props.handleOk({ name, about, contact, thumbnail, projects, category, address, time, listServices });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    selectChange = (name) => {
        return (value) => {
            this.setState({ [name]: value, error: "" })
        }
    }
    render() {
        let { name, about, contact, error, thumbnail, projects, category, categoryList, address, time, listServices } = this.state;
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
                        <Form.Item label="Thông tin" {...formItemStyle} className="form-item">
                            <span>{about}</span>
                        </Form.Item>
                        <Form.Item label="Danh mục" {...formItemStyle} className="form-item">
                            <span>{category}</span>
                        </Form.Item>
                        <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item">
                            <span>{contact.numberphone}</span>
                        </Form.Item>
                        <Form.Item label="Link Messenger" {...formItemStyle} className="form-item">
                            <span>{contact.message}</span>
                        </Form.Item>
                        <Form.Item label="Địa chỉ" {...formItemStyle} className="form-item">
                            <span>{address}</span>
                        </Form.Item>
                        <Form.Item label="Thời gian hoạt động" {...formItemStyle} className="form-item">
                            <span>{time}</span>
                        </Form.Item>
                        <Form.Item label="Dự án" {...formItemStyle} className="form-item">
                            <div className="project-list">
                                {this.props.supplier.projects.map(value => (
                                    <div key={value._id} className="project-list-item">{value.name}</div>
                                ))}
                            </div>
                        </Form.Item>
                        <Form.Item label="Dịch vụ" {...formItemStyle} className="form-item">
                            <div className="project-list">
                                {this.props.supplier.listServices.map(value => (
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
                    <Form.Item label="Số điện thoại" {...formItemStyle} className="form-item" required={true}>
                        <Input value={contact.numberphone} onChange={this.changeContact("numberphone")} />
                    </Form.Item>
                    <Form.Item label="Link messenger" {...formItemStyle} className="form-item" required={true}>
                        <Input value={contact.message} onChange={this.changeContact("message")} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" {...formItemStyle} className="form-item" required={true}>
                        <Input value={address} onChange={this.onChange("address")} />
                    </Form.Item>
                    <Form.Item label="Thời gian hoạt động" {...formItemStyle} className="form-item" required={true}>
                        <Input value={time} onChange={this.onChange("time")} />
                    </Form.Item>
                    <Form.Item label="Dự án" {...formItemStyle} className="form-item" required={true}>
                        <Select mode="multiple" value={projects} placeholder={"Chọn dự án"} style={{ width: "100%" }} onChange={this.selectChange("projects")}>
                            {
                                this.state.projectList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Dịch vụ" {...formItemStyle} className="form-item" required={true}>
                        <Select mode="multiple" value={listServices} placeholder={"Chọn dịch vụ"} style={{ width: "100%" }} onChange={this.selectChange("listServices")}>
                            {
                                this.state.services.map(value => (
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
        getAllProject, getCategory, getAllService
    }
)(Popup)
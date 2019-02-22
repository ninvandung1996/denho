import React, { Component } from "react";
import { Select, Modal, Form } from 'antd';
import './index.scss';
import FullCalendar from './Calendar';
import { CalenderHeaderWrapper } from "./calendar.style";
import { connect } from 'react-redux';
import { selectApartment, getProject, selectProject, editApartment, deleteApartment, getApartment } from '../../redux/actions/Calendar';
import Popup from '../ProjectContent/Apartment/Popup';

const Option = Select.Option;

const formItemStyle = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 }
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false }
    }
    componentDidMount() {
        let { token, getProject } = this.props;
        getProject(token);
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
        let { token, editApartment, selectedApartment } = this.props;
        editApartment(selectedApartment._id, data, token, (err, res) => {
            if (!err) {
                this.setState({ visible: false });
            }
        })
    }
    // handleCancel = () => {
    //     this.setState({ visible: false });
    // }
    // toggleDelete = () => {
    //     this.setState((preState, props) => {
    //         return { showDelete: !preState.showDelete }
    //     })
    // }
    // handleChange = (name) => {
    //     return e => {
    //         let { selectApartment } = this.state;
    //         selectApartment[name] = e.target.value;
    //         this.setState({ selectApartment });
    //     }
    // }
    handleSelectChange = (name) => {
        return value => {
            this.props["select" + name](value);
            if (name === "Project") {
                let { token, getApartment } = this.props;
                getApartment(value === "all" ? "" : value, token)
            }
        }
    }
    onConfirmDelete = () => {
        let { selectedApartment, deleteApartment, token } = this.props;
        deleteApartment(selectedApartment._id, token);
    }
    render() {
        let { selectedApartment, apartments, selectedProject, projects } = this.props;
        let { visible } = this.state;
        return (
            <React.Fragment>
                <CalenderHeaderWrapper className="calendarHeader">
                    <div className="calendarHeader-info" span={20}>
                        <Form>
                            <Form.Item label="Dự án" {...formItemStyle} className="calendarHeader-info-select">
                                <Select
                                    showSearch
                                    className="select-apartment"
                                    value={selectedProject ? selectedProject._id : "all"}
                                    optionFilterProp="children"
                                    onChange={this.handleSelectChange("Project")}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={"all"}>Tất cả</Option>
                                    {
                                        projects.map(value => <Option key={value._id} value={value._id}>{value.name}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Căn hộ" {...formItemStyle} className="calendarHeader-info-select">
                                <Select
                                    showSearch
                                    className="select-apartment"
                                    value={selectedApartment ? selectedApartment._id : undefined}
                                    placeholder="Chọn căn hộ"
                                    optionFilterProp="children"
                                    onChange={this.handleSelectChange("Apartment")}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        apartments.map(value => <Option key={value._id} value={value._id}>{value.name}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Form>
                        <div className="apartment-info">
                            <div className="apartment-info-item">
                                <span>Tên căn hộ:</span>
                                <span>{selectedApartment ? selectedApartment.name : ""}</span>
                            </div>
                            <div className="apartment-info-item">
                                <span>Vị trí:</span>
                                <span>{selectedApartment ? selectedApartment.location : ""}</span>
                            </div>
                            <div className="apartment-info-item">
                                <span>Diện tích:</span>
                                <span>{selectedApartment ? selectedApartment.area : ""}</span>
                            </div>
                            <div className="apartment-info-item">
                                <span>Giá tiền:</span>
                                <span>{selectedApartment ? selectedApartment.cost : ""}</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="calendarHeader-btns" span={4}>
                        <Tooltip placement="top" title="Chỉnh sửa thông tin căn hộ">
                            <Button className="button-group__single" icon="edit" onClick={this.showModal} />
                        </Tooltip>
                        {
                            (selectedApartment && selectedApartment.bookings.length > 0) ? (
                                <Tooltip placement="top" title="Xóa căn hộ">
                                    <Button className="button-group__single" icon="close" onClick={this.toggleDelete} />
                                </Tooltip>
                            ) : (
                                    <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
                                        <Tooltip placement="top" title="Xóa căn hộ">
                                            <Button className="button-group__single" icon="close" />
                                        </Tooltip>
                                    </Popconfirm>
                                )
                        }
                    </div> */}
                    <div className="calendarHeader-status-info" >
                        <div className="calendarHeader-status-info-item">Chưa check-in</div>
                        <div className="calendarHeader-status-info-item">Đã check-in</div>
                        <div className="calendarHeader-status-info-item">Đã check-out</div>
                    </div>
                </CalenderHeaderWrapper>
                <FullCalendar />
                {
                    visible && <Popup type="edit" apartment={selectedApartment} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                }
                {
                    this.state.showDelete && <Modal
                        title={"Xóa dự án"}
                        visible={true}
                        onCancel={this.toggleDelete}
                        footer={null}
                    >
                        <span>Không thể xóa căn hộ khi chưa xóa hết các booking của căn hộ đó!</span>
                    </Modal>
                }
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        token: state.Auth.token,
        apartments: state.Calendar.apartments,
        selectedApartment: state.Calendar.selectedApartment,
        projects: state.Calendar.projects,
        selectedProject: state.Calendar.selectedProject
    }), {
        selectApartment, editApartment, deleteApartment,
        getProject, selectProject, getApartment
    }
)(Calendar);
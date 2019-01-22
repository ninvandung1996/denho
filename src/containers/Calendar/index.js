import React, { Component } from "react";
import { Button, Tooltip, Select, Popconfirm } from 'antd';
import './index.scss';
import FullCalendar from './Calendar';
import { CalenderHeaderWrapper } from "./calendar.style";
import { connect } from 'react-redux';
import { selectApartment, editApartment, deleteApartment } from '../../redux/actions/Calendar';
import Popup from '../ProjectContent/Apartment/Popup';

const Option = Select.Option;

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, selectApartment: {} }
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
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleChange = (name) => {
        return e => {
            let { selectApartment } = this.state;
            selectApartment[name] = e.target.value;
            this.setState({ selectApartment });
        }
    }
    handleSelectChange = (value) => {
        this.props.selectApartment(value);
    }
    onConfirmDelete = () => {
        let { selectedApartment, deleteApartment, token } = this.props;
        deleteApartment(selectedApartment._id, token);
    }
    render() {
        let { selectedApartment, apartments } = this.props;
        let { visible } = this.state;
        return (
            <React.Fragment>
                <CalenderHeaderWrapper className="calendarHeader">
                    <div className="calendarHeader-info" span={20}>
                        <Select
                            showSearch
                            className="select-apartment"
                            placeholder="Chọn căn hộ"
                            optionFilterProp="children"
                            onChange={this.handleSelectChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                apartments.map(value => <Option key={value._id} value={value._id}>{value.name}</Option>)
                            }
                        </Select>
                        <div classnName="apartment-info">
                            <div className="apartment-info-item">
                                <span>Tên căn hộ:</span>
                                <span>{selectedApartment ? selectedApartment.name : ""}</span>
                            </div>
                            <div className="apartment-info-item">
                                <span>Code:</span>
                                <span>{selectedApartment ? selectedApartment.code : ""}</span>
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
                    <div className="calendarHeader-btns" span={4}>
                        <Tooltip placement="top" title="Chỉnh sửa thông tin căn hộ">
                            <Button className="button-group__single" icon="edit" onClick={this.showModal} />
                        </Tooltip>
                        <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
                            <Tooltip placement="top" title="Xóa căn hộ">
                                <Button className="button-group__single" icon="close" />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                    <div className="calendarHeader-status-info" >
                        <div className="calendarHeader-status-info-item">Chưa check-in</div>
                        <div className="calendarHeader-status-info-item">Chưa check-out</div>
                        <div className="calendarHeader-status-info-item">Đã check-out</div>
                    </div>
                </CalenderHeaderWrapper>
                <FullCalendar />
                {
                    visible && <Popup type="edit" apartment={selectedApartment} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                }
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        token: state.Auth.token,
        apartments: state.Calendar.apartments,
        selectedApartment: state.Calendar.selectedApartment
    }), {
        selectApartment, editApartment, deleteApartment
    }
)(Calendar);
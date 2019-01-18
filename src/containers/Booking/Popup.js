import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import "moment/locale/vi";
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllApartment, getAllUser } from '../../redux/actions/Booking';

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

const title = {
    view: "Thông tin Booking",
    add: "Thêm Booking",
    edit: "Sửa Booking",
}

const initState = {
    add: { user: "", apartment: "", dateStart: Date.now(), dateEnd: Date.now() },
    edit: { checkin: "", checkout: "", dateStart: "", dateEnd: "" },
    apartmentList: [], userList: [], timeBookedList: []
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.type === "add" ? initState : {
            edit: {
                checkin: props.selectedBooking.checkin,
                checkout: props.selectedBooking.checkout,
                dateStart: moment(props.selectedBooking.dateStart, dateFormat),
                dateEnd: moment(props.selectedBooking.dateEnd, dateFormat)
            }
        };
    }
    componentDidMount() {
        let { type } = this.props;
        if (type === "add" || type === "edit") {
            let { token, getAllApartment, getAllUser, selectedBooking } = this.props;
            getAllApartment(...type === "add" ? ["", ""] : [selectedBooking.apartment, selectedBooking.key], token,
                (err, res) => {
                    if (!err) {
                        if (type === "add") {
                            this.setState({ apartmentList: res.data })
                        } else this.setState({ timeBookedList: res.data.timeBooked })
                    }
                });
            if (type === "add") getAllUser(token, (err, res) => {
                if (!err) {
                    this.setState({ userList: res.data })
                }
            })
        }
    }
    onDateChange = (dates, dateStrings) => {
        let [dateStart, dateEnd] = dates;
        let { type } = this.props;
        this.setState((prevState, props) => ({
            [type]: { ...prevState[type], dateStart: moment(dateStart), dateEnd: moment(dateEnd) }
        }))
    }
    onChange = (name) => {
        return (value) => {
            let { type } = this.props;
            if (name === "apartment") {
                this.setState((prevState, props) => ({
                    [type]: { ...prevState[type], apartment: value, dateStart: moment(), dateEnd: moment() }
                }))
            }
            else this.setState((prevState, props) => ({
                [type]: { ...prevState[type], [name]: value }
            }))
        }
    }
    handleOk = () => {
        this.props.handleOk(this.state[this.props.type]);
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    disabledDate = (current) => {
        let { type } = this.props;
        let timeBooked = type === "add" ? [] : this.state.timeBookedList;
        if (type === "add") {
            let { apartmentList } = this.state;
            let apartment = this.state[this.props.type].apartment;
            apartmentList.forEach(value => {
                if (value._id === apartment) {
                    timeBooked = value.timeBooked;
                }
            });
        }
        return (
            current &&
            timeBooked.map(value => moment(value).format(dateFormat)).indexOf(current.format(dateFormat)) !== -1
        )
    }
    render() {
        let { type, selectedBooking } = this.props;
        let { add, edit, apartmentList, userList } = this.state;
        if (type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Người dùng" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.user}</span>
                        </Form.Item>
                        <Form.Item label="Căn hộ" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.apartment}</span>
                        </Form.Item>
                        <Form.Item label="Ngày bắt đầu" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.dateStart}</span>
                        </Form.Item>
                        <Form.Item label="Ngày kết thúc" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.dateEnd}</span>
                        </Form.Item>
                        <Form.Item label="Check in" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.checkin ? "yes" : "no"}</span>
                        </Form.Item>
                        <Form.Item label="Check out" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.checkout ? "yes" : "no"}</span>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
        if (type === "edit") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Check in" {...formItemStyle} className="form-item">
                            <Select defaultValue={edit.checkin} style={{ width: "150px" }} onChange={this.onChange("checkin")} >
                                <Option value={true}>yes</Option>
                                <Option value={false}>no</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Check out" {...formItemStyle} className="form-item" onChange={this.onChange("checkout")}>
                            <Select defaultValue={edit.checkout} style={{ width: "150px" }} >
                                <Option value={true}>yes</Option>
                                <Option value={false}>no</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Thời gian" {...formItemStyle} className="form-item">
                            <RangePicker
                                onChange={this.onDateChange}
                                defaultValue={[edit.dateStart, edit.dateEnd]}
                                value={[edit.dateStart, edit.dateEnd]}
                                format={dateFormat} placeholder={['Bắt đầu', 'Kết thúc']}
                                disabledDate={this.disabledDate}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
        return (
            <Modal
                title={title[this.props.type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form>
                    <Form.Item label="Người dùng" {...formItemStyle} className="form-item" >
                        <Select value={add.user} placeholder={"Chọn người dùng"} span={24} onChange={this.onChange("user")}>
                            {
                                userList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Căn hộ" {...formItemStyle} className="form-item">
                        <Select value={add.apartment} placeholder={"Chọn căn hộ"} span={24} onChange={this.onChange("apartment")}>
                            {
                                apartmentList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Thời gian" {...formItemStyle} className="form-item">
                        <RangePicker
                            onChange={this.onDateChange}
                            defaultValue={[moment(), moment()]}
                            value={[moment(add.dateStart), moment(add.dateEnd)]}
                            format={dateFormat} placeholder={['Bắt đầu', 'Kết thúc']}
                            disabledDate={this.disabledDate}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default connect(
    state => ({
        token: state.Auth.token,
    }), {
        getAllApartment,
        getAllUser
    }
)(Popup);
import React from 'react';
import { Modal, Form, Select, DatePicker, Switch } from 'antd';
import "moment/locale/vi";
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllApartment, getAllUser } from '../../redux/actions/Booking';
import { checkChanged, validateState } from "../../helpers/validateState";

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
    add: { user: "", apartment: "", dateStart: moment(), dateEnd: moment().add("days", 1) },
    edit: { checkin: "", checkout: "", dateStart: "", dateEnd: "" },
    apartmentList: [], userList: [], timeBookedList: [], error: ""
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
            },
            error: ""
        };
    }
    componentDidMount() {
        let { type } = this.props;
        if (type === "add" || type === "edit") {
            let { token, getAllApartment, getAllUser } = this.props;
            getAllApartment(token, (err, res) => {
                if (!err) this.setState({ apartmentList: res.data })
            })
            if (type === "add") getAllUser(token, (err, res) => {
                if (!err) this.setState({ userList: res.data })
            })
        }
    }
    onDateChange = (dates, dateStrings) => {
        let [dateStart, dateEnd] = dates;
        if (moment(dateStart).format("DD/MM/YYYY") === moment(dateEnd).format("DD/MM/YYYY")) {
            dateEnd = moment(dateStart).add("days", 1);
        }
        let { type } = this.props;
        this.setState((prevState, props) => ({
            [type]: { ...prevState[type], dateStart: moment(dateStart), dateEnd: moment(dateEnd) }
        }))
    }
    onSwitchChange = (name) => {
        return value => {
            let data = this.state.edit;
            data[name] = value;
            this.setState({ edit: data });
        }
    }
    onChange = (name) => {
        return (value) => {
            let { type } = this.props;
            if (name === "apartment") {
                this.setState((prevState, props) => ({
                    [type]: { ...prevState[type], apartment: value }, error: ""
                }))
            }
            else this.setState((prevState, props) => ({
                [type]: { ...prevState[type], [name]: value }, error: ""
            }))
        }
    }
    handleOk = () => {
        let { type } = this.props;
        if (type === "add") {
            let { dateStart, dateEnd, apartment, user } = this.state.add;
            const checkNullState = validateState(this.state.add, ["apartment", "user"]);
            if (checkNullState.error)
                return this.setState({ error: checkNullState.error });
            this.props.handleOk({ dateStart, dateEnd, apartment, user });
        } else if (type === "edit") {
            let { checkin, checkout, dateStart, dateEnd } = this.state.edit;
            let { selectedBooking } = this.props;
            const checkChangedState = checkChanged(selectedBooking, this.state.edit, ["dateStart", "dateEnd", "checkin", "checkout"]);
            if (checkChangedState.error)
                return this.setState({ error: checkChangedState.error });
            this.props.handleOk({ dateStart, dateEnd, checkin, checkout });
        }
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    // disabledDate = (current) => {
    //     let { type } = this.props;
    //     let timeBooked = type === "add" ? [] : this.state.timeBookedList;
    //     if (type === "add") {
    //         let { apartmentList } = this.state;
    //         let apartment = this.state[this.props.type].apartment;
    //         apartmentList.forEach(value => {
    //             if (value._id === apartment) {
    //                 timeBooked = value.timeBooked;
    //             }
    //         });
    //     }
    //     return (
    //         current &&
    //         timeBooked.map(value => moment(value).format(dateFormat)).indexOf(current.format(dateFormat)) !== -1
    //     )
    // }
    render() {
        let { type, selectedBooking } = this.props;
        let { add, edit, apartmentList, userList, error } = this.state;
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
                            <Switch disabled={true} defaultChecked={selectedBooking.checkin} />
                        </Form.Item>
                        <Form.Item label="Check out" {...formItemStyle} className="form-item">
                            <Switch disabled={true} defaultChecked={selectedBooking.checkout} />
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
                            <Switch checked={edit.checkin} onChange={this.onSwitchChange('checkin')} disabled={edit.checkout} />
                        </Form.Item>
                        <Form.Item label="Check out" {...formItemStyle} className="form-item" >
                            <Switch checked={edit.checkout} onChange={this.onSwitchChange('checkout')} disabled={!edit.checkin} />
                        </Form.Item>
                        <Form.Item label="Thời gian" {...formItemStyle} className="form-item">
                            <RangePicker
                                onChange={this.onDateChange}
                                defaultValue={[edit.dateStart, edit.dateEnd]}
                                value={[edit.dateStart, edit.dateEnd]}
                                format={dateFormat} placeholder={['Bắt đầu', 'Kết thúc']}
                            // disabledDate={this.disabledDate}
                            />
                        </Form.Item>
                    </Form>
                    <span className="form__error">{error}</span>
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
                            style={{ width: "100%" }}
                            defaultValue={[moment(), moment().add("days", 1)]}
                            value={[moment(add.dateStart), moment(add.dateEnd)]}
                            format={dateFormat} placeholder={['Bắt đầu', 'Kết thúc']}
                        // disabledDate={this.disabledDate}
                        />
                    </Form.Item>
                </Form>
                <span className="form__error">{error}</span>
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
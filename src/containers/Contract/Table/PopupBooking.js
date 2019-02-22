import React from 'react';
import { Modal, Form, Select, DatePicker, Switch } from 'antd';
import "moment/locale/vi";
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllApartment, deleteBooking, getApartment } from '../../../redux/actions/Contract';
import { checkChanged, validateState } from "../../../helpers/validateState";
import DeleteButon from '../../Calendar/deleteButton';

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
    add: { apartment: "", dateStart: moment(), dateEnd: moment().add("days", 1) },
    edit: { checkin: "", checkout: "", dateStart: "", dateEnd: "" },
    apartmentList: [], timeBookedList: [], error: ""
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.type === "add" ? initState : {
            edit: {
                checkin: props.dataSource.booking.checkin,
                checkout: props.dataSource.booking.checkout,
                dateStart: moment(props.dataSource.booking.dateStart),
                dateEnd: moment(props.dataSource.booking.dateEnd)
            },
            error: "", timeBookedList: []
        };
    }
    componentDidMount() {
        let { type } = this.props;
        if (type === "edit") {
            let { token, getApartment } = this.props;
            let { _id: booking_id, apartment: { _id: apartment_id } } = this.props.dataSource.booking;
            getApartment(apartment_id, booking_id, token, (err, res) => {
                if (!err) this.setState({ timeBookedList: res.data.timeBooked })
            })
        }
        if (type === "add") {
            let { token, getAllApartment } = this.props;
            getAllApartment(token, (err, res) => {
                if (!err) this.setState({ apartmentList: res.data })
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
                let timeBookedList = [];
                this.state.apartmentList.forEach(element => {
                    if (element._id === value) timeBookedList = element.timeBooked;
                })
                this.setState((prevState, props) => ({
                    [type]: { ...prevState[type], apartment: value }, error: "", timeBookedList
                }))
            }
            else this.setState((prevState, props) => ({
                [type]: { ...prevState[type], [name]: value }, error: ""
            }))
        }
    }
    handleOk = () => {
        let { type, dataSource } = this.props;
        if (type === "add") {
            let { dateStart, dateEnd, apartment } = this.state.add;
            let { _id: contract, mainUser: { _id: user } } = dataSource;
            const checkNullState = validateState(this.state.add, ["apartment"]);
            if (checkNullState.error)
                return this.setState({ error: checkNullState.error });
            this.props.handleOk({ dateStart, dateEnd, apartment, contract, user });
        } else if (type === "edit") {
            let { checkin, checkout, dateStart, dateEnd } = this.state.edit;
            const checkChangedState = checkChanged(dataSource.booking, this.state.edit, ["dateStart", "dateEnd", "checkin", "checkout"]);
            if (checkChangedState.error)
                return this.setState({ error: checkChangedState.error });
            this.props.handleOk({ dateStart, dateEnd, checkin, checkout, apartment: dataSource.booking.apartment });
        }
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    disabledDate = (current) => {
        let { type } = this.props;
        let timeBooked = [];
        if (type === "add") {
            let { add: { apartment }, apartmentList } = this.state;
            if (apartment !== "") {
                apartmentList.forEach(value => {
                    if (value._id === apartment) {
                        timeBooked = value.timeBooked;
                    }
                });
            }
        } else if (type === "edit") {
            timeBooked = this.state.timeBookedList;
        }
        return (
            current &&
            timeBooked.map(value => moment(value).format(dateFormat)).indexOf(current.format(dateFormat)) !== -1
        )
    }
    handleDelete = () => {
        let { token, deleteBooking, dataSource, handleCancel } = this.props;
        deleteBooking(dataSource.booking._id, token, (err, res) => {
            if (!err) handleCancel();
        })
    }
    render() {
        let { type } = this.props;
        let { add, edit, apartmentList, error } = this.state;
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
                                disabledDate={this.disabledDate}
                                style={{ width: "calc(100% - 35px)" }}
                            />
                            <DeleteButon handleDelete={this.handleDelete} />
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
                    <Form.Item label="Căn hộ" {...formItemStyle} className="form-item" required={true}>
                        <Select value={add.apartment} placeholder={"Chọn căn hộ"} span={24} onChange={this.onChange("apartment")}>
                            {
                                apartmentList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Thời gian" {...formItemStyle} className="form-item" required={true}>
                        <RangePicker
                            onChange={this.onDateChange}
                            style={{ width: "100%" }}
                            defaultValue={[moment(), moment().add("days", 1)]}
                            value={[moment(add.dateStart), moment(add.dateEnd)]}
                            format={dateFormat} placeholder={['Bắt đầu', 'Kết thúc']}
                            disabledDate={this.disabledDate}
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
        deleteBooking,
        getApartment
    }
)(Popup);
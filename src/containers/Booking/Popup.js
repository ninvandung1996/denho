import React from 'react';
import { Modal, Form, Select, DatePicker, Switch, Button } from 'antd';
import "moment/locale/vi";
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllApartment, getAllUser, getAllContract, getApartment } from '../../redux/actions/Booking';
import { checkChanged, validateState } from "../../helpers/validateState";
import GuestPopup from "./GuestPopup";

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
    add: { user: "", apartment: "", contract: "", dateStart: moment(), dateEnd: moment().add("days", 1) },
    edit: { checkin: "", checkout: "", dateStart: "", dateEnd: "" },
    apartmentList: [], userList: [], timeBookedList: [], error: "", contractList: []
}

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.type === "add" ? initState : {
            edit: {
                checkin: props.selectedBooking.checkin,
                checkout: props.selectedBooking.checkout,
                dateStart: moment(props.selectedBooking.dateStart),
                dateEnd: moment(props.selectedBooking.dateEnd)
            },
            error: "", timeBookedList: [],
            visible: false
        };
    }
    componentDidMount() {
        let { type } = this.props;
        if (type === "edit") {
            let { token, getApartment, selectedBooking } = this.props;
            getApartment(selectedBooking.apartment._id, selectedBooking._id, token, (err, res) => {
                if (!err) this.setState({ timeBookedList: res.data.timeBooked })
            })
        } else if (type === "add") {
            let { token, getAllApartment, getAllUser, getAllContract } = this.props;
            getAllApartment(token, (err, res) => {
                if (!err) this.setState({ apartmentList: res.data })
            })
            getAllUser(token, (err, res) => {
                if (!err) this.setState({ userList: res.data })
            })
            getAllContract(token, (err, res) => {
                if (!err) this.setState({ contractList: res.data })
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
    onAddChange = (name) => {
        if (name === "contract") return (_id) => {
            if (!_id) return this.setState((prevState) => {
                return { add: { ...prevState.add, contract: "" } }
            })
            let contract = this.state.contractList.find(value => value._id === _id);
            this.setState((prevState) => {
                return { add: { ...prevState.add, user: contract.mainUser._id, contract: _id } }
            })
        }
        return (value) => {
            this.setState((prevState) => {
                return { add: { ...prevState.add, user: value ? value : "", contract: "" } }
            })
        }
    }
    handleOk = () => {
        let { type } = this.props;
        if (type === "add") {
            let { dateStart, dateEnd, apartment, user, contract } = this.state.add;
            const checkNullState = validateState(this.state.add, ["apartment", "user", "contract"]);
            if (checkNullState.error)
                return this.setState({ error: checkNullState.error });
            this.props.handleOk({ dateStart, dateEnd, apartment, user, contract });
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
    toggleModal = () => {
        this.setState(({ visible }) => {
          return { visible: !visible };
        });
      };
    render() {
        let { type, selectedBooking } = this.props;
        let { add, edit, error } = this.state;
        if (type === "view") {
            return (
                <React.Fragment>
                <Modal
                    title={title[this.props.type]}
                    visible={!this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Người dùng" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.user.email}</span>
                        </Form.Item>
                        <Form.Item label="Hợp đồng" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.user.email}</span>
                        </Form.Item>
                        <Form.Item label="Căn hộ" {...formItemStyle} className="form-item">
                            <span>{selectedBooking.apartment.name}</span>
                        </Form.Item>
                        <Form.Item label="Ngày bắt đầu" {...formItemStyle} className="form-item">
                            <span>{moment(selectedBooking.dateStart).format(dateFormat)}</span>
                        </Form.Item>
                        <Form.Item label="Ngày kết thúc" {...formItemStyle} className="form-item">
                            <span>{moment(selectedBooking.dateEnd).format(dateFormat)}</span>
                        </Form.Item>
                        <Form.Item label="Check in" {...formItemStyle} className="form-item">
                            <Switch disabled={true} defaultChecked={selectedBooking.checkin} />
                        </Form.Item>
                        <Form.Item label="Check out" {...formItemStyle} className="form-item">
                            <Switch disabled={true} defaultChecked={selectedBooking.checkout} />
                        </Form.Item>
                        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                            <Button type="primary" onClick={this.toggleModal}>Xem danh sách đăng ký khách</Button>
                        </div>
                    </Form>
                </Modal>
                {
                    this.state.visible && <GuestPopup data={selectedBooking.guests} toggle={this.toggleModal} />
                }
                </React.Fragment>
            )
        }
        if (type === "edit") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Sửa"
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
                            />
                        </Form.Item>
                    </Form>
                    <span className="form__error">{error}</span>
                </Modal>
            )
        }

        let { apartmentList, userList, contractList } = this.state;
        let { contract, user } = this.state.add;
        if (contract !== "") userList = userList.filter(value => value._id === user);
        if (user !== "") contractList = contractList.filter(value => value.mainUser._id === user);
        return (
            <Modal
                title={title[this.props.type]}
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="Thêm"
            >
                <Form>
                    <Form.Item label="Hợp đồng" {...formItemStyle} className="form-item" required={true}>
                        <Select value={add.contract} placeholder={"Chọn hợp đồng"} span={24} onChange={this.onAddChange("contract")}
                            showSearch
                            allowClear={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                contractList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.code}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Người dùng" {...formItemStyle} className="form-item" required={true}>
                        <Select value={add.user} placeholder={"Chọn người dùng"} span={24} onChange={this.onAddChange("user")}
                            showSearch
                            allowClear={true}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                userList.map(value => (
                                    <Option key={value._id} value={value._id}>{value.email}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Căn hộ" {...formItemStyle} className="form-item" required={true}>
                        <Select value={add.apartment} placeholder={"Chọn căn hộ"} span={24} onChange={this.onChange("apartment")}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
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
        token: state.Auth.token
    }), {
        getAllApartment,
        getAllUser,
        getAllContract,
        getApartment
    }
)(Popup);
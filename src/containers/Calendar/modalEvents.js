import React, { Component } from 'react';
import moment from 'moment';
import { DateRangepicker } from '../../components/uielements/datePicker';
import Modal from '../../components/feedback/modal';
import { CalendarModalBody } from './calendar.style';
import DeleteButton from './deleteButton';
import { getUser, getContract, getApartmentById } from '../../redux/actions/Calendar';
import { connect } from 'react-redux';
import { Select, Switch, Form } from 'antd';
import { checkChanged, validateState } from "../../helpers/validateState";

const Option = Select.Option;

const RangePicker = DateRangepicker;

const formItemStyle = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
}

const localeDatePicker = {
  lang: {
    placeholder: 'Chọn ngày',
    rangePlaceholder: ['Bắt đầu', 'Kết thúc'],
    today: 'Hôm nay',
    now: 'Now',
    backToToday: 'Quay lại Hôm nay',
    ok: 'Ok',
    clear: 'Clear',
    month: 'Tháng',
    year: 'Năm',
    timeSelect: 'Chọn thời gian',
    dateSelect: 'Chọn ngày',
    monthSelect: 'Chọn tháng',
    yearSelect: 'Chọn năm',
    decadeSelect: 'Chọn thập kỷ',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Tháng trước (PageUp)',
    nextMonth: 'Tháng tới (PageDown)',
    previousYear: 'Năm trước (Control + left)',
    nextYear: 'Năm tới (Control + right)',
    previousDecade: 'Thập kỷ trước',
    nextDecade: 'Thập kỷ tới',
    previousCentury: 'Last century',
    nextCentury: 'Next century'
  },
  timePickerLocale: {
    placeholder: 'Chọn thời gian'
  }
};

class ModalEvents extends Component {
  constructor(props) {
    super(props);
    let { start, end } = props.selectedData;
    if (moment(start).format("DD/MM/YYYY") === moment(end).format("DD/MM/YYYY")) {
      end = moment(end).add("days", 1);
    }
    this.state = {
      listUser: [], listContract: [], selectedData: { user: "", contract: "", ...props.selectedData, start, end }, error: "",
      timeBookedList: []
    };
  }
  componentDidMount() {
    let { token, modalVisible, getApartmentById, selectedApartment } = this.props;
    getApartmentById(selectedApartment._id, modalVisible === "new" ? "" : this.state.selectedData._id, token, (err, res) => {
      if (!err) this.setState({ timeBookedList: res.data.timeBooked });
    })
    if (modalVisible === "new") {
      let { getUser, getContract } = this.props;
      getUser(token, (err, res) => {
        if (!err) this.setState({ listUser: res.data })
      })
      getContract(token, (err, res) => {
        if (!err) this.setState({ listContract: res.data })
      })
    }
  }
  handleOk = () => {
    let { modalVisible, selectedData } = this.props;
    let { user, contract, start, end } = this.state.selectedData;
    if (modalVisible === "new") {
      let checkNullState = validateState(this.state.selectedData, ['user', "contract"]);
      if (checkNullState.error)
        return this.setState({ error: checkNullState.error });
      this.props.setModalData('ok', { user, start, end, contract });
    }
    else {
      const checkChangedState = checkChanged(selectedData, this.state.selectedData, ["checkin", "checkout", "dateStart", "dateEnd"]);
      if (checkChangedState.error)
        return this.setState({ error: checkChangedState.error });
      this.props.setModalData('ok', this.state.selectedData);
    }
  };
  handleCancel = () => {
    this.props.setModalData('cancel');
  };

  handleDelete = () => {
    this.props.setModalData('delete', this.props.selectedData);
  };
  onChange = (name) => {
    if (name === "user")
      return (value) => {
        let { selectedData } = this.state;
        selectedData.user = value ? value : "";
        selectedData.contract = "";
        this.setState({ selectedData, error: "" });
      }
    else return (_id) => {
      let { selectedData } = this.state;
      if (!_id) {
        selectedData.contract = "";
        this.setState({ selectedData, error: "" });
      } else {
        let contract = this.state.listContract.find(value => value._id === _id);
        selectedData.contract = contract._id;
        selectedData.user = contract.mainUser._id;
        this.setState({ selectedData, error: "" });
      }
    }
  }
  onSwitchChange = (name) => {
    return value => {
      let { selectedData } = this.state;
      selectedData[name] = value;
      this.setState({ selectedData });
    }
  }
  onChangeFromTimePicker = value => {
    let { selectedData } = this.state;
    if (value[0].format("DD/MM/YYYY") === value[1].format("DD/MM/YYYY")) {
      value[1].add("days", 1);
    }
    try {
      selectedData.start = value[0].hours(12).toDate();
      selectedData.end = value[1].hours(10).toDate();
    } catch (e) { }
    this.setState({ selectedData })
  };

  disabledDate = (current) => {
    let timeBooked = this.state.timeBookedList;
    return (
      current &&
      timeBooked.map(value => moment(value).format("DD/MM/YYYY")).indexOf(current.format("DD/MM/YYYY")) !== -1
    )
  }
  render() {
    const { modalVisible } = this.props;
    const { selectedData } = this.state;
    const visible = modalVisible ? true : false;
    if (!visible) {
      return <div />;
    }
    const start = selectedData && selectedData.start ? moment(selectedData.start) : '';
    const end = selectedData && selectedData.end ? moment(selectedData.end) : '';

    let { listUser, listContract } = this.state;
    if (this.props.modalVisible === "new") {
      let { contract, user } = this.state.selectedData;
      if (contract !== "") listUser = listUser.filter(value => value._id === user);
      if (user !== "") listContract = listContract.filter(value => value.mainUser._id === user);
    }
    return (
      <div>
        <Modal
          title={modalVisible === 'update' ? 'Cập nhật Booking' : 'Tạo Booking'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Ok"
          cancelText="Hủy"
        >
          <CalendarModalBody>
            <div className="isoCalendarInputWrapper">
              {
                modalVisible === "update" ? (
                  <React.Fragment>
                    <Form.Item label="Người dùng" {...formItemStyle} className="form-item">
                      <span>{selectedData.title}</span>
                    </Form.Item>
                    <Form.Item label="Check in" {...formItemStyle} className="form-item">
                      <Switch checked={selectedData.checkin} onChange={this.onSwitchChange('checkin')} disabled={selectedData.checkout} />
                    </Form.Item>
                    <Form.Item label="Checkout" {...formItemStyle} className="form-item">
                      <Switch checked={selectedData.checkout} onChange={this.onSwitchChange('checkout')} disabled={!selectedData.checkin} />
                    </Form.Item>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <Form.Item label="Hợp đồng" {...formItemStyle} className="form-item" required={true}>
                        <Select value={this.state.selectedData.contract} style={{ width: "100%" }} onChange={this.onChange("contract")}
                          showSearch
                          allowClear={true}
                          optionFilterProp="children"
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                          {
                            listContract.map(value => (
                              <Option key={value._id} value={value._id}>{value.code}</Option>
                            ))
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item label="Người dùng" {...formItemStyle} className="form-item" required={true}>
                        <Select value={this.state.selectedData.user} style={{ width: "100%" }} onChange={this.onChange("user")}
                          showSearch
                          allowClear={true}
                          optionFilterProp="children"
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                          {
                            listUser.map(value => (
                              <Option key={value._id} value={value._id}>{value.email}</Option>
                            ))
                          }
                        </Select>
                      </Form.Item>
                    </React.Fragment>
                  )
              }
            </div>
            <div className="isoCalendarDatePicker">
              <RangePicker
                locale={localeDatePicker}
                value={[start, end]}
                format="YYYY/MM/DD"
                onChange={this.onChangeFromTimePicker}
                style={{ width: `${modalVisible !== "update" ? "100%" : "calc(100%-35px)"}` }}
                disabledDate={this.disabledDate}
              />
              {modalVisible === "update" && <DeleteButton handleDelete={this.handleDelete} />}
            </div>
          </CalendarModalBody>
          <div className="form__error">{this.state.error}</div>
        </Modal>
      </div>
    );
  }
}


export default connect(
  state => ({
    token: state.Auth.token,
    selectedApartment: state.Calendar.selectedApartment
  }), {
    getUser, getContract, getApartmentById
  }
)(ModalEvents);
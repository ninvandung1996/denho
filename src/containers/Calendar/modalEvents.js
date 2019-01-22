import React, { Component } from 'react';
import moment from 'moment';
import { DateRangepicker } from '../../components/uielements/datePicker';
import Modal from '../../components/feedback/modal';
import { CalendarModalBody } from './calendar.style';
import DeleteButton from './deleteButton';
import { getUser } from '../../redux/actions/Calendar';
import { connect } from 'react-redux';
import { Select, Switch, Form } from 'antd';

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
    this.state = { listUser: [], selectedData: { ...props.selectedData, start, end } };
  }
  componentDidMount() {
    let { getUser, token } = this.props;
    getUser(token, (err, res) => {
      if (!err) this.setState({ listUser: res.data })
    })
  }
  handleOk = () => {
    this.props.setModalData('ok', this.state.selectedData);
  };
  handleCancel = () => {
    this.props.setModalData('cancel');
  };

  handleDelete = () => {
    this.props.setModalData('delete', this.props.selectedData);
  };
  onChange = (value) => {
    let { selectedData } = this.state;
    selectedData.user = value;
    this.setState({ selectedData });
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
  render() {
    const { modalVisible } = this.props;
    const { selectedData } = this.state;
    const visible = modalVisible ? true : false;
    if (!visible) {
      return <div />;
    }
    const user = selectedData.user;
    const start = selectedData && selectedData.start ? moment(selectedData.start) : '';
    const end = selectedData && selectedData.end ? moment(selectedData.end) : '';
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
                      <Switch checked={selectedData.checkin} onChange={this.onSwitchChange('checkin')} />
                    </Form.Item>
                    <Form.Item label="Checkout" {...formItemStyle} className="form-item">
                      <Switch checked={selectedData.checkout} onChange={this.onSwitchChange('checkout')} />
                    </Form.Item>
                  </React.Fragment>
                ) : (
                    <Select value={user} placeholder={"Chọn người dùng"} style={{ width: "100%" }} onChange={this.onChange}>
                      {
                        this.state.listUser.map(value => (
                          <Option key={value._id} value={value._id}>{value.name}</Option>
                        ))
                      }
                    </Select>
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
              />
              {modalVisible === "update" && <DeleteButton handleDelete={this.handleDelete} />}
            </div>
          </CalendarModalBody>
        </Modal>
      </div>
    );
  }
}


export default connect(
  state => ({
    token: state.Auth.token
  }), {
    getUser
  }
)(ModalEvents);
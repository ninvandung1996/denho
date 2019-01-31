import React from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';
import { checkChanged, validateState } from "../../helpers/validateState";
import { getAllContract, getAllService } from '../../redux/actions/Ticket';
import { connect } from 'react-redux';
import moment from 'moment';

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}

const Option = Select.Option;

const title = {
    view: "Thông tin ticket",
    add: "Thêm ticket",
    edit: "Sửa thông tin ticket",
}

const initState = {
    contract: "", services: [], date: moment(), error: "", contractList: [], serviceList: []
}

const timeFormat = "DD/MM/YYYY MM:HH";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.type === "add" ? initState : {
            ...props.dataSource,
            services: props.dataSource.services.map(value => value._id),
            date: moment(props.dataSource.date),
            error: "", serviceList: []
        }
    }
    componentDidMount() {
        if (this.props.type === "add" || this.props.type === "edit") {
            let { token, getAllContract, getAllService } = this.props;
            getAllContract(token, (err, res) => {
                if (!err) this.setState({ contractList: res.data });
            })
            if (this.props.type === "edit") {
                getAllService(this.props.dataSource.booking._id, token, (err, res) => {
                    if (!err) this.setState({ serviceList: res.data });
                })
            }
        }
    }
    serviceChange = (value) => {
        this.setState({ services: value, error: "" })
    }
    contractChange = (value) => {
        let { token, getAllService } = this.props;
        let { contractList } = this.state;
        let contract = contractList.find(element => element._id === value);
        getAllService(contract.booking._id, token, (err, res) => {
            if (!err) this.setState({ serviceList: res.data, contract: value })
        })
    }
    timeChange = (date) => {
        this.setState({ date, error: "" })
    }
    handleOk = () => {
        let { contract, date, services, contractList } = this.state;
        let { type, dataSource } = this.props;
        const checkNullState = validateState(this.state, type === "add" ? ["contract", "services"] : ["services"]);
        const checkChangedState = type === "edit" ? checkChanged({
            date: dataSource.date, services: dataSource.services.map(value => value._id)
        }, this.state, ["services", "date"]) : { error: false };
        if (checkChangedState.error)
            return this.setState({ error: checkChangedState.error });
        if (checkNullState.error)
            return this.setState({ error: checkNullState.error });
        if (type === "add") {
            let booking = contractList.find(element => element._id === contract).booking._id;
            return this.props.handleOk({ booking, services, date });
        }
        this.props.handleOk({ booking: dataSource.booking._id, services, date });
    }
    handleCancel = () => {
        this.props.handleCancel();
    }
    render() {
        let { contract, services, date, contractList, serviceList, error } = this.state;
        if (this.props.type === "view") {
            return (
                <Modal
                    title={title[this.props.type]}
                    visible={true}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="Booking" {...formItemStyle} className="form-item">
                            <span>{this.props.dataSource.booking.user.email}</span>
                        </Form.Item>
                        <Form.Item label="Thời gian" {...formItemStyle} className="form-item">
                            <span>{moment(this.props.dataSource.date).format(timeFormat)}</span>
                        </Form.Item>
                        <Form.Item label="Dịch vụ" {...formItemStyle} className="form-item">
                            <div className="project-list">
                                {this.props.dataSource.services.map(value => (
                                    <div key={value._id} className="project-list-item">{value.name}</div>
                                ))}
                            </div>
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
                    {
                        this.props.type === "add" && (
                            <Form.Item label="Hợp đồng" {...formItemStyle} className="form-item" required={true}>
                                <Select
                                    showSearch
                                    className="select-apartment"
                                    value={contract}
                                    placeholder="Chọn booking"
                                    optionFilterProp="children"
                                    onChange={this.contractChange}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        contractList.map(value => <Option key={value._id} value={value._id}>{value._id}</Option>)
                                    }
                                </Select>
                            </Form.Item>
                        )
                    }
                    <Form.Item label="Thời gian" {...formItemStyle} className="form-item" required={true}>
                        <DatePicker
                            showTime
                            value={moment(date)}
                            format={timeFormat} placeholder="Chọn thời gian" onChange={this.timeChange} onOk={this.timeChange}
                        />
                    </Form.Item>
                    <Form.Item label="Dịch vụ" {...formItemStyle} className="form-item" required={true}>
                        <Select mode="multiple" value={services} placeholder={"Chọn dự án"} style={{ width: "100%" }}
                            onChange={this.serviceChange} disabled={contract === ""}
                        >
                            {
                                serviceList.map(value => (
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
    }), { getAllContract, getAllService }
)(Popup)
import React from 'react';
import { Card, Icon, Button, Tooltip, Popconfirm } from 'antd';
import Popup from './Popup';
import { getApartment, editApartment, deleteApartment } from '../../../redux/actions/Project';
import { connect } from 'react-redux';

const { Meta } = Card;

class Apartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { type: "", apartment: this.props.data }
    }
    showModal = (type) => {
        return () => {
            this.setState({ type })
        }
    }
    handleOk = (data) => {
        let { token } = this.props;
        let { type, apartment } = this.state;
        if (type === "edit") {
            this.props.editApartment(apartment._id, data, token, (err, res) => {
                if (!err) this.setState({ type: "", apartment: res.data });
            })
            return;
        }
        this.props.deleteApartment(apartment._id, token, (err, res) => {
            if (!err) this.setState({ type: "" });
        })
    }
    onConfirmDelete = () => {
        let { token, data, deleteApartment } = this.props;
        deleteApartment(data._id, token, (err, res) => {
            if (!err) this.setState({ type: "" });
        })
    }
    handleCancel = () => {
        this.setState({ type: "" })
    }
    render() {
        let { type, apartment } = this.state;
        return (
            <React.Fragment>
                <Card
                    className="single-aparment"
                    // cover={<img className="single-aparment-img" alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    cover={<span className="single-aparment-img"></span>}
                    actions={[
                        <div className="button-group">
                            <Tooltip placement="top" title="Chỉnh sửa căn hộ">
                                <Button className="button-group__single single-apartment-btn" icon="edit" onClick={this.showModal("edit")} />
                            </Tooltip>
                            <Popconfirm placement="top" title="Bạn có chắc chắn muốn xóa?" onConfirm={this.onConfirmDelete} okText="Có" cancelText="Không">
                                <Tooltip placement="top" title="Xóa căn hộ">
                                    <Button className="button-group__single single-apartment-btn" icon="close" />
                                </Tooltip>
                            </Popconfirm>
                        </div>
                    ]}
                >
                    <Meta className="single-apartment-content"
                        title="Căn hộ"
                        description={apartment.name}
                    />
                </Card>
                {
                    type !== "" && <Popup type={type} apartment={apartment} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                }
            </React.Fragment>
        )
    }
}

export default connect(
    state => ({
        token: state.Auth.token
    }), {
        getApartment,
        editApartment,
        deleteApartment
    }
)(Apartment); 
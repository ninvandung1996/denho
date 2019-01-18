import React from "react";
import { Input, Button } from "antd";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableBooking from "./TableBooking";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';
import { addBooking } from '../../redux/actions/Booking';
import Popup from './Popup';

const Search = Input.Search;

function filterNotif(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.user).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", visible: false };
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
        let { token, addBooking } = this.props;
        addBooking(data, token, (err, res) => {
            if (!err) this.setState({ visible: false })
        })
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <div className="notify">
                        <div className="notify__new">
                            <div>
                                <Search
                                    placeholder="Tìm theo người dùng"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                            <div>
                                <Button icon="plus" className="notify__button" onClick={this.showModal}>
                                    Tạo Booking mới
                                </Button>
                            </div>
                        </div>
                        <TableBooking
                            bookingList={filterNotif(
                                this.props.bookingList,
                                this.state.search
                            )}
                        />
                    </div>
                    {
                        this.state.visible && <Popup type="add" handleOk={this.handleOk} handleCancel={this.handleCancel} />
                    }
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

export default connect(
    state => ({
        token: state.Auth.token,
        bookingList: state.Booking.bookingList
    }), {
        addBooking
    }
)(Booking);
import React, { Component } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import Table from "./Table";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';
import { addTicket } from "../../redux/actions/Ticket";
import Popup from './Popup';

const Search = Input.Search;

function filter(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.booking.user.email).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Ticket extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", visible: false };
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
        let { token, addTicket } = this.props;
        addTicket(data, token, (err, res) => {
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
                                    placeholder="Tìm theo email người dùng"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                            <div>
                                <Button icon="plus" className="notify__button" onClick={this.showModal}>
                                    Tạo ticket mới
                                </Button>
                            </div>
                        </div>
                        <Table
                            data={filter(
                                this.props.ticketList,
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
        ticketList: state.Ticket.ticketList
    }), {
        addTicket
    }
)(Ticket);
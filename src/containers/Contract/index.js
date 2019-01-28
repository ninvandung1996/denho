import React, { Component } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import Table from "./Table";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';
import { addContract } from "../../redux/actions/Contract";
import Popup from './Popup';

const Search = Input.Search;

function filter(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.user.email).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Contract extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", visible: false };
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
        let { token, addContract } = this.props;
        addContract(data, token, (err, res) => {
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
                                    placeholder="Tìm theo email"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                            <div>
                                <Button icon="plus" className="notify__button" onClick={this.showModal}>
                                    Tạo hợp đồng mới
                                </Button>
                            </div>
                        </div>
                        <Table
                            data={filter(
                                this.props.contractList,
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
        contractList: state.Contract.contractList
    }), {
        addContract
    }
)(Contract);
import React, { Component } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableSupplier from "./TableSupplier";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';
import { addSupplier } from '../../redux/actions/Supplier';
import Popup from './Popup';

const Search = Input.Search;

function filterNotif(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.name).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", visible: false };
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
        let { token, addSupplier } = this.props;
        addSupplier(data, token, (err, res) => {
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
                                    placeholder="Tìm theo tên"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                            <div>
                                <Button icon="plus" className="notify__button" onClick={this.showModal}>
                                    Tạo nhà cung cấp mới
                                </Button>
                            </div>
                        </div>
                        <TableSupplier
                            supplierList={filterNotif(
                                this.props.supplierList,
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
        supplierList: state.Supplier.supplierList
    }), {
        addSupplier
    }
)(Supplier);
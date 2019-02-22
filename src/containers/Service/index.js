import React from "react";
import { Input, Button } from "antd";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableService from "./TableService";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';
import { addService } from '../../redux/actions/Service';
import Popup from './Popup';

const Search = Input.Search;

function filter(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.name).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", visible: false };
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
        let { token, addService } = this.props;
        addService(data, token, (err, res) => {
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
                                    placeholder="Tìm theo tên dự án"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                            <div>
                                <Button icon="plus" className="notify__button" onClick={this.showModal}>
                                    Tạo dịch vụ mới
                                </Button>
                            </div>
                        </div>
                        <TableService
                            serviceList={filter(
                                this.props.serviceList,
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
        serviceList: state.Service.serviceList
    }), {
        addService
    }
)(Service);
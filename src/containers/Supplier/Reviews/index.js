import React from "react";
import { Input } from "antd";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import TableData from "./TableData";
import "./index.scss";
import { convertToSearchName } from "../../../helpers/utils";
import { connect } from 'react-redux';

const Search = Input.Search;

function filter(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.supplier).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "", visible: false };
    }
    showModal = () => {
        this.setState({ visible: true })
    }
    handleOk = (data) => {
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        let reviewList = []
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <div className="notify">
                        <div className="notify__new">
                            <div>
                                <Search
                                    placeholder="Tìm theo têm nhà cung cấp"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                        </div>
                        <TableData
                            reviewList={filter(
                                reviewList,
                                this.state.search
                            )}
                        />
                    </div>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

export default connect(
    state => ({
        token: state.Auth.token,
    }), {
    }
)(Review);
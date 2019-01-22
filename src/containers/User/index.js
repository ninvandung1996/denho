import React, { Component } from "react";
import { Input, Button } from "antd";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableUser from "./TableUser";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';

const Search = Input.Search;

function filter(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.email).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { search: "" };
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
                        </div>
                        <TableUser
                            userList={filter(
                                this.props.userList,
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
        userList: state.User.userList
    }), {
    }
)(User);
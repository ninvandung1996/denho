import React from "react";
import { Input, Button, Modal, Form } from "antd";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableUser from "./TableUser";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';
import { createUser } from '../../redux/actions/User';

const Search = Input.Search;

const formItemStyle = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
}


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
        this.state = { search: "", visible: false, email: "", error: "" };
    }
    toggleModal = () => {
        this.setState((prevState) => {
            return { visible: !prevState.visible }
        })
    }
    handleOk = () => {
        let { email } = this.state;
        if (email === "") return this.setState({ error: "*Bạn cần nhập đầy đủ thông tin" })
        let { token, createUser } = this.props;
        createUser({ email }, token, (err, res) => {
            if (!err) this.setState({ visible: false })
        })
    }
    onChange = e => {
        this.setState({ email: e.target.value, error: "" })
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
                                <Button icon="plus" className="notify__button" onClick={this.toggleModal}>
                                    Tạo tài khoản
                                </Button>
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
                {
                    this.state.visible && (
                        <Modal
                            title={"Thêm tài khoản"}
                            visible={true}
                            onOk={this.handleOk}
                            onCancel={this.toggleModal}
                            okText="Lưu"
                        >
                            <Form>
                                <Form.Item label="Email" {...formItemStyle} className="form-item" required={true}>
                                    <Input type="email" value={this.state.email} onChange={this.onChange} />
                                </Form.Item>
                            </Form>
                            <span className="form__error">{this.state.error}</span>
                        </Modal>
                    )
                }
            </LayoutContentWrapper>
        );
    }
}

export default connect(
    state => ({
        userList: state.User.userList,
        token: state.Auth.token
    }), {
        createUser
    }
)(User);
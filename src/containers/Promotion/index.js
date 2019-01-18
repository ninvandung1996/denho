import React, { Component } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TablePromotion from "./TablePromotion";
import "./index.scss";
import { convertToSearchName } from "../../helpers/utils";
import { connect } from 'react-redux';

const Search = Input.Search;

function filterNotif(notes, search) {
    if (search) {
        return notes.filter(note =>
            convertToSearchName(note.title).includes(convertToSearchName(search))
        );
    }
    return notes;
}

class Promotion extends Component {
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
                                    placeholder="Tìm theo tiêu đề"
                                    onSearch={search => this.setState({ search })}
                                    enterButton
                                    className="notify__search"
                                />
                            </div>
                            <div>
                                <Link to="/dashboard/promotion/create">
                                    <Button icon="plus" className="notify__button">
                                        Tạo quảng cáo mới
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <TablePromotion
                            promotionList={filterNotif(
                                this.props.promotionList,
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
        promotionList: state.Promotion.promotionList
    }), {
    }
)(Promotion);

import React from "react";
import { Input } from "antd";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableFeedBack from "./TableFeedBack";
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

class FeedBack extends React.Component {
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
                        </div>
                        <TableFeedBack
                            feedbackList={filterNotif(
                                this.props.feedbackList,
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
        feedbackList: state.FeedBack.feedbackList
    }), {

    }
)(FeedBack);
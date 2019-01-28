import React, { Component } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import LayoutContentWrapper from "../../components/utility/layoutWrapper";
import LayoutContent from "../../components/utility/layoutContent";
import TableListNotify from "./TableListNotify";
import "./index.scss";
import { connect } from "react-redux";
import { convertToSearchName } from "../../helpers/utils";

const Search = Input.Search;

function filterNotif(notes, search) {
  if (search) {
    return notes.filter(note =>
      convertToSearchName(note.title).includes(convertToSearchName(search))
    );
  }
  return notes;
}

class Notification extends Component {
  state = { search: "" };
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
                <Link to="/dashboard/createnotification">
                  <Button icon="plus" className="notify__button">
                    Tạo thông báo mới
                  </Button>
                </Link>
              </div>
            </div>
            <TableListNotify
              listNotification={filterNotif(
                this.props.listNotification,
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
    listNotification: state.Notifications.listNotification
  }),
  {}
)(Notification);

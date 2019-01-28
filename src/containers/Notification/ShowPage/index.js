import React, { Component } from "react";
import { connect } from "react-redux";
import { actGetSingleNotification } from "../../../redux/actions/notification";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import moment from "moment";
import "./index.scss";

const initialState = {
  title: "",
  content: "",
  pushTime: ""
};

class ShowPage extends Component {
  state = initialState;

  async componentDidMount() {
    const id = this.props.match.params.idNotification;
    const { token, actGetSingleNotification } = this.props;

    await actGetSingleNotification(token, id, (err, res) => {
      this.setState({
        title: res.data.title,
        content: res.data.content,
        pushTime: res.data.pushTime
      });
    });
  }

  render() {
    const { title, content, pushTime } = this.state;
    const time = new Date(pushTime);

    return (
      <LayoutContentWrapper>
        <LayoutContent className="notify-layout">
          <div className="notify">
            <div className="notify__title">Nội dung thông báo</div>
            <div className="notify__item">
              <div className="notify__item--left">Tiêu đề</div>
              <div className="notify__item--right notify__item--title">
                {title}
              </div>
            </div>
            <div className="notify__item">
              <div className="notify__item--left">Nội dung</div>
              <div
                className="notify__item--right"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            <div className="notify__item">
              <div className="notify__item--left">Thời gian gửi</div>
              <div className="notify__item--right notify__item--title">
                {`${moment(time).format("DD/MM-YYYY hh:mm")} `}
              </div>
            </div>
          </div>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    token: state.Auth.token
  }),
  { actGetSingleNotification }
)(ShowPage);

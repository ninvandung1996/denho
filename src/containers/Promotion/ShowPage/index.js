import React, { Component } from "react";
import { connect } from "react-redux";
import { getPromotion } from "../../../redux/actions/Promotion";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import "./index.scss";
import moment from 'moment';

const initState = {
  title: "",
  content: "",
  date: "",
  thumbnail: "",
  type: ""
};

const types = [
  "Tin tức", "Quảng cáo", "Thông báo"
]

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }
  componentDidMount() {
    const _id = this.props.match.params.idPromotion;
    const { token, getPromotion } = this.props;
    getPromotion(_id, token, (err, res) => {
      if (!err) {
        this.setState({ ...res.data });
      }
    })
  }
  render() {
    const { title, content, date, thumbnail, type } = this.state;
    const time = new Date(date);
    return (
      <LayoutContentWrapper>
        <LayoutContent className="notify-layout">
          <div className="notify">
            <div className="notify__title">Nội dung quảng cáo</div>
            <div className="notify__item">
              <div className="notify__item--left">Tiêu đề</div>
              <div className="notify__item--right notify__item--title">
                {title}
              </div>
            </div>
            <div className="notify__item">
              <div className="notify__item--left">Loại</div>
              <div className="notify__item--right notify__item--title">
                {
                  types[type]
                }
              </div>
            </div>
            <div className="notify__item">
              <div className="notify__item--left">Thumbnail</div>
              <div className="notify__item--right notify__item--title">
                <img style={{ width: "200px", objectFit: "cover" }} src={thumbnail} alt="" />
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
              <div className="notify__item--left">Thời gian</div>
              <div className="notify__item--right notify__item--title">
                {moment(time).format("DD/MM/YYYY hh:mm")}
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
  }), {
    getPromotion
  }
)(ShowPage);

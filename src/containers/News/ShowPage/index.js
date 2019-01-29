import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews } from "../../../redux/actions/News";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import "./index.scss";
import moment from 'moment';

const initState = {
  title: "",
  content: "",
  date: "",
  thumbnail: ""
};

class ShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }
  componentDidMount() {
    const _id = this.props.match.params.idNews;
    const { token, getNews } = this.props;
    getNews(_id, token, (err, res) => {
      if (!err) {
        this.setState({ ...res.data });
      }
    })
  }
  render() {
    const { title, content, date, thumbnail } = this.state;
    const time = new Date(date);
    return (
      <LayoutContentWrapper>
        <LayoutContent className="notify-layout">
          <div className="notify">
            <div className="notify__title">Nội dung tin tức</div>
            <div className="notify__item">
              <div className="notify__item--left">Tiêu đề</div>
              <div className="notify__item--right notify__item--title">
                {title}
              </div>
            </div>
            <div className="notify__item">
              <div className="notify__item--left">Thumbnail</div>
              <div className="notify__item--right notify__item--title">
                <img style={{width: "200px", objectFit: "cover"}} src={thumbnail} />
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
                {moment(date).format("DD/MM/YYYY")}
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
    getNews
  }
)(ShowPage);

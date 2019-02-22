import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews } from "../../../redux/actions/News";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import "./index.scss";

const initState = {
  title: "",
  content: "",
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
    const { title, content, thumbnail } = this.state;
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
              <div className="notify__item--left">Ảnh đại diện</div>
              <div className="notify__item--right notify__item--title">
                <img style={{width: "200px", objectFit: "cover"}} src={thumbnail} alt="" />
              </div>
            </div>
            <div className="notify__item">
              <div className="notify__item--left">Nội dung</div>
              <div
                className="notify__item--right"
                dangerouslySetInnerHTML={{ __html: content }}
              />
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

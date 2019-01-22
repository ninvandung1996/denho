import React, { Component } from "react";
import { Input, Icon } from "antd";
import update from "immutability-helper";
import "./index.scss";

class InputLinkFanpage extends Component {
  state = {
    listFanpage: [
      {
        name: "",
        link: ""
      }
    ],
  };
  
  componentWillReceiveProps(nextProps) {
    if (this.props.listLink !== nextProps.listLink) {
      this.setState({
        listFanpage: nextProps.listLink
      })
    }
  }
 
  addInput = () => {
    this.setState(
      update(this.state, {
        listFanpage: {
          [this.state.listFanpage.length]: {
            $set: { name: "", link: "" }
          }
        }
      })
    );
  };

  removeInput = index => {
    const listFanpage = this.state.listFanpage.filter((e, i) => i !== index );
    this.setState({ listFanpage });
    this.props.getLinkFanpage(listFanpage);
  };

  handChange = (e, index) => {
    const { value, name } = e.target;

    this.setState(
      update(this.state, {
        listFanpage: {
          [index]: {
            $merge: { [name]: value }
          }
        }
      }), () => {
        this.props.getLinkFanpage(this.state.listFanpage);
        this.props.setError();
      }
    );
  };

  render() {
    const { listFanpage } = this.state;

    return (
      <div className="fanpage-link__list">
        {listFanpage && listFanpage.map((fanpage, index) => (
          <div className="list-item" key={index}>
            <span >
              <Input
                name="name"
                placeholder="Tên fanpage"
                value={fanpage && fanpage.name}
                onChange={e => this.handChange(e, index)}
                className="list-item__input-name"
              />
            </span>

            <span className="list-item__input-value">
              <Input
                name="link"
                placeholder="Link fanpage"
                value={fanpage && fanpage.link}
                onChange={e => this.handChange(e, index)}
                
              />

              <button 
                className="list-item__button--minus" 
                onClick={() => this.removeInput(index)}
              >
                <Icon type="minus" style={{ color: "#ffffff" }}/>
              </button>
            </span>

          </div>
        ))}
        <button 
          className="list-item__button--plus" 
          onClick={this.addInput}
        >
          <Icon type="plus" style={{ color: "#ffffff" }} />
        </button>
      </div>
    );
  }
}

export default InputLinkFanpage;

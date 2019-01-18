import React, { Component } from "react";
import LayoutContentWrapper from "../components/utility/layoutWrapper";
import LayoutContent from "../components/utility/layoutContent";
import "./style.scss";

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: "100vh" }}>
        <LayoutContent>
          <h1 className="bp">Blank Page</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}

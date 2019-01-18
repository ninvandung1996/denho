import React, { Component } from "react";
import { Route } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import("../dashboard"))
  },
  {
    path: "blankPage",
    component: asyncComponent(() => import("../blankPage"))
  },
  {
    path: "project",
    component: asyncComponent(() => import("../Project"))
  },
  {
    path: "promotion",
    component: asyncComponent(() => import("../Promotion"))
  },
  {
    path: "promotion/edit/:idPromotion",
    component: asyncComponent(() => import(".././Promotion/CreateNewPage"))
  },
  {
    path: "promotion/view/:idPromotion",
    component: asyncComponent(() => import(".././Promotion/ShowPage"))
  },
  {
    path: "promotion/create",
    component: asyncComponent(() => import(".././Promotion/CreateNewPage"))
  },
  {
    path: "supplier",
    component: asyncComponent(() => import("../Supplier"))
  },
  {
    path: "feedback",
    component: asyncComponent(() => import("../FeedBack"))
  },
  {
    path: "faq",
    component: asyncComponent(() => import("../FAQ"))
  },
  {
    path: "booking",
    component: asyncComponent(() => import("../Booking"))
  },
  {
    path: "calendar",
    component: asyncComponent(() => import("../Calendar/"))
  }
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map(singleRoute => {
          const { path, exact, ...otherProps } = singleRoute;
          return (
            <Route
              exact={exact === false ? false : true}
              key={singleRoute.path}
              path={`${url}/${singleRoute.path}`}
              {...otherProps}
            />
          );
        })}
      </div>
    );
  }
}

export default AppRouter;

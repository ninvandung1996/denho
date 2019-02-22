import React, { Component } from "react";
import { Route } from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";

const routes = [
  {
    path: "",
    component: asyncComponent(() => import(".././Notification"))
  },
  {
    path: "edit/:idNotification",
    component: asyncComponent(() => import(".././Notification/CreateNewPage"))
  },
  {
    path: "view/:idNotification",
    component: asyncComponent(() => import(".././Notification/ShowPage"))
  },
  {
    path: "createnotification",
    component: asyncComponent(() => import(".././Notification/CreateNewPage"))
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
    component: asyncComponent(() => import("../Promotion/EditPage"))
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
    path: "reviewsupplier",
    component: asyncComponent(() => import("../Supplier/Reviews"))
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
    path: "apartment",
    component: asyncComponent(() => import("../Calendar/"))
  },
  {
    path: "service",
    component: asyncComponent(() => import("../Service"))
  },
  {
    path: "User",
    component: asyncComponent(() => import("../User"))
  },
  {
    path: "news",
    component: asyncComponent(() => import("../News"))
  },
  {
    path: "news/edit/:idNews",
    component: asyncComponent(() => import("../News/EditPage"))
  },
  {
    path: "news/view/:idNews",
    component: asyncComponent(() => import("../News/ShowPage"))
  },
  {
    path: "news/create",
    component: asyncComponent(() => import("../News/CreateNewPage"))
  },
  {
    path: "config",
    component: asyncComponent(() => import("../ManageConfiguration"))
  },
  {
    path: "contract",
    component: asyncComponent(() => import("../Contract"))
  },
  {
    path: "ticket",
    component: asyncComponent(() => import("../Ticket"))
  },
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

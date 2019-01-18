import {
  COLLPSE_CHANGE,
  TOGGLE_ALL,
  COLLPSE_OPEN_DRAWER,
  CHANGE_OPEN_KEYS,
  CHANGE_CURRENT,
  CLOSE_ALL
} from "./types";

export const getView = width => {
  let newView = "MobileView";
  if (width > 1220) {
    newView = "DesktopView";
  } else if (width > 767) {
    newView = "TabView";
  }
  return newView;
};

export const toggleCollapsed = () => ({
  type: COLLPSE_CHANGE
});
export const toggleAll = (width, height) => {
  const view = getView(width);
  const collapsed = view !== "DesktopView";
  return {
    type: TOGGLE_ALL,
    collapsed,
    view,
    height
  };
};
export const toggleOpenDrawer = () => ({
  type: COLLPSE_OPEN_DRAWER
});
export const changeOpenKeys = openKeys => ({
  type: CHANGE_OPEN_KEYS,
  openKeys
});
export const changeCurrent = current => ({
  type: CHANGE_CURRENT,
  current
});

export const closeAll = () => ({ type: CLOSE_ALL });

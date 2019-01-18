import { getDefaultPath } from "../../helpers/urlSync";
import {
  COLLPSE_CHANGE,
  TOGGLE_ALL,
  COLLPSE_OPEN_DRAWER,
  CHANGE_OPEN_KEYS,
  CHANGE_CURRENT,
  CLOSE_ALL
} from "../actions/types";
import { getView } from "../actions/app";
const preKeys = getDefaultPath();

const initState = {
  collapsed: window.innerWidth > 1220 ? false : true,
  view: getView(window.innerWidth),
  height: window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys
};
export default function appReducer(state = initState, action) {
  switch (action.type) {
    case COLLPSE_CHANGE:
      return { ...state, collapsed: !state.collapsed };
    case COLLPSE_OPEN_DRAWER:
      return { ...state, openDrawer: !state.openDrawer };
    case TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height;
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height
        };
      }
      break;
    case CHANGE_OPEN_KEYS:
      return { ...state, openKeys: action.openKeys };
    case CHANGE_CURRENT:
      return { ...state, current: action.current };
    case CLOSE_ALL:
      return { ...state, current: [], openKeys: [] };
    default:
      return state;
  }
  return state;
}

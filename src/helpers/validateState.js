import _ from "lodash";
import moment from 'moment';
const timeFormat = "DD/MM/YYYY";
export const validateState = (state, args) => {
  let listErrs = [];

  args.forEach(arg => {
    if (typeof state[arg] === "number") {
      if (!(state[arg] >= state[arg] || state[arg] < state[arg])) listErrs.push(arg);
    }
    else if (_.isEmpty(state[arg])) listErrs.push(arg);
  });

  return {
    listErrs,
    error:
      listErrs.length === 0 ? "" : "*Bạn cần nhập đầy đủ thông tin các trường"
  };
};

export const checkChanged = (props, state, args) => {
  let checked = false;
  let error = "";

  args.forEach(arg => {
    if (state[arg] instanceof moment) {
      if (!(moment(props[arg]).format(timeFormat) === state[arg].format(timeFormat))) {
        checked = true;
      }
    }
    else if (!_.isEqual(props[arg], state[arg])) {
      checked = true;
    }
  });

  const listErrs = validateState(state, args);

  if (!checked) error = "*Bạn chưa thay đổi thông tin trường nào";
  return { checked, listErrs, error };
};

export const validateEmail = (email) => {
  let validate = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (email.match(validate)) return true;
  return false
}

export const validateYoutube = url => {
  var validate = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(validate)) {
    return true;
  }
  return false;
};

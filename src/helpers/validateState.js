import _ from "lodash";
export const validateState = (state, args) => {
  let listErrs = [];

  args.forEach(arg => {
    if (_.isEmpty(state[arg])) listErrs.push(arg);
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
    if (!_.isEqual(props[arg], state[arg])) {
      checked = true;
    }
  });

  const listErrs = validateState(state, args);

  if (!checked) error = "*Bạn chưa thay đổi thông tin trường nào";

  // if (listErrs.listErrs.length !== 0)
  //   error = "*Bạn cần nhập đầy đủ thông tin các trường";

  return { checked, listErrs, error };
};

export const validateYoutube = url => {
  var validate = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(validate)) {
    return true;
  }
  return false;
};

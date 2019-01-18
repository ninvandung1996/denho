import auth from './auth';
import common from './common';
import packageAPI from './package';
export default {
  ...auth,
  ...common,
  ...packageAPI
};

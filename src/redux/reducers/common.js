import {
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED,
  TOAST_SET,
  TOAST_CLEAR,
  MODAL_OPEN,
  MODAL_CLOSE
} from '../actions/types';

/**
 * MODAL
 */
export const modal = (state = { modalState: 'closed' }, { type }) => {
  switch (type) {
    case MODAL_OPEN:
      return { ...state, modalState: 'opened' };
    case MODAL_CLOSE:
      return {
        ...state,
        modalState: 'closed'
      };
    default:
      return state;
  }
};

/**
 * TOAST
 */
export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case TOAST_SET:
      return payload;
    case TOAST_CLEAR:
      return null;
    default:
      return state;
  }
};

/**
 * REQUEST
 */
export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case MARK_REQUEST_PENDING:
      return { ...state, [meta.key]: { status: 'pending', error: null } };
    case MARK_REQUEST_SUCCESS:
      return { ...state, [meta.key]: { status: 'success', error: null } };
    case MARK_REQUEST_FAILED:
      return { ...state, [meta.key]: { status: 'failure', error: payload } };
    case MARK_REQUEST_CANCELLED:
      return { ...state, [meta.key]: { status: 'success', error: null } };
    default:
      return state;
  }
};

import {
    GET_ALL_TICKET,
    GET_TICKET,
    ADD_TICKET,
    EDIT_TICKET,
    DELETE_TICKET,
    TICKET_GET_ALL_CONTRACT,
    TICKET_GET_ALL_SERVICE
} from './types';

export const getAllTicket = (...args) => ({ type: GET_ALL_TICKET, args });
export const getTicket = (...args) => ({ type: GET_TICKET, args });
export const addTicket = (...args) => ({ type: ADD_TICKET, args });
export const editTicket = (...args) => ({ type: EDIT_TICKET, args });
export const deleteTicket = (...args) => ({ type: DELETE_TICKET, args });
export const getAllContract = (...args) => ({ type: TICKET_GET_ALL_CONTRACT, args });
export const getAllService = (...args) => ({ type: TICKET_GET_ALL_SERVICE, args });
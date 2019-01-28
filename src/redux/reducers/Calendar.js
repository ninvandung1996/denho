import {
    CALENDAR_VIEW,
    CALENDAR_EVENTS,
    SAVE_CALENDAR_GET_APARTMENT,
    SAVE_CALENDAR_ADD_BOOKING,
    SAVE_CALENDAR_DELETE_BOOKING,
    CALENDAR_SELECT_APARTMENT,
    SAVE_CALENDAR_EDIT_APARTMENT,
    SAVE_CALENDAR_DELETE_APARTMENT,
    SAVE_CALENDAR_EDIT_BOOKING,
} from '../actions/types';
import moment from 'moment';

const defaultState = {
    events: [],
    view: "month",
    apartments: [], selectedApartment: null
}

const toEvent = (value) => {
    return {
        _id: value._id,
        title: value.user.email,
        checkin: value.checkin,
        checkout: value.checkout,
        start: new moment(value.dateStart).toDate(),
        end: new moment(value.dateEnd).toDate(),
        allDay: false
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case CALENDAR_VIEW:
            return {
                ...state,
                view: action.view
            };
        case CALENDAR_EVENTS: {
            let { events } = action;
            return { ...state, events };
        }
        case SAVE_CALENDAR_GET_APARTMENT: {
            let apartments = action.payload;
            let selectedApartment = apartments.length > 0 ? apartments[0] : null;
            let events = selectedApartment.bookings.map(value => (toEvent(value)))
            return { ...state, apartments, selectedApartment, events }
        }
        case SAVE_CALENDAR_ADD_BOOKING: {
            let { payload } = action;
            let events = [...state.events, toEvent(payload)];
            let selectedApartment = { ...state.selectedApartment };
            selectedApartment.bookings.push(payload);
            let apartments = [...state.apartments];
            apartments[apartments.indexOf(value => value._id === selectedApartment._id)] = selectedApartment;
            return { ...state, events, selectedApartment, apartments }
        }
        case SAVE_CALENDAR_EDIT_BOOKING: {
            let { payload } = action;
            let selectedApartment = { ...state.selectedApartment };
            selectedApartment.bookings = selectedApartment.bookings.map(value => {
                if (value._id === payload._id) return payload;
                return value;
            })
            let apartments = [...state.apartments].map(value => {
                if (value._id === selectedApartment._id) return selectedApartment;
                return value;
            });
            return { ...state, selectedApartment, apartments }
        }
        case SAVE_CALENDAR_DELETE_BOOKING: {
            let selectedApartment = { ...state.selectedApartment };
            selectedApartment.bookings = selectedApartment.bookings.filter(value => value._id !== action.payload._id);
            let apartments = [...state.apartments];
            apartments[apartments.indexOf(value => value._id === selectedApartment._id)] = selectedApartment;
            return { ...state, selectedApartment, apartments }
        }
        case CALENDAR_SELECT_APARTMENT: {
            let apartments = [...state.apartments];
            let selectedApartment = apartments[apartments.findIndex(value => value._id === action.payload)];
            let events = selectedApartment.bookings.map(value => (toEvent(value)))
            return { ...state, selectedApartment, events }
        }
        case SAVE_CALENDAR_EDIT_APARTMENT: {
            let selectedApartment = action.payload;
            let apartments = [...state.apartments].map(value => {
                if (value._id === selectedApartment._id) return { ...selectedApartment, bookings: value.bookings };
                return value;
            });
            return { ...state, selectedApartment, apartments }
        }
        case SAVE_CALENDAR_DELETE_APARTMENT: {
            let apartments = [...state.apartments].filter(value => (value._id !== action.payload));
            let selectedApartment = apartments.length > 0 ? apartments[0] : null;
            let events = selectedApartment ? selectedApartment.bookings.map(value => (toEvent(value))) : [];
            return { ...state, apartments, selectedApartment, events }
        }
        default:
            return state;
    }
}
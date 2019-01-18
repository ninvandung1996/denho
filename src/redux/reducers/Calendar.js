import {
    CALENDAR_VIEW,
    CALENDAR_EVENTS,
    SAVE_CALENDAR_GET_APARTMENT,
    SAVE_CALENDAR_ADD_BOOKING,
    CALENDAR_SELECT_APARTMENT,
    SAVE_CALENDAR_EDIT_APARTMENT,
    SAVE_CALENDAR_DELETE_APARTMENT,
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
        case CALENDAR_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case SAVE_CALENDAR_GET_APARTMENT: {
            let apartments = action.payload;
            let selectedApartment = apartments.length > 0 ? apartments[0] : null;
            let events = selectedApartment.bookings.map(value => (toEvent(value)))
            return { ...state, apartments, selectedApartment, events }
        }
        case SAVE_CALENDAR_ADD_BOOKING: {
            let { payload } = action;
            let events = [...state.events, toEvent(payload)];
            return { ...state, events }
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
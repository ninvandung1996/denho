import {
    SAVE_GET_ALL_PROJECT,
    SAVE_GET_PROJECT,
    SAVE_ADD_NEW_PROJECT,
    SAVE_EDIT_PROJECT,
    SAVE_DELETE_PROJECT,
    SAVE_ADD_NEW_APARTMENT,
    SAVE_DELETE_APARTMENT,
    SAVE_EDIT_APARTMENT
} from '../actions/types'

const defaultState = {
    projectList: [], selectedProject: null
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_PROJECT: {
            return { ...state, projectList: payload }
        }
        case SAVE_ADD_NEW_PROJECT: {
            return { ...state, projectList: [payload, ...state.projectList] }
        }
        case SAVE_EDIT_PROJECT: {
            let projectList = [...state.projectList].map(value => (
                value._id === payload._id ? payload : value
            ));
            let selectedProject = payload;
            return { ...state, projectList, selectedProject }
        }
        case SAVE_DELETE_PROJECT: {
            let projectList = payload;
            let selectedProject = projectList.length === 0 ? null : state.selectedProject;
            return { ...state, projectList, selectedProject }
        }
        case SAVE_GET_PROJECT: {
            return { ...state, selectedProject: payload }
        }
        case SAVE_ADD_NEW_APARTMENT: {
            let selectedProject = { ...state.selectedProject };
            let projectList = [...state.projectList].map(value => {
                if (value._id === payload.project) {
                    selectedProject = { ...value, apartments: [payload, ...selectedProject.apartments] };
                    return selectedProject;
                }
                return value;
            });
            return { ...state, projectList, selectedProject }
        }
        case SAVE_EDIT_APARTMENT: {
            let selectedProject = { ...state.selectedProject };
            let apartments = selectedProject.apartments.map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            })
            return { ...state, selectedProject: { ...selectedProject, apartments } }
        }
        case SAVE_DELETE_APARTMENT: {
            let selectedProject = { ...state.selectedProject };
            let apartments = selectedProject.apartments.filter(value => {
                return value._id !== payload._id
            })
            return { ...state, selectedProject: { ...selectedProject, apartments } }
        }
        default: {
            return state;
        }
    }
}
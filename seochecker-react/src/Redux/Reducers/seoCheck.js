import {SEO_CHECK_REQUEST, SEO_CHECK_SUCCESS, SEO_CHECK_ERROR, SEO_CHECK_CLEAR} from 'Redux/Actions';

const initialState = {
    checkingSeo: false,
    error: '',
    seoResult: null
}


export default function seoThunkReducer(state = initialState, action) {
	switch (action.type) {
		case SEO_CHECK_REQUEST: {
			return {
				...state,
                checkingSeo: true,
				error: ''
			};
		}
		case SEO_CHECK_SUCCESS: {
			return {
				...state,
                checkingSeo: false,
                seoResult: action.data,
                error: ''
			};
		}
		case SEO_CHECK_ERROR: {
			return {
				...state,
                checkingSeo: false,
                seoResult: null,
				error: action.error
			};
		}
		case SEO_CHECK_CLEAR: {
			return {
				...state,
                checkingSeo: false,
                seoResult: null,
				error: null
			};
		}
		default: {
			return state;
		}
	}
}
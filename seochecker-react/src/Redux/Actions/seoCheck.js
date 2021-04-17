import SeoCheckerApi from 'Services/SeoCheckerApi'

// Types
export const SEO_CHECK_REQUEST = 'REDUX_THUNK_SEO_CHECK_REQUEST';
export const SEO_CHECK_SUCCESS = 'REDUX_THUNK_SEO_CHECK_SUCCESS';
export const SEO_CHECK_ERROR = 'REDUX_THUNK_SEO_CHECK_ERROR';
export const SEO_CHECK_CLEAR = 'REDUX_THUNK_SEO_CHECK_CLEAR';


// Actions
const seoCheckRequest = () => ({
	type: SEO_CHECK_REQUEST,
});

const seoCheckSuccess = (data) => ({
	type: SEO_CHECK_SUCCESS,
	data,
});

const seoCheckError = (error) => ({
	type: SEO_CHECK_ERROR,
	error,
});

const seoCheckClear = () => ({
	type: SEO_CHECK_ERROR
});


// Thunks
export const seoCheck = (keyword, url) => (dispatch) => {
	dispatch(seoCheckRequest());
	SeoCheckerApi.check(keyword, url)
		.then((response) => response.json())
		.then(
			(data) => {
				dispatch(seoCheckSuccess(data));
			},
			(error) => dispatch(seoCheckError(error.message || 'Unexpected Error!!!')),
		);
};

export const seoClear = () => (dispatch) => {
	dispatch(seoCheckClear());
};
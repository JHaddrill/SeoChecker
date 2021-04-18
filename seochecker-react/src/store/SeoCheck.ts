import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import SeoCheckerApi from '../Services/SeoCheckerApi';
import { SeoResult } from '../types/SeoResult';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface SeoCheckState {
    isLoading: boolean;
    SeoResult?: SeoResult;
    Error?: string
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface SeoCheckRequest {
    type: 'SEO_CHECK_REQUEST'
}

interface SeoCheckSuccess {
    type: 'SEO_CHECK_SUCCESS',
    seoResult: SeoResult
}

interface SeoCheckError {
    type: 'SEO_CHECK_ERROR',
    error: string

}

interface SeoCheckClear {
    type: 'SEO_CHECK_CLEAR'
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = SeoCheckRequest | SeoCheckSuccess | SeoCheckError | SeoCheckClear;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    seoCheck: (keyword: string, url: string, engine: string): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'SEO_CHECK_REQUEST' });
        SeoCheckerApi.check(keyword, url, engine)
            .then((response) => response.json())
            .then(
                (data: SeoResult) => {
                    dispatch({ type: 'SEO_CHECK_SUCCESS', seoResult: data });
                },
                (error) => dispatch({ type: 'SEO_CHECK_ERROR', error: error.message || 'Unexpected Error!!!' }),
            );
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: SeoCheckState = { SeoResult: undefined, Error: undefined, isLoading: false };

export const reducer: Reducer<SeoCheckState> = (state: SeoCheckState | undefined, incomingAction: Action): SeoCheckState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SEO_CHECK_REQUEST': {
            return {
                ...state,
                isLoading: true
            };
        }

        case 'SEO_CHECK_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                SeoResult: action.seoResult,
                Error: ''
            };
        }

        case 'SEO_CHECK_ERROR': {
            return {
                ...state,
                isLoading: false,
                SeoResult: undefined,
                Error: action.error
            };
        }
        case 'SEO_CHECK_CLEAR': {
            return {
                ...state,
                isLoading: false,
                SeoResult: undefined,
                Error: ''
            };
        }
    }
};

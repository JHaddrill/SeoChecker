import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'Redux/Reducers';
import thunkMiddleware from 'redux-thunk';
import { seoClear } from 'Redux/Actions'
import { loadState, saveState } from 'localStorage';

export default function configureStore() {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const persistedState = loadState();

	const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)));
	store.subscribe(() => {
		saveState(store.getState());
	});
	store.dispatch(seoClear())
	return store;
}

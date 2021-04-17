import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from 'Components/Pages/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        
    , document.getElementById('root'));

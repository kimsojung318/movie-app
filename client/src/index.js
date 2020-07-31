import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import promiseMiddleware from 'redux-promise';
import ReduxThunx from "redux-thunk";
import { applyMiddleware, createStore } from 'redux';
import Reducer from "./_reducer"

// Redux Middleware인 promiseMiddleware, ReduxThunx와 함께 Store 생성
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunx)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
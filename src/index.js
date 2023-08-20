import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';
const store = createStore(reducers,compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1099432519695-7fvp8rq167p200urpr2te4lm63uoa1a7.apps.googleusercontent.com">
<Provider store = {store}>
<App/>
</Provider>
</GoogleOAuthProvider>,
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

/*Styles*/
import "../node_modules/normalize.css/normalize.css";
import './Styles/global.css';
import "../node_modules/shed-css/dist/index.css";

/*Routes*/
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Student_Routes from './Components/Student_Routes/Student_Routes';

/*Store setup*/
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';

/*Components*/
import Login_Container from './Components/Login/Login_Container';

const store = createStore(reducers, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <div className={'app-container container-fluid'}>
                    <Route path={'/'} exact component={Login_Container}/>
                    <Route path={'/home'} component={Student_Routes}/>
                </div>
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import Main from './components/Main';
import AboutAuthor from './components/AboutAuthor';
import Authorization from './components/Authorization';
import Navigation from './components/Navigation';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import mainReducer from './store/reducers';

const store = createStore(mainReducer);

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navigation/>
                <Route path="/" exact component={Main}/>
                <Route path="/aboutAuthor/" component={AboutAuthor}/>
                <Route path="/authorization/" component={Authorization}/>
            </Router>
        </Provider>
    );
}

export default App;

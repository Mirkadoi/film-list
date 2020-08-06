import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import Home, {IDataResponse} from './page/Home';
import Ticket from './page/Ticket';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [movies, setMovies] = useState<IDataResponse[] | []>([]);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home movies={movies} setMovies={setMovies}/>
                </Route>
                <Route path="/:id">
                    <Ticket />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

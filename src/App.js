import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Movies from './components/Pages/Movies/Movies';
import Shows from './components/Pages/Shows/Shows';
import GlobalContext from './context/GlobalContext';
import Favorites from './components/Pages/Favorites/Favorites';
import Search from './components/Pages/Search/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <GlobalContext>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/movies'>
              <Movies />
            </Route>
            <Route path='/tv'>
              <Shows />
            </Route>
            <Route path='/favorites'>
              <Favorites />
            </Route>
            <Route path='/search'>
              <Search />
            </Route>
          </Switch>
        </GlobalContext>
      </Router>
    </div>
  );
}

export default App;

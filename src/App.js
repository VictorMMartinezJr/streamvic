import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Movies from './components/Pages/Movies/Movies';
import Shows from './components/Pages/Shows/Shows';
import GlobalContext from './context/GlobalContext';
import Favorites from './components/Pages/Favorites/Favorites';
import Search from './components/Pages/Search/Search';
import MovieDetails from './components/Pages/Details/MovieDetails';
import ShowDetails from './components/Pages/Details/ShowsDetails';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <title>StreamVic</title>
          <meta name='description' content='Get info on all your favorite movies and tv shows' />
          <meta name='keywords' content='Movies, Tv Shows, Search Movies, Search Tv Shows' />
        </Helmet>
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
              <Route path='/moviedetails/:id'>
                <MovieDetails />
              </Route>
              <Route path='/showsdetails/:id'>
                <ShowDetails />
              </Route>
            </Switch>
          </GlobalContext >
        </Router >
      </HelmetProvider>
    </div>
  );
}

export default App;

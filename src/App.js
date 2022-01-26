import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import GlobalContext from './context/GlobalContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import LoadingDiv from './components/Stateless/Loading';
const Movies = lazy(() => import('./components/Pages/Movies'));
const Shows = lazy(() => import('./components/Pages/Shows'));
const Favorites = lazy(() => import('./components/Pages/Favorites'));
const Search = lazy(() => import('./components/Pages/Search'));
const MovieDetails = lazy(() => import('./components/Pages/Details/MovieDetails'));
const ShowDetails = lazy(() => import('./components/Pages/Details/ShowsDetails'));

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
              <Suspense fallback={<LoadingDiv />}>
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
              <Route path='/moviedetails/:id/:title'>
                <MovieDetails />
              </Route>
              <Route path='/showsdetails/:id/:title'>
                <ShowDetails />
              </Route>
            </Suspense>
            </Switch>
          </GlobalContext >
        </Router >
      </HelmetProvider>
    </div>
  );
}

export default App;

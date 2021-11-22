import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import Movies from './components/Pages/Movies/Movies';
import Navbar from './components/Stateful/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/movies'>
            <Movies />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

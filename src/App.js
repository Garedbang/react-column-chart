import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ColumnChartPage from './components/pages/ColumnChartPage';
import NotFoundPage from './components/pages/NotFoundPage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ColumnChartPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

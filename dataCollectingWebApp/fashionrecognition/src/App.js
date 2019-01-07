import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import Contact from './components/Contact';
import ImageCollection from './components/ImageCollection';
import About from './components/About';
import GenerateTrends from './components/GenerateTrends';
import ViewLabelImages from './components/ViewLabelImages';

import './App.css';
import './index.css';


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Fashion Recognition</h1>
          <ul className="header">
            <li><NavLink exact to="/">About</NavLink></li>
            <li><NavLink exact to="/image-collection">Image Collection</NavLink></li>
            <li><NavLink exact to="/generate-trends">Generate Trends</NavLink></li>
            <li><NavLink exact to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={About}/>
            <Route exact path="/image-collection" component={ImageCollection}/>
            <Route exact path="/generate-trends" component={GenerateTrends}/>
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/images/:label" component={ViewLabelImages}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

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
            <li><NavLink to="/image-collection">Image Collection</NavLink></li>
            <li><NavLink to="/generate-trends">Generate Trends</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={About}/>
            <Route path="/image-collection" component={ImageCollection}/>
            <Route path="/generate-trends" component={GenerateTrends}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/image-collection/:label" component={ViewLabelImages}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;

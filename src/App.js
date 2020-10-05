import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Navigation  from './parts/Navigation';
import  Footer  from './parts/Footer';
import  Home from './com/home';
import  About from './com/About';
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
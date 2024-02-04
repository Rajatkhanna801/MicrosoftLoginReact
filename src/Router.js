// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginWithMicrosoft from './MicrosoftAuthComponent'; // Update the path based on your project structure

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginWithMicrosoft} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default AppRouter;

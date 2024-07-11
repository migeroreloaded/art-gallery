import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import Artwork from './components/Artworks';
import ExhibitionsPage from './components/ExhibitionPage';
import Artist from './components/Artist';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  const [signIn, toggle] = React.useState(true);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage signIn={signIn} toggle={toggle} />
          </Route>
          <Route path="/register">
            <RegisterPage signIn={signIn} toggle={toggle} />
          </Route>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/artworks" component={Artwork} />
          <Route path="/exhibitions" component={ExhibitionsPage} />
          <Route path="/artists" component={Artist} />
          {/* Add more routes as needed */}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

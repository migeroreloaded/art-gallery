import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import Artwork from './components/Artworks';
import ExhibitionsPage from './components/ExhibitionPage';
import Artist from './components/Artist';
import { AuthProvider } from './components/AuthContext'; // Make sure to import AuthProvider
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          {/* Routes that require authentication */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/user-dashboard" component={UserDashboard} />
          {/* Public routes */}
          <Route path="/artworks" component={Artwork} />
          <Route path="/exhibitions" component={ExhibitionsPage} />
          <Route path="/artists" component={Artist} />
          <Redirect to="/artworks" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

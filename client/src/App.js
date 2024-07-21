import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import WelcomePage from './components/Welcomepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ArtistDetail from './components/ArtistDetail.js';
import Artwork from './components/Artworks';
import ExhibitionsPage from './components/ExhibitionPage';
import Artist from './components/Artist';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import UserDashboard from './components/UserDashboard';
import ManagementPage from './components/management';

function App() {
  return (
    <AuthProvider>
      <Router>
       {/*<Navbar />*/}
        <Switch>
          <Route path="/" exact component={Artwork} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/management" component={ManagementPage} />
          {/* Routes that require authentication */}
          <Route path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/user-dashboard" component={UserDashboard} />
          {/* Public routes */}
          <Route path="/artworks" component={Artwork} />
          <Route path="/exhibitions" component={ExhibitionsPage} />
          <Route exact path="/artists" component={Artist} />
          <Route path="/artists/:id" component={ArtistDetail} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

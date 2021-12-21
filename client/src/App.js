import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Authentication from './components/authentication/Authentication';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import PrivateRoute from "./components/authentication/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ActivateAccount from "./components/authentication/ActivateAccount";
import QRCode from "./components/dashboard/qr/QRCode";
import AttendClass from "./components/dashboard/AttendClass";
import { Route } from "react-router";

const App = () => {
    return (
        <Router>
            <Switch>
                <AuthenticatedRoute path="/" exact
                                    component={(props) => <Authentication {...props} form='login'/>} />

                <AuthenticatedRoute path="/activate/:activationToken" component={ActivateAccount} />

                <Route path="/attend/:attendanceToken" component={AttendClass} />

                <PrivateRoute path="/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/admin/classes/:class" component={Dashboard} />
                <PrivateRoute path="/admin/:content" component={Dashboard} />

                <PrivateRoute path="/classes/:class" component={Dashboard} />
                <PrivateRoute path="/settings" component={Dashboard} />
                <PrivateRoute path="/qr" component={QRCode} />
            </Switch>
        </Router>
    );
};

export default App;

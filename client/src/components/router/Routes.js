import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddProduct from '../product/AddProduct'
import AddCompany from '../company/AddCompany'
import Register from '../auth/Register';
import Login from '../auth/Login'
import Dashboard from '../dashboard/Dashborboard'
import Products from '../product/Products'
import PrivateRoute from './PrivateRoute';
import Company from '../company/Company';
import Profile from '../company/Profile';
import Product from '../product/Product';
const Routes = () => {
    
    return(
        <Switch>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/profile/:id" component={Profile}/>
            <Route exact path="/product/:id" component={Product}/>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
            <PrivateRoute exact path='/company' component={Company}/>
            <PrivateRoute exact path='/products' component={Products}/>
            <PrivateRoute exact path='/addCompany' component={AddCompany}/>
            <PrivateRoute exact path='/addProduct' component={AddProduct}/>
        </Switch>
    );
};
export default Routes
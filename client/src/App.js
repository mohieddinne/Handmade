import React, {Fragment, useEffect} from 'react';
//Redux
import { Provider } from 'react-redux'
import './app.css'
import store from './redux/store'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './components/router/Routes'
import Header from './components/header/Header'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './redux/actions/auth'
import { getCurrentProfile, getProfiles } from './redux/actions/profile'
if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
useEffect(()=> {
  store.dispatch(loadUser());
  store.dispatch(getProfiles());
},[])
  return (
    <Provider store={store}> 
      <Router>
         <Fragment>
           <Header/>
           <div className='main'>
           <Switch>
             <Route exact path='/' component = {Home}/>
             <Route component = {Routes} />
           </Switch>
           </div>
         </Fragment>
      </Router>
    </Provider>
  );
};

export default App;


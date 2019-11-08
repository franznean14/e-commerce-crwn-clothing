import React from 'react';
import { BrowserRouter as Router, Switch, Route , Redirect } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';


import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
        
      }
      setCurrentUser(userAuth)
      
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/checkout" component={ CheckoutPage } />
            <Route exact path="/signin" render={() => this.props.currenUser ? (<Redirect to="/"/>) : (<SignInAndSignUp/>)} />
          </Switch>
        </Router>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currenUser: selectCurrentUser
})

const mapDistpatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDistpatchToProps)(App);

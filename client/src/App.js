import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import {Container} from 'reactstrap';
import ItemModal from './components/itemModal';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {loadUser} from './actions/authActions';
import './App.css';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return(
      <Provider store={store}>
        <div className = "App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
          
        </div>
      </Provider>
    );
  }
}

export default App;

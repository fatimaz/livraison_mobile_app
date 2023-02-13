import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Routes from './src/routes';
import {store, persistedStore} from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native';
import ViewPager from '@react-native-community/viewpager';


export default class App extends Component {
  render() {
    // LogBox.ignoreWarnings([
    //   "Warning: ViewPagerAndroid has been extracted",
    // ])
    LogBox.ignoreAllLogs();
    return (
     <Provider store={store}>
       {/* <PersistGate persistor={persistedStore}> */}
           <Routes/>
          {/* </PersistGate> */}
     </Provider> 
    );
  }
}
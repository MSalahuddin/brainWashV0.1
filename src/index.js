import {Provider, connect} from 'react-redux';
import configureStore from './store';

import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {updateUser, removeUser} from './actions/userAction';
import {
  Platform,
  StyleSheet,
  Text,
  ViewSafeAreaView,
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  // AsyncStorage
} from 'react-native';
import RootRouter from './navigator/rootRouter';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-community/async-storage';

// import SplashScreen from "react-native-splash-screen";

// Geolocation.setRNConfiguration();
// navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.getData();
  }
  componentWillReceiveProps(nextprops) {
    this.getData();
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        var valu = JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };
  componentDidMount() {
    this.getData();

    // console.log(AsyncStorage.getItem('user'));
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
  }
  render() {
    const store = configureStore();
    return (
      <>
        <Provider store={store}>
          <RootRouter />
        </Provider>
      </>
    );
  }
}

export default App;

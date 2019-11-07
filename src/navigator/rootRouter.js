import {Provider, connect} from 'react-redux';

import React, {Component} from 'react';
import {updateUser, removeUser} from '../actions/userAction';
import configureStore from '../store';
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
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigator from './index';
import AsyncStorage from '@react-native-community/async-storage';
import Rootnavigator from './rootNavigator';

class RootRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        var valu = JSON.parse(value);
        this.props.updateUser(valu);
      }
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    console.log(this.props.user, '/////////////////,,,,,,,,,');
    this.getData();
  }
  componentWillReceiveProps(nextprops) {
    this.setState({user: nextprops.user});
    //   }
  }
  render() {
    if (this.state.user) {
    } else {
      console.log('asasahello');
    }

    return (
      <>
        {!this.state.user && <Rootnavigator />}
        {this.state.user && <Navigator />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
});

const actions = {
  updateUser,
  removeUser,
};

export default connect(
  mapStateToProps,
  actions,
)(RootRouter);

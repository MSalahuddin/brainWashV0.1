// @flow

import React, { Component } from "react";

import { View, Text, Dimensions, Platform, AsyncStorage } from "react-native";
// import  from 'redux-storage-engine-reactnativeasyncstorage';
import { connect } from "react-redux";
import * as storage from "redux-storage";
import DashboardScreen from "../containers/Dashboard";
import { Colors, Metrics, Images } from "../theme";
import styles from "./styles";
import RegistrationScreen from "../containers/Registration";
import RegistrationwasherScreen from "../containers/washerRegister";
import LoginScreen from "../containers/Login";
import DrawerMenu from "./DrawerMenu";
import ProfileScreeen from "../containers/Profile";
import RequestScreen from "../containers/Request";
import ChatScreen from "../containers/Chat";
import CustomTabBar from "./bottomNavigation";
import HomeScreen from "../containers/Home";
import AddEmploymentScreen from "../containers/AddEmployment";
import UserStatusScreen from "../containers/userStatus";
import findwashScreen from "../containers/FindWash";
import WashhistoryScreen from "../containers/washHistory";
import WasherhistoryScreen from '../containers/washerHistory';
import FindOrderScreen from '../containers/FindOrders';
import PasswordresetScreen from '../containers/resetPassword';
import { Stack, Scene, Router, Actions, Tabs } from "react-native-router-flux";

function onBackPress() {
  console.log(storage);
  const scene = Actions.currentScene;
}

// const stackNavigator = 

class Rootnavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    console.log("userrrrrrrrrrrrrrrrr", this.state.user);
  }
  render() {

    return (
    
      <Router>
      
        <Stack
          titleStyle={styles.title}
          headerStyle={styles.header}
          key="root"
          tintColor={Colors.primary}

        >
    
          <Scene
            hideNavBar
            headerStyle={styles.header}
            titleStyle={[styles.title, { width: Metrics.screenWidth }]}
            tintColor="white"
            title={"LoginScreen"}
            key="loginScreen"
            component={LoginScreen}
            renderLeftButton={
              () => { }
              //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
            }
          />
          <Scene
            hideNavBar
            headerStyle={styles.header}
            titleStyle={[styles.title, { width: Metrics.screenWidth }]}
            tintColor="white"
            title={"RegistrationScreen"}
            key="registrationScreen"
            component={RegistrationScreen}
            renderLeftButton={
              () => { }
              //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
            }
          />
          <Scene
            hideNavBar
            headerStyle={styles.header}
            titleStyle={[styles.title, { width: Metrics.screenWidth }]}
            tintColor="white"
            title={"RegistrationwasherScreen"}
            key="registrationwasherScreen"
            component={RegistrationwasherScreen}
            renderLeftButton={
              () => { }
              //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
            }
          />
          <Scene
            hideNavBar
            headerStyle={styles.header}
            titleStyle={[styles.title, { width: Metrics.screenWidth }]}
            tintColor="white"
            title={"PasswordScreen"}
            key="passwordScreen"
            component={PasswordresetScreen}
            renderLeftButton={
              () => { }
              //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
            }
          />
          {/* <Scene
            hideNavBar
            headerStyle={styles.header}
            titleStyle={[styles.title, { width: Metrics.screenWidth }]}
            tintColor="white"
            title={"LoginScreen"}
            key="loginScreen"
            component={LoginScreen}
            renderLeftButton={
              () => { }
              //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
            }
          /> */}
     



        </Stack>
      </Router>
    )
  }
}
// export default () => (
//   <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
// );

export default Rootnavigator;
// const Navigator = connect()(Router);

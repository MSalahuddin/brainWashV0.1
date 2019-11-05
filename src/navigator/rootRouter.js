import { Provider,connect } from "react-redux";


import React, { Component } from "react";
import {updateUser,removeUser} from '../actions/userAction';
import configureStore from '../store';
import {
  Platform, StyleSheet, Text, ViewSafeAreaView,
  ScrollView,
  View,
  SafeAreaView,
  StatusBar,
  // AsyncStorage
  
} from "react-native";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Navigator from "./index";
import AsyncStorage from '@react-native-community/async-storage';
import Rootnavigator from './rootNavigator';

class RootRouter extends Component {
  constructor(props){
    super(props);
    this.state={
      user: configureStore().getState().userReducer.user ,
    }
    console.log("ye ra store ka user",configureStore().getState().userReducer)
    
  }
  

  getData =  async ()=>{
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log(value,'valllllllllllllllll')
      if(value !== null) {
       var valu = JSON.parse(value)
       console.log("ye rahiiiiiiiiiiiiiiiiiii",value)
       this.props.updateUser(valu);
     
      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }
  componentDidMount() {
    this.getData();
   console.log("hello",this.state.user)
    // console.log(AsyncStorage.getItem('user'));
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);
  }
  componentWillReceiveProps(nextprops){
    console.log("===> next",nextprops)
//   if(nextprops.user){
      this.setState({user:nextprops.user});
      console.log("salam",nextprops.user);
//   }

}
  render() {
    console.log("hello",this.state.user)
    if(this.state.user){
    console.log("yaaaaaaaaaaaaaaaa" ,configureStore().getState().userReducer)
    
    }
    else{
      console.log("asasahello")
    }
  
    return (
      <>
       
         {!this.state.user && <Rootnavigator />}
         {this.state.user && <Navigator />}

       
      </>


    );
  }
}

const mapStateToProps = (state) =>  ({
    user:  state.userReducer.user 
  })
  

  
  const actions ={
      updateUser,
      removeUser
    }
  
export default connect(mapStateToProps,actions)(RootRouter)
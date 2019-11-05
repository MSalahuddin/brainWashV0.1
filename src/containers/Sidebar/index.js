// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Actions from "react-native-router-flux";
import { Metrics, Colors, Images } from "../../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-community/async-storage';
import {updateUser,removeUser} from '../../actions/userAction';
import styles from "./styles";


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAccountExpand: false,

    };
  }
  componentWillReceiveProps(nextprops){
    console.log("ye loe lo",nextprops)
  }
  removeAsyncUser = async ()=>{
    try {
      const value = await AsyncStorage.removeItem('@storage_Key')
      if (value !== null) {
        console.log("asasassa", JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
      // error reading value
    }
  }
logout = ()=>{
  console.log("asa chinto")
  this.removeAsyncUser()
  this.props.removeUser()
}
  renderList = (title, onPress, icon ) => {
    return (
      <TouchableOpacity style={[styles.listView]} onPress={onPress}>
        <Image source={icon} />

        <View
          style={{
            justifyContent: "center"
          }}
        >
          <Text style={[styles.listTitle]}>{title}</Text>
        </View>

      </TouchableOpacity>
    )
  }
  renderBody = () => {
    return (
      <View style={{ marginTop: Metrics.ratio(30), flex: 1 }}>
        <View>
          {this.renderList("LOGOUT" ,this.logout,Images.Logout)}
        </View>
      </View>
    );
  };

  render() {
    const { appConfig } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Metrics.ratio(10) }}>
          <Image source={Images.logo}
            style={{
              width: Metrics.ratio(170),
              height: Metrics.ratio(54),
              marginBottom: Metrics.ratio(15)
            }}
            resizeMethod='auto'
            resizeMode='cover'
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.rowContainer}
        >

          {this.renderBody()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) =>  ({
  user: state.userReducer ? state.userReducer.user : null
})



const actions ={
    updateUser,
    removeUser
  }

export default connect(
  mapStateToProps,
  actions
)(Sidebar);

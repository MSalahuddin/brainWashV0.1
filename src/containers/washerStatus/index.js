// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import {Actions} from 'react-native-router-flux';

import moment from 'moment';
class WashstatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }


  componentWillReceiveProps(nextProps) {
  
  }

  componentWillMount() {
 
  }

  

  render() {
    return (
      <View style={styles.container}>
         <Header
          headerText={"LAUNDARY STATUS"}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() => {console.log("hello") }}

        />
        <View>
      
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(WashstatusScreen);

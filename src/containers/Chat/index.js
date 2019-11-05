// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

class ChatScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(ChatScreen);

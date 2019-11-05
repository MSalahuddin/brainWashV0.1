import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import styles from "./styles";
import { Images, Metrics } from "../../theme";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

class Header extends Component {
  static propTypes = {
    //selectedTab: PropTypes.oneOf(["mycars", "addcar"]),
    headerText: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftBtnPress: PropTypes.func,
    rightBtnPress: PropTypes.func,
    leftIconStyle: PropTypes.object,
    headerTextStyle: PropTypes.object,
    rightIconStyle: PropTypes.object,
    productQuantity: PropTypes.number,
    itemQuantity: PropTypes.number
  };
  static defaultProps = {
    headerText: "",
    leftIcon: undefined,
    rightIcon: undefined,
    leftBtnPress: undefined,
    leftIconStyle: undefined,
    headerTextStyle: undefined,
    rightIconStyle: undefined,
    rightBtnPress: undefined,
    productQuantity: undefined,
    itemQuantity: undefined
  };
  render() {
    const {
      headerText,
      leftIcon,
      rightIcon,
      leftBtnPress,
      headerTextStyle,
      rightIconStyle,
      rightBtnPress,
      itemQuantity
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.TouchableMenu,
            {
              justifyContent: "center",
              alignItems: "center"
            }
          ]}
          onPress={leftBtnPress}
        >
          <Image
            style={{ paddingTop: Metrics.ratio(5) }}
            source={leftIcon}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image style={[{
              height: Metrics.ratio(50),
              width: Metrics.ratio(50),
              position: "absolute",
              left: Metrics.ratio(10)
            }, Platform.OS === "ios" && {height: Metrics.ratio(35),left: Metrics.ratio(25),
              width: Metrics.ratio(35),top:Metrics.ratio(17)}]} source={Images.LogoSmall} />
            <Text style={[styles.headerText, headerTextStyle]}>{headerText}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={rightBtnPress}
          style={[styles.TouchableMenu, rightIconStyle]}
        >
          {/* <Text style={styles.rightText}>SAVE</Text> */}
          {/* <Icon
            style={{ paddingTop: Metrics.ratio(5) }}
            size={30}
            color="white"
            name={rightIcon}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

// const mapStateToProps = () => ({});

// const actions = {};

// export default connect(
//   mapStateToProps,
//   actions
// )(Empty);

export default Header;

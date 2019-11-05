// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import DatePicker from "react-native-datepicker";

class UserStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employerName: "Milkshake Media",
      location: "Atlanta, GA",
      title: "UX Designer",
      startDate: false
    };
  }
  
renderOrder = ()=>{
  return(
    <View style={styles.statuscard}>
      <View style={styles.statusHead}>
        <Text style={styles.statusHeadTxt}>Order Status</Text>
      </View>
      <View style={styles.statusImg}>
        <Image source={Images.profilePicture} style={styles.profileImg}/>
        <View style={styles.userDetail}>
          <Text style={styles.userName}>JOHN DOE</Text>
          <Text style={styles.userEmail}>doe@edu.edu</Text>
        </View>
      </View>
      <View style={styles.statusBody}>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>No of bags</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> : 2</Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Student Using Own Detergents</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> : Yes</Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Folded</Text>
          <Text style={styles.bodyFree}>(free)</Text>
          <Text style={styles.bodyProp}> : No</Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Hung</Text>
          <Text style={styles.bodyFree}>(free)</Text>
          <Text style={styles.bodyProp}> : No</Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Washer Setting</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> : </Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Dryer Setting</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> : </Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Special Instructions</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> : Wash My clothes urgent</Text>
        </View>
        <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Status</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> : It's in Dryer</Text>
        </View>
       </View>
    </View>
  )
}
  render() {
    return (
      <View style={styles.container}>
         <Header
          headerText={"LAUNDARY STATUS"}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() =>              this.props.navigation.navigate("dashboard")}

        />
        <View>
        {this.renderOrder()}
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
)(UserStatusScreen);

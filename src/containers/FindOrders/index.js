// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity,ScrollView } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import StarRating from 'react-native-star-rating';

class FindOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      starCount: 5
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  renderOrder = () => {
    return (
      <View style={styles.statuscard}>

        <View style={styles.statusImg}>
          <View style={styles.stars}>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={17}
              rating={this.state.starCount}
              fullStarColor={'#fec057'}
              selectedStar={(rating) => { this.onStarRatingPress(rating) }}
              containerStyle={{ paddingTop: 5, marginTop: Metrics.ratio(5), width: Metrics.screenWidth * 0.30, marginLeft: Metrics.ratio(0) }}
              starStyle={{ paddingLeft: Metrics.ratio(1) * 0.05, paddingRight: Metrics.ratio(0) }}
            /></View>
          <View style={styles.userDetail}>
            <Text style={styles.starTxt}>(5 stars)</Text>
          </View>
          <View style={styles.amount}>
            <Text style={
              {
                fontFamily: Fonts.type.demibold,
                fontSize: Metrics.ratio(18),
                color: 'black'
              }
            }>$51</Text>
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
            <Text style={styles.bodyHeading}>Special Instruction</Text>
            <Text style={styles.bodyFree}></Text>
            <Text style={styles.bodyProp}> : Wash my clothes urgent</Text>
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Distance</Text>
            <Text style={styles.bodyFree}></Text>
            <Text style={styles.bodyProp}> : 3.2 miles</Text>
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Pick Up Location</Text>
            <Text style={styles.bodyProp}> : </Text>
            <TouchableOpacity><Text style={styles.bodyFree}>(Click Here)</Text></TouchableOpacity>
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Drop Off Location</Text>
            <Text style={styles.bodyProp}> : </Text>
            <TouchableOpacity><Text style={styles.bodyFree}>(Click Here)</Text></TouchableOpacity>
          </View>
          <View style={{alignContent:"center",alignItems:"center"}}>
          <TouchableOpacity style={styles.submitButtonView}
            onPress={() => { }}
          >
            <Text
              style={{
                fontSize: Metrics.ratio(13),
                color: "black",
                fontFamily: Fonts.type.demibold
              }}
            >
              ACCEPT
              </Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={"FIND A WASH"}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() => { console.log("hello") }}

        />
        <ScrollView style={{marginBottom:Metrics.ratio(25)}}>
        <View>
          {this.renderOrder()}
          {this.renderOrder()}
          {this.renderOrder()}
          {this.renderOrder()}
          {this.renderOrder()}
          {this.renderOrder()}
          {this.renderOrder()}

        </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(FindOrderScreen);

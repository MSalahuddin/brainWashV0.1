// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import {updateUser,removeUser} from '../../actions/userAction';
import StarRating from 'react-native-star-rating';
import styles from "./styles";

class ProfileScreeen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
  componentDidMount(){
    console.log("===> user",this.props.user)
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  renderProfile = () => {
    return (
      <View>

        <View style={styles.Profilecard}>

          <View style={styles.ProfileImgContainer}>
            <Image source={Images.profilePicture} style={styles.profileImg} />
          </View>
          <View style={styles.UserName}>
            <Text style={styles.UserNameTxt}>JOHN</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={20}
              rating={this.state.starCount}
              fullStarColor={'#fec057'}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              containerStyle={{ paddingTop: 5, marginTop: Metrics.ratio(5), width: Metrics.screenWidth * 0.35, marginLeft: Metrics.ratio(5) }}
              starStyle={{ paddingLeft: Metrics.ratio(1) * 0.05, paddingRight: Metrics.ratio(0) }}
            />
          </View>
          <View style={styles.profileBody}>
            <View style={styles.bodyTxt}>
              <Text style={styles.bodyHeading}>Email</Text>
              <Text style={styles.bodyFree}> : john@doe.edu</Text>
              {/* <Text style={styles.bodyProp}> : 2</Text> */}
            </View>
            <View style={styles.bodyTxt}>
              <Text style={styles.bodyHeading}>Graduating Year</Text>
              <Text style={styles.bodyFree}> : 2016</Text>
              {/* <Text style={styles.bodyProp}> : 2</Text> */}
            </View>
          </View>
          <View style={styles.BioBody}>
            <View style={styles.BioTxt}>
              <Text style={styles.bodyHeading}>Bio</Text>
              <Text style={styles.TxtBio}>youm aoam hes asasdas asdasd asd asdasdasd
              asdasdasd asdasdasd asdasd asdasdawdcsas asdasdwca asdasdas asdasdas asdas</Text>
              {/* <Text style={styles.bodyProp}> : 2</Text> */}
            </View>

          </View>
          <View style={{
            width: Metrics.screenWidth, alignItems: 'center',
            justifyContent: 'center',
          }}>
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
                EDIT
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
          headerText={"BRAINWASH PROFILE"}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() => this.props.navigation.navigate("dashboard")}

        />
        <View>
          {this.renderProfile()}
        </View>
      </View>
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
export default connect(
  mapStateToProps,
  actions
)(ProfileScreeen);

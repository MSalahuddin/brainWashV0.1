// @flow
import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  Platform,
  ScrollView
} from "react-native";
import styles from "./styles";
import { Images, Metrics, Colors, Fonts } from "../../theme";
import Icon from "react-native-vector-icons/FontAwesome";

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderExperienceItem = index => {
    return (
      <View style={styles.experienceItemView}>
        <View
          style={{
            width: Metrics.ratio(60),
            height: Metrics.ratio(60),
            borderRadius: 100,
            marginHorizontal: Metrics.ratio(10),
            marginVertical: Metrics.ratio(8)
          }}
        >
          <Image
            source={Images.experienceImage}
            style={{
              width: Metrics.ratio(60),
              height: Metrics.ratio(60)
            }}
          />
        </View>
        <View style={{}}>
          <View style={styles.experienceCompanyView}>
            <Text style={styles.experienceCompanyText}>Delighted Design</Text>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: "#0f5997",
                  borderRadius: Metrics.ratio(15),
                  elevation: 8,
                  shadowColor: Colors.black,
                  shadowOffset: {
                    width: 0,
                    height: 1
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,
                  marginLeft: Metrics.ratio(10),
                  justifyContent: "center"
                },
                index === 2 && { backgroundColor: "#b4b4b4" }
              ]}
            >
              <Text
                style={{
                  marginHorizontal: Metrics.ratio(10),
                  color: "white",
                  fontFamily: Fonts.type.regular,
                  fontSize: Metrics.ratio(10)
                }}
              >
                {index === 2 ? "UNVERIFIED" : "VERIFIED"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: Fonts.type.regular,
              fontSize: Metrics.ratio(12),
              color: "black"
            }}
          >
            Sr. UX Designer
          </Text>
          <Text
            style={{
              fontFamily: Fonts.type.regular,
              fontSize: Metrics.ratio(12),
              color: "#b4b4b4"
            }}
          >
            Aug 2018-Current
          </Text>
        </View>
      </View>
    );
  };

  renderEducationItem = () => {
    return (
      <View style={styles.experienceItemView}>
        <View
          style={{
            width: Metrics.ratio(60),
            height: Metrics.ratio(60),
            borderRadius: 100,
            marginHorizontal: Metrics.ratio(10),
            marginVertical: Metrics.ratio(8),
            backgroundColor: "#b4b5b5",
            elevation: 4,
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
          }}
        >
          <Image
            source={Images.experienceImage}
            style={{
              width: Metrics.ratio(60),
              height: Metrics.ratio(60)
            }}
          />
        </View>
        <View style={{}}>
          <View style={styles.experienceCompanyView}>
            <Text style={styles.experienceCompanyText}>
              The University of Georgia
            </Text>
          </View>
          <Text
            style={{
              fontFamily: Fonts.type.regular,
              fontSize: Metrics.ratio(12),
              color: "black"
            }}
          >
            Post graduate diploma in multimedia
          </Text>
          <Text
            style={{
              fontFamily: Fonts.type.regular,
              fontSize: Metrics.ratio(12),
              color: "#b4b4b4"
            }}
          >
            2013 - 2017
          </Text>
        </View>
      </View>
    );
  };

  renderExperienceItemSeperator = () => {
    return <View style={styles.experienceListSeperator}></View>;
  };

  render() {
    return (
      <ImageBackground
        source={Images.backgroundImage}
        style={styles.mainContainer}
      >
        <View style={styles.headerView}>
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>MY PROFILE</Text>
          </View>
          <View style={styles.headerIconView}>
            <Image
              source={Images.pencilIcon}
              style={{ width: Metrics.ratio(20), height: Metrics.ratio(20) }}
            />
          </View>
        </View>

        <View style={styles.bodyView}>
          <Image
            style={{
              position: "absolute",
              width: Metrics.ratio(110),
              height: Metrics.ratio(110),
              borderRadius: 100,
              backgroundColor: "transparent",
              marginTop: Metrics.ratio(-55),
              marginLeft: Metrics.screenWidth * 0.35,
              elevation: 8
            }}
            source={Images.profilePicture}
          />

          <View style={styles.profileNameView}>
            <Text style={styles.profileNameText}>Jenny Yoo</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={Images.locationIcon}
                style={{
                  width: Metrics.ratio(18),
                  height: Metrics.ratio(18),
                  marginRight: Metrics.ratio(5)
                }}
              />
              <Text style={styles.profilelocationText}>Atlanta, Georgia</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.experienceListView}>
              <Text
                style={{
                  fontSize: Metrics.ratio(16),
                  color: "black",
                  fontFamily: Fonts.type.demibold,
                  marginTop: Metrics.ratio(8),
                  marginLeft: Metrics.ratio(12)
                }}
              >
                Experience
              </Text>
              {this.renderExperienceItem()}
              {this.renderExperienceItemSeperator()}
              {this.renderExperienceItem(2)}
              {this.renderExperienceItemSeperator()}
              {this.renderExperienceItem()}
            </View>
            <View style={styles.educationListView}>
              <Text
                style={{
                  fontSize: Metrics.ratio(16),
                  color: "black",
                  fontFamily: Fonts.type.demibold,
                  marginTop: Metrics.ratio(8),
                  marginLeft: Metrics.ratio(12)
                }}
              >
                Education
              </Text>
              {this.renderEducationItem()}
              {this.renderExperienceItemSeperator()}
              {this.renderEducationItem()}
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              width: Metrics.ratio(60),
              height: Metrics.ratio(60),
              backgroundColor: "#0f5997",
              borderRadius: 100,

              justifyContent: "center",
              alignItems: "center",
              bottom: Metrics.ratio(8),
              right: Metrics.ratio(10),
              elevation: 10
            }}
          >
            <Image
              source={Images.plusIcon}
              style={{ width: Metrics.ratio(25), height: Metrics.ratio(25) }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

// const mapStateToProps = state => ({ login: state.login });

// const actions = { login_user };

// export default connect(
//   mapStateToProps,
//   actions
// )(LoginScreen);

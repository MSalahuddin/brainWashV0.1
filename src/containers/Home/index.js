// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './styles';
import {Header} from '../../components';
import {Fonts, Metrics, Images} from '../../theme';
import DatePicker from 'react-native-datepicker';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        source={Images.main}
        // resizeMode = 'contain'
        resizeMethod="auto"
        // resizeMethod = 'auto'
        resizeMode="cover"
        style={styles.headerbgimage}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <View
              style={[
                styles.menuIcon,
                Platform.OS === 'ios' && {marginTop: Metrics.ratio(30)},
              ]}>
              <Image source={Images.menu} />
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: Metrics.screenWidth,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.logoContainer}>
              <Image
                source={Images.logo}
                style={{
                  width: Metrics.ratio(175),
                  height: Metrics.ratio(56),
                  marginBottom: Metrics.ratio(15),
                  alignContent: 'center',
                }}
                resizeMethod="auto"
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
class HomeCubes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubes: [],
    };
  }
  componentDidMount() {
    this.setState({cubes: this.props.cubes});
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: Metrics.ratio(10),
          marginBottom: Metrics.ratio(10),
        }}>
        <View style={styles.boxlistleft}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(this.props.cubes[0].screen);
              }}>
              <View style={styles.boxleft}>
                <View style={styles.boxImgcontainer}>
                  <Image
                    style={styles.boxImage}
                    source={this.props.cubes[0].icon}
                  />
                </View>
                <View style={styles.boxTextcontainer}>
                  <Text style={styles.boxText}>{this.props.cubes[0].item}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(this.props.cubes[1].screen);
              }}>
              <View style={styles.boxleft}>
                <View style={styles.boxImgcontainer}>
                  <Image
                    style={styles.boxImage}
                    source={this.props.cubes[1].icon}
                  />
                </View>
                <View style={styles.boxTextcontainer}>
                  <Text style={styles.boxText}>{this.props.cubes[1].item}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.navigate(this.props.cubes[2].screen);
              }}>
              <View style={styles.boxleftEnd}>
                <View style={styles.boxImgcontainer}>
                  <Image
                    style={styles.boxImage}
                    source={this.props.cubes[2].icon}
                  />
                </View>
                <View style={styles.boxTextcontainer}>
                  <Text style={styles.boxText}>{this.props.cubes[2].item}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxlistright}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(this.props.cubes[3].screen);
              }}>
              <View style={styles.boxright}>
                <View style={styles.boxImgcontainer}>
                  <Image
                    style={styles.boxImage}
                    source={this.props.cubes[3].icon}
                  />
                </View>
                <View style={styles.boxTextcontainer}>
                  <Text style={styles.boxText}>{this.props.cubes[3].item}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(this.props.cubes[4].screen);
              }}>
              <View style={styles.boxright}>
                <View style={styles.boxImgcontainer}>
                  <Image
                    style={styles.boxImage}
                    source={this.props.cubes[4].icon}
                  />
                </View>
                <View style={styles.boxTextcontainer}>
                  <Text style={styles.boxText}>{this.props.cubes[4].item}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.navigate(this.props.cubes[5].screen);
              }}>
              <View style={styles.boxrightEnd}>
                <View style={styles.boxImgcontainer}>
                  <Image
                    style={styles.boxImage}
                    source={this.props.cubes[5].icon}
                  />
                </View>
                <View style={styles.boxTextcontainer}>
                  <Text style={styles.boxText}>{this.props.cubes[5].item}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const boxuser = [
      {item: 'Find a Wash Now', icon: Images.washing, screen: 'findwashScreen'},
      {
        item: 'Wash History',
        icon: Images.wash_history,
        screen: 'WasherhistoryScreen',
      },
      {item: 'Payment', icon: Images.payment, screen: 'findwashScreen'},
      {
        item: 'Laundry Status',
        icon: Images.laudary_status,
        screen: 'userstatusScreen',
      },
      {
        item: 'Edit Profile',
        icon: Images.edit_profile,
        screen: 'ProfileScreen',
      },
      {
        item: 'Check Scholarships',
        icon: Images.scholarship,
        screen: 'userstatusScreen',
      },
    ];

    return (
      <View style={styles.container}>
        <HeaderComponent {...this.props} />
        {/* <Header
          headerText={"ADD EMPLOYMENT"}
          leftIcon={"chevron-left"}
          leftBtnPress={() => { }}
          rightIcon={"plus"}
          rightBtnPress={() => {
            this.setState({ isAddAgency: true });
          }}
          rightIconStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
        /> */}
        {/* <View
          style={{
            width: Metrics.screenWidth * 0.95,
            marginLeft: Metrics.screenWidth * 0.025,
            borderRadius: Metrics.ratio(10),
            marginTop: Metrics.ratio(10),
            marginBottom: Metrics.ratio(10),
            paddingVertical: Metrics.ratio(20),
            backgroundColor: "white",
            elevation: 8
          }}
        >

        </View> */}
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{
            // marginBottom: Metrics.ratio(40)
            }}>
          <HomeCubes {...this.props} cubes={boxuser} />
          <TouchableOpacity
            style={styles.customerButtonView}
            onPress={() => console.log('')}>
            <Text
              style={{
                color: 'black',
                fontSize: Metrics.ratio(14),
                fontFamily: Fonts.type.demibold,
              }}>
              Be the Customer
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(HomeScreen);

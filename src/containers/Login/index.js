// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import configureStore from '../../store';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';
import SpinnerLoader from '../../components/spinner';
import styles from './styles';
import {Metrics, Images, Fonts} from '../../theme';
import * as storage from 'redux-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {request as login_request} from '../../actions/Login';

import {updateUser, removeUser} from '../../actions/userAction';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@demo.edu',
      password: 'A1234567',
      isloading: false,
      showpassword: true,
      device_token: 'asdfghjkl122423534525435435423514124214',
      device_type: '',
      validationError: {emailErr: false, passErr: false},
      error: {emailErr: false, passErr: false},
    };
  }
  componentDidMount() {
    // console.log("asasaaaaaaaaaaaaaaaaaaaa",AsyncStorage.getItem("User"));
    this.setState({device_type: Platform.OS});
    this.getpermission();
    // this.props.navigation.navigate('dashboard');
  }
  getpermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.gettoken();
          // user has permissions
        } else {
          // user doesn't have permission
        }
      });
  };
  gettoken = async () => {
    const fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      this.setState({device_token: fcmToken});
      // console.log(this.state)

      // user has a device token
    } else {
      // user doesn't have a device token yet
    }
  };
  _storeUserdata = async user => {
    console.log('ye raha user', user.user);
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(user));
      // this.props.updateUser(user)
    } catch (e) {
      // saving error
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        console.log('asasassa', JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };
  componentWillReceiveProps(nextProps) {
    // console.log('nextttttttttt',nextProps)
    if (nextProps.login) {
      if (
        !nextProps.login.failure &&
        !nextProps.login.isFetching &&
        nextProps.login.data.data &&
        nextProps.login.data.data.user.access_token
      ) {
        this.setState({isloading: false});

        this._storeUserdata(nextProps.login.data.data);
        // setInterval(() => {
        this.getData();
        this.props.updateUser(nextProps.login.data.data);
        console.log('=========> store', configureStore().getState());
        // }, 3000);

        // AsyncStorage.setItem('User', nextProps.login.data.data);
        // this.props.navigation.navigate("dashboard");
      } else if (nextProps.login.failure) {
        this.setState({isloading: false});
      }
    }
  }

  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  onChangeEmail = text => {
    this.setState({email: text});
  };

  onChangePassword = text => {
    this.setState({password: text});
  };

  handleLogin = () => {
    const {email, password, device_token, device_type} = this.state;
    var emailExtension;

    if (email == '' || email == ' ') {
      this.setState({validationError: {emailErr: true, passErr: false}});
      setTimeout(() => {
        this.setState({validationError: {emailErr: false, passErr: false}});
      }, 3000);
    } else if (password == '' || password == ' ' || password.length < 6) {
      this.setState({validationError: {emailErr: false, passErr: true}});
      setTimeout(() => {
        this.setState({validationError: {emailErr: false, passErr: false}});
      }, 3000);
    } else {
      var emaila = email.indexOf('@');
      // var emaildot = email.indexOf('.');
      // console.log(emaila, emaildot);
      // if (emaildot > emaila) {
      //   emailExtension = email.slice(emaila + 1, emaildot);
      //   console.log(emaila, emaildot, emailExtension);
      // }
      // else if (emailExtension) {
      this.setState({isloading: true});
      let payload = {email, password, device_token, device_type};
      this.props.login_request(payload);

      // this.props.navigation.navigate('dashboard');
      // console.log(email, "eeeeeeeeeeeeeeeeeeeeeeee");
      // console.log(password, "passwordpasswordpassword");

      // }
    }
  };

  onClickEyeIcon = () => {
    if (this.state.showpassword === true) {
      this.setState({showpassword: false});
    } else if (this.state.showpassword === false) {
      this.setState({showpassword: true});
    }
  };

  renderInputfield = (
    headerText,
    placeholder,
    ErrTxt,
    Iserr,
    onChangeText,
    image,
    rightIcon,
    onRightIconClick,
  ) => {
    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: Metrics.ratio(5),
              width: Metrics.screenWidth * 0.9,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: '#b4b4b4',
              marginBottom: Metrics.ratio(10),
            },
            Platform.OS === 'ios' && {marginVertical: Metrics.ratio(8)},
          ]}>
          <Image
            source={image}
            style={[
              {
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
                marginTop: Metrics.ratio(6),
              },
              Platform.OS === 'ios' && {marginBottom: Metrics.ratio(7)},
            ]}
          />
          {/* <Icon style={{}} size={25} color="#0f5997" name={"user"} /> */}
          <TextInput
            style={styles.inputField}
            placeholderTextColor="#b4b4b4"
            secureTextEntry={rightIcon ? this.state.showpassword : false}
            placeholder={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
          {rightIcon && (
            <TouchableOpacity
              style={{position: 'absolute', right: Metrics.ratio(0)}}
              onPress={() => onRightIconClick()}>
              <Image
                source={this.state.showpassword ? Images.view : Images.hide}
              />
            </TouchableOpacity>
          )}
        </View>
        {Iserr && (
          <View>
            <Text style={{color: 'red'}}>**{ErrTxt}</Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <ImageBackground
        source={Images.loginBackground}
        // resizeMode = 'contain'
        resizeMethod="auto"
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          {/* <View style={styles.headerView}>
          <Image
            source={Images.LoginHeaderIcon}
            style={{
              width: Metrics.ratio(20),
              height: Metrics.ratio(20),
              marginRight: Metrics.ratio(5)
            }}
          />
          <Text style={styles.headerText}>LOGIN</Text>
        </View> */}
          {/* <ScrollView keyboardShouldPersistTaps="always"> */}
          <KeyboardAwareScrollView>
            <View style={styles.bodyView}>
              <View
                style={{
                  width: Metrics.screenWidth * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.logo}
                  style={{
                    width: Metrics.ratio(175),
                    height: Metrics.ratio(56),
                    marginBottom: Metrics.ratio(15),
                  }}
                  resizeMethod="auto"
                  resizeMode="cover"
                />
              </View>
              <View style={styles.headerView}>
                <Text style={styles.headerText}>SIGN IN</Text>
              </View>
              {this.renderInputfield(
                'EMAIL',
                'Student Email (.edu)',
                'Email Required',
                this.state.validationError.emailErr,
                this.onChangeEmail,
                Images.emailIcon,
              )}
              {this.renderInputfield(
                'PASSWORD',
                'Enter Password',
                'Password Required length Should be more than 5',
                this.state.validationError.passErr,
                this.onChangePassword,
                Images.passwordIcon,
                Images.passwordIcon,
                this.onClickEyeIcon,
              )}
              <TouchableOpacity
                onPress={() => {
                  this.handleLogin();
                }}
                style={styles.submitButtonView}>
                {/* <Image
              source={Images.submitButtonIcon}
              style={{
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
                marginRight: Metrics.ratio(5),
                marginTop: Metrics.ratio(3)
              }}
            /> */}
                <Text
                  style={{
                    color: 'black',
                    fontSize: Metrics.ratio(16),
                    fontFamily: Fonts.type.demibold,
                  }}>
                  LOGIN
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  width: Metrics.screenWidth * 0.9,
                  justifyContent: 'center',
                  marginTop: Metrics.ratio(11),
                }}>
                <Text
                  style={{
                    fontSize: Metrics.ratio(11),
                    color: 'black',
                    fontFamily: Fonts.type.demibold,
                  }}>
                  FORGET PASSWORD ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('passwordScreen', {
                      screen: 'passwordScreen',
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: Metrics.ratio(11),
                      color: '#0f5997',
                      fontFamily: Fonts.type.demibold,
                    }}>
                    RESET{' '}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: Metrics.screenWidth * 0.9,
                  justifyContent: 'center',
                  marginTop: Metrics.ratio(11),
                }}>
                <Text
                  style={{
                    fontSize: Metrics.ratio(11),
                    color: 'black',
                    fontFamily: Fonts.type.demibold,
                  }}>
                  DON'T HAVE ACCOUNT ?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('registrationScreen', {
                      screen: 'registrationScreen',
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: Metrics.ratio(11),
                      color: '#0f5997',
                      fontFamily: Fonts.type.demibold,
                    }}>
                    REGISTER AS USER
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: Metrics.ratio(11),
                    color: 'black',
                    fontFamily: Fonts.type.demibold,
                  }}>
                  {' '}
                  /{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('registrationwasherScreen', {
                      screen: 'registrationwasherScreen',
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: Metrics.ratio(10),
                      color: '#0f5997',
                      fontFamily: Fonts.type.demibold,
                    }}>
                    WASHER
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* </ScrollView> */}
        </View>
        {this.renderOverlaySpinner()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
  user: state.userReducer ? state.userReducer.user : null,
});

const actions = {
  login_request,
  updateUser,
  removeUser,
};

export default connect(
  mapStateToProps,
  actions,
)(LoginScreen);

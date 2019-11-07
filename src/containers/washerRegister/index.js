// @flow
// @flow
import { connect } from "react-redux";
import React, { Component } from "react";

import moment from "moment";
import {
  Text,
  View,
  TextInput,

  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
  Platform
} from "react-native";
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import DatePicker from "react-native-datepicker";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Images, Metrics, Colors, Fonts } from "../../theme";
import { request as register_request } from '../../actions/RegisterAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SpinnerLoader from '../../components/spinner';
import { Getuniversity } from '../../config/simpleApiCall';

class RegistrationwasherScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: false,
      isloading: false,
      f_name: '',
      l_name: '',
      email: '',
      password: '',
      universities: [],
      confirmpassword: '',
      Dob: null,
      role: '5',
      name: null,
      gender: '',
      mobile: null,
      university: '',
      device_token: 'asdfghjkl122423534525435435423514124214',
      device_type: '',
      Extension: '',
      extensionErr: false,
      uniData: [
        { name: "University 1" },
        { name: "University 2" }
      ],
      onAddUni: false,
      selectedUni: null,
      error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false },
    };
  }

  componentDidMount() {
    //  console.log(Platform);
    this.setState({ device_type: Platform.OS });
    Getuniversity().then(response => {
      console.log(response)
      if (response.status === 200 && response.data && response.data.success == true && response.data.data) {
        console.log(response.data.data)
        this.setState({ universities: response.data.data })
      }
    })
    // this.getpermission();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps.register) {
      this.setState({ isloading: false })
      if (
        !nextProps.register.failure &&
        !nextProps.register.isFetching &&
        nextProps.register.data.data &&
        nextProps.register.data.data.user.access_token
      ) {
        console.log("hello")
        Alert.alert('SUCCESSFUL', 'You have been Registered successfully', [

          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        this.props.navigation.pop();
      }
    }
  }
  renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  onChangeFirstName = (e) => {
    this.setState({ f_name: e })
    this.setState({ name: this.state.f_name + " " + this.state.l_name });
  };
  onChangeLastName = (e) => {
    this.setState({ l_name: e })
    this.setState({ name: this.state.f_name + " " + this.state.l_name });
  }

  onChangeNumber = (e) => {
    this.setState({ mobile: e });
  };
  onChangeEmail = (e) => {
    this.setState({ email: e });
  };
  onChangePassword = (e) => {
    this.setState({ password: e });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({ confirmpassword: e });
  };
  onchangeDob = (e) => {
    this.setState({ Dob: e });
  };
  onchangeRole = (e) => {
    this.setState({ role: e });
  }
  onchangeGender = (e) => {
    this.setState({ gender: e });
  }

  onchangeUniversity = (e) => {
    this.setState({ university: e })
  };

  onSubmitHandle = () => {
    const { selectedUni, name, email, password, confirmpassword, Extension, university, role, gender, Dob, mobile } = this.state;
    var dotIndex = email.lastIndexOf('.')
    var emailIndex = email.length;
    var today = new Date();
    var birthDate = new Date(Dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    console.log(email.slice(dotIndex, emailIndex))
    this.setState({ Extension: email.slice(dotIndex, emailIndex) })
    if (name === null || name == " " || name.length < 3) {
      this.setState({
        error: { nameErr: true, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
      });
      setTimeout(() => {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
        });
      }, 3000);
    }
    // else if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) || email == "" || email == " ") {
    //   this.setState({
    //     error: { nameErr: false, emailErr: true, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
    //   });
    //   setTimeout(() => {
    //     this.setState({
    //       error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
    //     });
    //   }, 3000);
    // }
    else if (email != "") {
      let x = email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        this.setState({
          error: { nameErr: false, emailErr: true, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else if (Extension !== ".edu") {
        this.setState({ extensionErr: true })
        setTimeout(() => {
          this.setState({ extensionErr: false })
        }, 3000);
      }
      else if (!mobile || mobile.length < 7) {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: true, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else if (!Dob || age < 18) {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: true, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }

      else if (!password.match('^(?=.*?[A-Z]).{8,}$')) {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: true, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else if (confirmpassword !== this.state.password) {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: true, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else if (selectedUni === null) {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: true }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else if (gender == "") {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: true, mobileErr: false, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else if (gender == "") {
        this.setState({
          error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: true, genderErr: false, mobileErr: false, unversityErr: false }
        });
        setTimeout(() => {
          this.setState({
            error: { nameErr: false, emailErr: false, passwordErr: false, cPasswordErr: false, dobErr: false, roleErr: false, genderErr: false, mobileErr: false, unversityErr: false }
          });
        }, 3000);
      }
      else {
        console.log(selectedUni, 'esllllllllllllllllll')
        name, email, password, confirmpassword, university, role, gender, Dob, mobile
        var data = {
          name: name,
          phone: mobile,
          email: email,
          password: password,
          role_id: '5',
          dob: Dob,
          password_confirmation: confirmpassword,
          device_token: this.state.device_token,
          device_type: this.state.device_type,
          gender: gender,
          university_id: selectedUni.id
        }
        this.setState({ isloading: true });
        this.props.register_request(data)
        console.log(data)
        // Alert.alert('SUCCESSFUL', 'You have been Registered successfully', [

        //   { text: 'OK', onPress: () => console.log('OK Pressed') },
        // ]);
        // this.props.navigation.navigate.pop();
      }
    }

  };
  renderStartDatepicker = () => {

    return (
      <DatePicker
        style={{ width: Metrics.ratio(200) }}
        date={this.state.Dob}
        mode="date"
        placeholder="MM-DD-YYYY"
        format="MM-DD-YYYY"
        minDate="01-05-1950"
        maxDate={moment(new Date()).format("MM-DD-YYYY")}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        style={{
          width: Metrics.screenWidth * 0.9,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "#b4b4b4"
        }}
        customStyles={{
          dateIcon: {
            // marginLeft: Metrics.ratio(-40),
            // marginBottom: Metrics.ratio(10),
            //top: Metrics.ratio(10),
            elevation: 8,
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
          },
          dateText: {
            // textAlign:"left",
            position: "absolute",
            left: Metrics.ratio(0),
            color: "#b4b4b4",
          },
          dateInput: { borderColor: "transparent" },
          placeholderText: {
            fontSize: Metrics.ratio(14),
            fontFamily: Fonts.type.regular,
            textAlign: "left",
            position: "absolute",
            left: Metrics.ratio(0),
            color: "#b4b4b4",
            marginRight: Metrics.ratio(10),
            // backgroundColor: "green"
          }
        }}
        onDateChange={date => {
          this.onchangeDob(date);
        }}
      />
    );
  };
  onClickEyeIcon = () => {
    if (this.state.showpassword === true) {
      this.setState({ showpassword: false });
    }

    else if (this.state.showpassword === false) {
      this.setState({ showpassword: true });
    }

  };

  selectDropdownItem = (el) => {
    console.log(el)
    this.setState({ selectedUni: el, onAddUni: false });
  }

  renderDropdownList = (data) => {
    return (
      <View>
        {data.map((el, index) => {
          return (
            <TouchableOpacity
              style={{
                //backgroundColor: "red",
                flex: 1,
                height: Metrics.ratio(40)
              }}
              onPress={() => {
                this.selectDropdownItem(el);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginVertical: Metrics.screenHeight * 0.01,
                  marginLeft: Metrics.screenWidth * 0.02,
                  borderBottomColor: '#b4b4b4',
                  borderBottomWidth: StyleSheet.hairlineWidth
                }}
              >
                {el.name}
              </Text>
            </TouchableOpacity>
          );

        })}
      </View>
    );
  }

  renderDropdown = data => {
    let calculatedHeightFromRecords = data && data.length * Metrics.ratio(40);
    let maximumAllowedHeight = Metrics.ratio(40) * 3;
    return (
      <View
        style={{
          width: Metrics.screenWidth * 0.865,
          height:
            calculatedHeightFromRecords < maximumAllowedHeight
              ? calculatedHeightFromRecords
              : maximumAllowedHeight,
          marginHorizontal: Metrics.ratio(25),
          borderBottomLeftRadius: Metrics.ratio(5),
          borderBottomRightRadius: Metrics.ratio(5),
          backgroundColor: "white",
          elevation: 5
        }}
      >
        <ScrollView>
          {data && data && data.length > 0 && this.renderDropdownList(data)}
        </ScrollView>
      </View>
    );
  };

  renderDropdownContainer = (headerText, placeholder, errTxt, isErr, image) => {
    const { onAddUni, specificAgencyWorker, selectedUni, universities } = this.state;
    return (
      <View >
        <TouchableOpacity onPress={() => this.setState({ onAddUni: true })}
          style={{
            width: Metrics.screenWidth * 0.9,
            marginHorizontal: Metrics.screenWidth * 0.025
          }}>
          <Text style={{
            color: "black",
            fontSize: Metrics.ratio(14),
            fontFamily: Fonts.type.demibold
          }}>{headerText}</Text>
          <View
            style={[{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: Metrics.ratio(5),
              width: Metrics.screenWidth * 0.9,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: "#b4b4b4",
              marginBottom: Metrics.ratio(10)
            }, Platform.OS === "ios" && { marginVertical: Metrics.ratio(8) }]}
          >
            <Image
              source={image}
              style={[{
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
                marginTop: Metrics.ratio(6)
              }, Platform.OS === "ios" && { marginBottom: Metrics.ratio(7) }]}
            />
            <Text
              style={{
                fontSize: Metrics.ratio(16),
                color: "#b4b4b4"
              }}
            >
              {selectedUni
                ? selectedUni.name
                : "University Attending"}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              width: Metrics.ratio(44),
              height: Metrics.ratio(44),
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.setState({ onAddUni: true})}
          >
            <Icon
              style={{ marginLeft: Metrics.ratio(20) }}
              size={20}
              color="grey"
              name={"chevron-down"}University Attending
            />
          </TouchableOpacity> */}
        </TouchableOpacity>
        {onAddUni &&
          universities.length !== 0 &&
          this.renderDropdown(universities)}
        {isErr && <View><Text style={{ color: 'red' }} >**{errTxt}</Text></View>}
      </View>
    );
  };

  renderInputfield = (headerText, placeholder, ErrTxt, Iserr, onChangeText, image, rightIcon, onRightIconClick) => {

    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={[{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.9,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#b4b4b4",
            marginBottom: Metrics.ratio(10)
          }, Platform.OS === "ios" && { marginVertical: Metrics.ratio(8) }]}
        >
          <Image
            source={image}
            style={[{
              width: Metrics.ratio(20),
              height: Metrics.ratio(20),
              marginTop: Metrics.ratio(6)
            }, Platform.OS === "ios" && { marginBottom: Metrics.ratio(7) }]}
          />
          {/* <Icon style={{}} size={25} color="#0f5997" name={"user"} /> */}
          {rightIcon && <TextInput
            style={styles.inputField}
            placeholderTextColor="#b4b4b4"
            secureTextEntry={true}
            placeholder={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />}
          {!rightIcon && <TextInput
            style={styles.inputField}
            placeholderTextColor="#b4b4b4"
            placeholder={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />}
          {/* {rightIcon && <TouchableOpacity  style={{position:"absolute",right:Metrics.ratio(0)}} onPress={() => onRightIconClick()}>
            <Image source={this.state.showpassword ? Images.view : Images.hide} />
          </TouchableOpacity>} */}
        </View>
        {Iserr && <View><Text style={{ color: 'red' }} >**{ErrTxt}</Text></View>}

      </View>
    );
  };
  renderNameInputfield = (headerText, placeholder, ErrTxt, Iserr, onChangeText, image, rightIcon, onRightIconClick) => {

    return (
      <View style={styles.inputnameFieldView}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={[{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.43,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#b4b4b4",
            marginBottom: Metrics.ratio(10)
          }, Platform.OS === "ios" && { marginVertical: Metrics.ratio(8) }]}
        >
          <Image
            source={image}
            style={[{
              width: Metrics.ratio(20),
              height: Metrics.ratio(20),
              marginTop: Metrics.ratio(6)
            }, Platform.OS === "ios" && { marginBottom: Metrics.ratio(7) }]}
            resizeMethod='auto'
            resizeMode='cover'
          />
          {/* <Icon style={{}} size={25} color="#0f5997" name={"user"} /> */}
          {rightIcon && <TextInput
            style={styles.inputnameField}
            placeholderTextColor="#b4b4b4"
            secureTextEntry={true}
            placeholder={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />}
          {!rightIcon && <TextInput
            style={styles.inputnameField}
            placeholderTextColor="#b4b4b4"
            placeholder={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />}
          {/* {rightIcon && <TouchableOpacity  style={{position:"absolute",right:Metrics.ratio(0)}} onPress={() => onRightIconClick()}>
            <Image source={this.state.showpassword ? Images.view : Images.hide} />
          </TouchableOpacity>} */}
        </View>
        {Iserr && <View><Text style={{ color: 'red' }} >**{ErrTxt}</Text></View>}

      </View>
    );
  };
  renderNumberInputfield = (headerText, placeholder, ErrTxt, Iserr, onChangeText, image, rightIcon, onRightIconClick) => {
    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={[{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.9,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#b4b4b4",
            marginBottom: Metrics.ratio(10)
          }, Platform.OS === "ios" && { marginVertical: Metrics.ratio(8) }]}
        >
          <Image
            source={image}
            style={[{
              width: Metrics.ratio(20),
              height: Metrics.ratio(20),
              marginTop: Metrics.ratio(6)
            }, Platform.OS === "ios" && { marginBottom: Metrics.ratio(7) }]}
          />
          {/* <Icon style={{}} size={25} color="#0f5997" name={"user"} /> */}
          <TextInput
            style={styles.inputField}
            placeholderTextColor="#b4b4b4"
            placeholder={placeholder}
            keyboardType={'numeric'}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
          {/* {rightIcon && <TouchableOpacity  style={{position:"absolute",right:Metrics.ratio(0)}} onPress={() => onRightIconClick()}>
            <Image source={this.state.showpassword ? Images.view : Images.hide} />
          </TouchableOpacity>} */}
        </View>
        {Iserr && <View><Text style={{ color: 'red' }} >*{ErrTxt}</Text></View>}
      </View>
    );
  };
  renderRadio = (headerText, placeholder1, placeholder2, ErrTxt, Iserr, onChangeRadio) => {
    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.9,
            // borderBottomWidth: StyleSheet.hairlineWidth,
            // borderBottomColor: "#b4b4b4",
            marginBottom: Metrics.ratio(10)
          }}
        >
          <RadioGroup
            color="#ff7ee7"
            style={styles.radioGroup}
            onSelect={(index, value) => {
              onChangeRadio(value)
            }}
          >
            <RadioButton value={placeholder1} color="#b4b4b4" style={styles.radioOptions} >
              <Text>{placeholder1}</Text>
            </RadioButton>


            <RadioButton value={placeholder2} color="#b4b4b4" style={styles.radioOptions}>
              <Text>{placeholder2}</Text>
            </RadioButton>
          </RadioGroup>
        </View>
        {Iserr && <View><Text style={{ color: 'red' }} >**{ErrTxt}</Text></View>}
      </View>
    );
  };
  render() {
    return (
      <ImageBackground
        source={Images.loginBackground}
        // resizeMode = 'contain'
        resizeMethod='auto'
        style={{ width: '100%', height: '100%' }}
      >
        {/* <View style={styles.container}> */}

        {/*  */}
        {/* <ScrollView keyboardShouldPersistTaps="always"> */}
        <KeyboardAwareScrollView>

          <View style={[styles.bodyView, Platform.OS === "ios" && { marginTop: Metrics.ratio(30) }]}>
            <View style={{ width: Metrics.screenWidth * 0.95, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={Images.logo}
                style={{
                  width: Metrics.ratio(175),
                  height: Metrics.ratio(56),
                  marginBottom: Metrics.ratio(15)
                }}
                resizeMethod='auto'
                resizeMode='cover'
              />
            </View>
            <View style={styles.headerView}>

              <Text style={styles.headerText}>SIGN UP</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: Metrics.ratio(1) }}>
                {this.renderNameInputfield(
                  "FIRST NAME",
                  "First Name",
                  "First Name Required must be contain atleast 4 words",
                  this.state.error.nameErr,
                  this.onChangeFirstName,
                  Images.firstNameIcon
                )}
              </View>
              <View style={{ marginLeft: Metrics.ratio(25) }}>
                {this.renderNameInputfield(
                  "LAST NAME",
                  "Last Name",
                  "Last Name Required must be contain atleast 4 words",
                  this.state.error.nameErr,
                  this.onChangeLastName,
                  Images.firstNameIcon
                )}
              </View>
            </View>
            {this.renderInputfield(
              "EMAIL",
              "Student Email (.edu)",
              "email Required",
              this.state.error.emailErr,
              this.onChangeEmail,
              Images.emailIcon
            )}
            {this.state.extensionErr && <View><Text style={{ color: 'red' }} >*Invalid Email (demo@example.edu)</Text></View>}
            {this.renderNumberInputfield(
              "MOBILE NUMBER",
              "Enter Mobile Number",
              "mobile No Required",
              this.state.error.mobileErr,
              this.onChangeNumber,
              Images.mobileNumber
            )}
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: Metrics.ratio(10), marginBottom: Metrics.ratio(5) }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: Metrics.ratio(14),
                    fontFamily: Fonts.type.demibold
                  }}
                >
                  DATE OF BIRTH
             </Text>
                {this.renderStartDatepicker()}
                {this.state.error.dobErr && <View><Text style={{ color: 'red' }} >*You are not allowed to register without valid date of birth</Text></View>}
              </View>
            </View>
            {/* {this.renderInputfield(
             "DATE OF BIRTH",
             "DD/MM/YYYY",
             "date",
             this.onChangeNumber,
             Images.calender
           )} */}
            {this.renderInputfield(
              "PASSWORD",
              "Enter Password",
              "Must be at least 8 characters and include 1 capital letter",
              this.state.error.passwordErr,
              this.onChangePassword,
              Images.passwordIcon,
              Images.passwordIcon,
              this.onClickEyeIcon
            )}
            {this.renderInputfield(
              "CONFIRM PASSWORD",
              "Confirm Password",
              "password not matched",
              this.state.error.cPasswordErr,
              this.onChangeConfirmPassword,
              Images.passwordIcon,
              Images.passwordIcon,
              this.onClickEyeIcon
            )}
            {/* {this.renderInputfield(
              "UNIVERSITY ATTENDING",
              "University Attending",
              "Enter University Name",
              this.state.error.unversityErr,
              this.onchangeUniversity,
              Images.Scholar
            )} */}
            {this.renderDropdownContainer(
              "UNIVERSITY ATTENDING",
              "University Attending",
              "Enter University Name",
              this.state.error.unversityErr,
              Images.Scholar)
            }

            {this.renderRadio(
              "GENDER",
              "MALE",
              "FEMALE",
              "Select Gender",
              this.state.error.genderErr,
              this.onchangeGender
            )}
            {/* {this.renderRadio(
             "LOGIN AS",
             "USER",
             "WASHER",
             "Select Role",
             this.state.error.roleErr,
             this.onchangeRole
           )} */}
            <TouchableOpacity style={styles.submitButtonView} onPress={() => this.onSubmitHandle()}>

              <Text
                style={{
                  color: "black",
                  fontSize: Metrics.ratio(14),
                  fontFamily: Fonts.type.demibold
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                width: Metrics.screenWidth * 0.9,
                justifyContent: "center",
                marginTop: Metrics.ratio(10)
              }}
            >
              <Text
                style={{
                  fontSize: Metrics.ratio(13),
                  color: "black",
                  fontFamily: Fonts.type.demibold
                }}
              >
                ALREADY ACCOUNT ?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("loginScreen", {
                    screen: "loginScreen"
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: Metrics.ratio(13),
                    color: "#0f5997",
                    fontFamily: Fonts.type.demibold
                  }}
                >
                  LOGIN{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* </ScrollView> */}
        {/* </View> */}
        {this.renderOverlaySpinner()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.register
});

const actions = { register_request };

export default connect(
  mapStateToProps,
  actions
)(RegistrationwasherScreen);


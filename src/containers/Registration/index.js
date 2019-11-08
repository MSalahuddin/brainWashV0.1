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
import RNPickerSelect from 'react-native-picker-select';

class RegistrationScreen extends Component {
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
      role: '4',
      name: null,
      gender: '',
      mobile: null,
      university: '',
      device_token: 'asdfghjkl122423534525435435423514124214',
      device_type: '',
      Extension: '',
      extensionErr: false,
      erroroccur: false,
      onAddUni: false,
      selectedUni: null,
      nameErr: false,
      emailErr: false,
      passwordErr: false,
      cPasswordErr: false,
      dobErr: false,
      roleErr: false,
      genderErr: false,
      mobileErr: false,
      unversityErr: false

    };
  }

  componentDidMount() {
    //  console.log(Platform);
    this.setState({ device_type: Platform.OS });
    Getuniversity().then(response => {
      console.log(response)
      if (response.status === 200 && response.data && response.data.success == true && response.data.data) {
        console.log(response.data.data)
        var data = response.data.data;
        var array = [];
        data.map((v, i) => {
          var data = { label: v.name, value: v.id }
          array.push(data);
          console.log("asasasas", v)
        })
        this.setState({ universities: array })
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
    const { selectedUni, name, email, password, confirmpassword, university, role, gender, Dob, mobile } = this.state;
    console.log(selectedUni)
    var dotIndex = email.lastIndexOf('.')
    var emailIndex = email.length;
    var today = new Date();
    var birthDate = new Date(Dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    console.log(email.slice(dotIndex, emailIndex))

    if (name === null || name == " " || name.length < 3) {
      this.setState({
        nameErr: true,
      });
      setTimeout(() => {
        this.setState({
          nameErr: false
        })
      }, 3000);

    }
    if (email === "") {
      console.log("email error")
      this.setState({
        emailErr: true
      });
      setTimeout(() => {
        this.setState({
          emailErr: false
        });
      }, 3000);
    }
    if (email != "") {
      var extension = email.slice(dotIndex, emailIndex);

      let x = email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        this.setState({
          emailErr: true
        });
        setTimeout(() => {
          this.setState({
            emailErr: false
          });
        }, 3000);

      }
      if (extension !== ".edu") {
        console.log("edu")
        this.setState({ extensionErr: true })
        setTimeout(() => {
          this.setState({ extensionErr: false })
        }, 3000);
      }

    }

    if (!mobile || mobile.length < 7) {
      this.setState({
        mobileErr: true
      });
      setTimeout(() => {
        this.setState({
          mobileErr: false
        });
      }, 3000);
    }
    if (!Dob || age < 18) {
      this.setState({
        dobErr: true
      });
      setTimeout(() => {
        this.setState({
          dobErr: false
        });
      }, 3000);
    }

    if (!password.match('^(?=.*?[A-Z]).{8,}$')) {
      this.setState({
        passwordErr: true
      });
      setTimeout(() => {
        this.setState({
          passwordErr: false
        });
      }, 3000);
    }
    if (confirmpassword !== this.state.password) {
      this.setState({
        cPasswordErr: true
      });
      setTimeout(() => {
        this.setState({
          cPasswordErr: false
        });
      }, 3000);
    }
    if (selectedUni === null) {
      this.setState({
        unversityErr: true
      });
      setTimeout(() => {
        this.setState({
          unversityErr: false
        });
      }, 3000);
    }
    if (gender == "") {
      this.setState({
        genderErr: true
      });
      setTimeout(() => {
        this.setState({
          genderErr: false
        });
      }, 3000);
    }
    setTimeout(() => {
      if (this.state.cPasswordErr === false && this.state.passwordErr == false && this.state.nameErr === false && this.state.emailErr === false && this.state.unversityErr === false && this.state.genderErr === false && this.state.mobileErr == false) {
        console.log(selectedUni, 'esllllllllllllllllll')
        name, email, password, confirmpassword, university, role, gender, Dob, mobile
        var data = {
          name: name,
          phone: mobile,
          email: email,
          password: password,
          role_id: '4',
          dob: Dob,
          password_confirmation: confirmpassword,
          device_token: this.state.device_token,
          device_type: this.state.device_type,
          gender: gender,
          university_id: selectedUni
        }
        this.setState({ isloading: true });
        this.props.register_request(data)
        console.log(data)

      }
      else {
        console.log("koi error h", this.state.nameErr, 'emai', this.state.emailErr, 'uni', this.state.unversityErr, 'gender', this.state.genderErr, "mobile", this.state.mobileErr)
      }
    }, 100)
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

  
  renderDropDownList = (

    headerText,
    placeholder,
    ErrTxt,
    Iserr,
    image,
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
            Platform.OS === 'ios' && { marginVertical: Metrics.ratio(8) },
          ]}>
          <Image
            source={image}
            style={[
              {
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
                marginTop: Metrics.ratio(6),
              },
              Platform.OS === 'ios' && { marginBottom: Metrics.ratio(7) },
            ]}
          />
          {/* <Icon style={{}} size={25} color="#0f5997" name={"user"} /> */}
          <RNPickerSelect
            onValueChange={value => {
              console.log(value, 'valllllsjkdsahkdjh');
              this.setState({ selectedUni: value })

            }}
            items={this.state.universities}
            placeholder={{
              label: 'Select University',
              value: null,
            }}
            style={{
              placeholder: {
                fontSize: Metrics.ratio(16),
                color: '#b4b4b4',
                fontFamily: Fonts.type.regular,
                marginTop: Metrics.ratio(15),
              },
              inputIOS: {
                marginTop: Metrics.ratio(15),
                fontFamily: Fonts.type.regular,
                fontSize: Metrics.ratio(16),
                color: '#b4b4b4',
              },
              viewContainer: {
                height: 20,
                width: Metrics.screenWidth * 0.8,
                // paddingLeft: Metrics.ratio(15),
                marginBottom:Metrics.ratio(40)
              },
            }}
          />
          {/* <Picker
            selectedValue={this.state.Nofofbags}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => {
              var total = 10.99;
              if (itemValue == '1') {
                total = total + 1;
                this.setState({ Nofofbags: itemValue, total: total });
              } else if (itemValue == '2') {
                total = total + 7.99 + 1;
                this.setState({ Nofofbags: itemValue, total: total });
              }
              console.log(this.state.Nofofbags);
            }}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
          </Picker> */}
        </View>
        {Iserr && (
          <View>
            <Text style={{ color: 'red' }}>**{ErrTxt}</Text>
          </View>
        )}
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
                  this.state.nameErr,
                  this.onChangeFirstName,
                  Images.firstNameIcon
                )}
              </View>
              <View style={{ marginLeft: Metrics.ratio(25) }}>
                {this.renderNameInputfield(
                  "LAST NAME",
                  "Last Name",
                  "Last Name Required must be contain atleast 4 words",
                  this.state.nameErr,
                  this.onChangeLastName,
                  Images.firstNameIcon
                )}
              </View>
            </View>
            {this.renderInputfield(
              "EMAIL",
              "Student Email (.edu)",
              "email Required",
              this.state.emailErr,
              this.onChangeEmail,
              Images.emailIcon
            )}
            {this.state.extensionErr && <View><Text style={{ color: 'red' }} >*Invalid Email (demo@example.edu)</Text></View>}
            {this.renderNumberInputfield(
              "MOBILE NUMBER",
              "Enter Mobile Number",
              "mobile No Required",
              this.state.mobileErr,
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
                {this.state.dobErr && <View><Text style={{ color: 'red' }} >*You are not allowed to register without valid date of birth</Text></View>}
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
              this.state.passwordErr,
              this.onChangePassword,
              Images.passwordIcon,
              Images.passwordIcon,
              this.onClickEyeIcon
            )}
            {this.renderInputfield(
              "CONFIRM PASSWORD",
              "Confirm Password",
              "password not matched",
              this.state.cPasswordErr,
              this.onChangeConfirmPassword,
              Images.passwordIcon,
              Images.passwordIcon,
              this.onClickEyeIcon
            )}
            {/* {this.renderInputfield(
              "UNIVERSITY ATTENDING",
              "University Attending",
              "Enter University Name",
              this.state.unversityErr,
              this.onchangeUniversity,
              Images.Scholar
            )} */}
            {/* {this.renderDropdownContainer(
              "UNIVERSITY ATTENDING",
              "University Attending",
              "Enter University Name",
              this.state.unversityErr,
              Images.Scholar)
            } */}
            {this.renderDropDownList(
              "UNIVERSITY ATTENDING",
              "University Attending",
              "Enter University Name",
              this.state.unversityErr,
              Images.Scholar)}
            {this.renderRadio(
              "GENDER",
              "MALE",
              "FEMALE",
              "Select Gender",
              this.state.genderErr,
              this.onchangeGender
            )}
            {/* {this.renderRadio(
             "LOGIN AS",
             "USER",
             "WASHER",
             "Select Role",
             this.state.roleErr,
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
)(RegistrationScreen);

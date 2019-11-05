// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  BackHandler,Alert
} from "react-native";
import styles from "./styles";
import { Metrics, Images, Fonts } from "../../theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { forgetPassword, resetPassword, VerifyresetCode } from '../../config/simpleApiCall';


class PasswordresetScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      code: '',
      emailState: true,
      codeState: false,
      passwordState: false,
      emaiErr: false,
      passwordErr: false,
      cpasswordErr: false,
      codeErr: false,
      codeValidation:''


    };
  }
  componentDidMount() {
    console.log("add event listner");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    console.log("Remove event listner");
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {

    if (this.state.emailState) {
      this.Emailbackbutton()
      return true;
    }
    else if (this.state.codeState) {
      this.otpbackbutton()
      return true;

    }
    else if (this.state.passwordState) {
      this.passwordbackbutton()
      return true;

    }
  };

  Emailbackbutton = () => {
    // this.props.navigation.navigate.pop();
    this.props.navigation.pop()
    // console.log(this.props);
  }
  otpbackbutton = () => {
    this.setState({ emailState: true, codeState: false });

  };
  passwordbackbutton = () => {
    this.setState({ codeState: true, passwordState: false });
  };

  onChangeEmail = text => {
    this.setState({ email: text });
  };

  onChangePassword = text => {
    this.setState({ password: text });
  };
  onChangeConfirmpassword = text => {
    this.setState({ confirmPassword: text });
  };
  onChangeCode = text => {
    this.setState({ code: text });
  }

  handleResetpassword = () => {
    const { email } = this.state;
    console.log(email, "eeeeeeeeeeeeeeeeeeeeeeee");

  };
  handleOtpCode = () => {
    const { email, code } = this.state;
  };
  handlePassword = () => { }

  renderInputfield = (headerText, placeholder, ErrTxt, Iserr, onChangeText, image, rightIcon, onRightIconClick) => {

    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputFieldHeaderText}>{headerText}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.9,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: "#b4b4b4",
            marginBottom: Metrics.ratio(10)
          }}
        >
          <Image
            source={image}
            style={{
              width: Metrics.ratio(20),
              height: Metrics.ratio(20),
              marginTop: Metrics.ratio(6)
            }}
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
        {Iserr && <View><Text style={{ color: 'red' }} >*{ErrTxt}</Text></View>}

      </View>
    );
  };
  renderPasswordPart = () => {
    return (
      <View>

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
          "Enter Password",
          "Password not matched",
          this.state.cpasswordErr,
          this.onChangeConfirmpassword,
          Images.passwordIcon,
          Images.passwordIcon,
          this.onClickEyeIcon
        )}
        <TouchableOpacity
          onPress={() => {
            const {password,confirmPassword,email,code} =this.state
            if(!password.match('^(?=.*?[A-Z]).{8,}$')){
              this.setState({passwordErr:true})
              setTimeout(() => {
                this.setState({passwordErr:false})
              }, 3000);
            }
            else if(confirmPassword != password){
              this.setState({cpasswordErr:true})
              setTimeout(() => {
                this.setState({cpasswordErr:false})
              }, 3000);
            }
            else{
              var body ={verification_code:code,email:email,password:password,password_confirmation:confirmPassword}
              resetPassword(body).then((response)=>{
                console.log(response)
                if(response.status == 200 && response.data && response.data.success){
                  Alert.alert('SUCCESSFUL', response.data.message, [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                    
                  ])
                  this.props.navigation.pop()
                }
              }).catch(err=>{
                Alert.alert('Error', "Something went Wrong Try again", [

                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
                this.props.navigation.pop()
              }) 
            }
            // this.handlehandleResetpassword();
          }}
          style={styles.submitButtonView}
        >

          <Text
            style={{
              color: "black",
              fontSize: Metrics.ratio(16),
              fontFamily: Fonts.type.demibold
            }}
          >
            RESET
            </Text>
        </TouchableOpacity>
      </View>

    )
  }

  renderCodePart = () => {
    return (
      <View>
        {this.renderInputfield(
          "OTP CODE",
          "Enter Otp Code",
          this.state.codeValidation,
          this.state.codeErr,
          this.onChangeCode,
          Images.emailIcon
        )}

        <TouchableOpacity
          onPress={() => {
            const {email, code} = this.state 
            var data= {verification_code:code}
            console.log("reset")
            VerifyresetCode(data).then((response)=>{
              console.log("resposne+++++++++>",response)
              console.log("resposne data +++++++++>",response.data)
              console.log("resposne success +++++++++>",response.data.success)
              console.log(response.data.data.user.email,"resposne success +++++++++>",email)
              if(response.status == 200 && response.data && response.data.success && response.data.data.user.email.toLowerCase() == email.toLowerCase()){
                Alert.alert('SUCCESSFUL', response.data.message, [

                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ])
                this.setState({ passwordState: true, codeState: false })
              }
              else{
                this.setState({codeValidation:"Enter Valid Code",codeErr:true})
                setTimeout(() => {
                  this.setState({codeErr:false})
                }, 4000);
              } 
              
            
            }).catch((err)=>{
              console.log("errrrrrrrrrrr",err.data)
              this.setState({codeValidation:err.data.message,codeErr:true})
              setTimeout(() => {
                this.setState({codeErr:false})
              }, 4000);
            })
            // this.handlehandleResetpassword();
          }}
          style={styles.submitButtonView}
        >

          <Text
            style={{
              color: "black",
              fontSize: Metrics.ratio(16),
              fontFamily: Fonts.type.demibold
            }}
          >
            VERIFY
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  renderEmailPart = () => {
    return (
      <View>
        {this.renderInputfield(
          "EMAIL",
          "Enter Email",
          "Valid email Required",
          this.state.emaiErr,
          this.onChangeEmail,
          Images.emailIcon
        )}

        <TouchableOpacity
          onPress={() => {
            // console.log("reset")
            const { email } = this.state
            if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
              this.setState({ emaiErr: true })
              setTimeout(() => {
                this.setState({ emaiErr: false })
              }, 3000);
            }
            else {
              forgetPassword(email).then((response) => {
                console.log("===>",response)
                console.log("data mojoud===>",response.data)
                console.log("status===>",response.data.data.success)
                if(response.status == 200 && response.data && response.data.success){
                  Alert.alert('SUCCESSFUL', response.data.message, [

                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ])
                  this.setState({ codeState: true, emailState: false })
                }
               else{
                this.setState({emaiErr:true})
                setTimeout(() => {
                  this.setState({emaiErr:false})
                }, 3000);
               }
              })
                .catch(err => {
                  // console.log("error")
                  // this.setState({emaiErr:true})
                  // setTimeout(() => {
                  //   this.setState({emaiErr:false})
                  // }, 3000);
                })
            }
            
            // this.handlehandleResetpassword();
          }}
          style={styles.submitButtonView}
        >

          <Text
            style={{
              color: "black",
              fontSize: Metrics.ratio(16),
              fontFamily: Fonts.type.demibold
            }}
          >
            SEND
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    return (
      <ImageBackground
        source={Images.loginBackground}
        // resizeMode = 'contain'
        resizeMethod='auto'
        style={{ width: '100%', height: '100%' }}
      >
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
          <View style={styles.bodyView}>
          <View style = {{width: Metrics.screenWidth * 0.95, justifyContent: 'center', alignItems: 'center'}}>
         <Image
                  source={Images.logo}
                  style={{
                    width: Metrics.ratio(175),
                    height: Metrics.ratio(56),
                    marginBottom: Metrics.ratio(15)
                  }}
                 resizeMethod = 'auto'
                 resizeMode = 'cover'
                />
         </View>
            <View style={styles.headerView}>

              <Text style={styles.headerText}>RESET PASSWORD</Text>


            </View>
            {this.state.emailState && this.renderEmailPart()}
            {this.state.codeState && this.renderCodePart()}
            {this.state.passwordState && this.renderPasswordPart()}

            <View
              style={{
                flexDirection: "row",
                width: Metrics.screenWidth * 0.9,
                justifyContent: "center",
                marginTop: Metrics.ratio(20)
              }}
            >
              <Text
                style={{
                  fontSize: Metrics.ratio(11),
                  color: "black",
                  fontFamily: Fonts.type.demibold
                }}
              >
                DON'T HAVE ACCOUNT ?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {

                  this.props.navigation.navigate("registrationScreen", {
                    screen: "registrationScreen"
                  });

                }}
              >
                <Text
                  style={{
                    fontSize: Metrics.ratio(11),
                    color: "#0f5997",
                    fontFamily: Fonts.type.demibold
                  }}
                >
                  REGISTER{" "}
                </Text>
              </TouchableOpacity>
            </View>

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
                  fontSize: Metrics.ratio(11),
                  color: "black",
                  fontFamily: Fonts.type.demibold
                }}
              >
                ALREADY HAVE AN ACCOUNT ?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {

                  this.props.navigation.pop()

                }}
              >
                <Text
                  style={{
                    fontSize: Metrics.ratio(11),
                    color: "#0f5997",
                    fontFamily: Fonts.type.demibold
                  }}
                >
                  SIGN IN{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(PasswordresetScreen);

// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
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
  Platform,
} from 'react-native';
import moment from 'moment';
import {Header} from '../../components';
import {Fonts, Metrics, Colors, Images} from '../../theme';
import {updateUser, removeUser} from '../../actions/userAction';
import StarRating from 'react-native-star-rating';
import {request as Edit_profile} from '../../actions/EditProfileAction';
import DatePicker from 'react-native-datepicker';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

class ProfileScreeen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      user: null,
      userDetails: null,
      showProfile: true,
      dob: '',
      name: '',
      bio: '',
      graduation: null,
      // profile_pic:'',
      profileImg: null,
      showUpdateProfile: false,
      isloading: false,
      access_token: null,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    console.log(this.props.user.user, '`iiiiiiiiiiiiiiiii`');

    this.setState({
      user: this.props.user.user,
      userDetails: this.props.user.user.details,
      access_token: this.props.user.user.access_token,
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nennnnnnnnnnnnnnn');
    if (nextProps.editProfile) {
      if (
        !nextProps.editProfile.failure &&
        !nextProps.editProfile.isFetching &&
        nextProps.editProfile.data.data &&
        nextProps.editProfile.data.success
      ) {
        this.setState({isloading: false});
        console.log(
          nextProps.editProfile.data.data,
          'nennnnnnnnnnnnnnnnnnnnnnn',
        );
        let access_token = this.state.access_token;
        let obj = {access_token};
        let user = nextProps.editProfile.data.data;
        user = {...user, ...obj};
        nextProps.editProfile.data.data.access_token = this.state.access_token;
        console.log(user, 'kkkkkkkkkkkjjjjjjjjjnnnnnnnnn');
        this._storeUserdata({user: user});
        // this.getData();
        this.props.updateUser({user: user});
      } else if (
        nextProps.editProfile.failure &&
        !nextProps.editProfile.isFetching
      ) {
        this.setState({isloading: false});
      }
    }
  }

  _storeUserdata = async user => {
    try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(user));
      // this.props.updateUser(user)
    } catch (e) {
      // saving error
    }
  };

  openCamera = async get => {
    let options = {
      allowsEditing: true,
      aspect: [3, 3],
      noData: true,
    };
    if (get == 0) {
      ImagePicker.launchCamera(options, response => {
        let ImageObj = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        console.log(response, 'kkkkkkjjjjjjjjjjjjjjjj');
        this.setState({profileImg: ImageObj});
        // Same code as in above section!
      });
    }
  };

  onchangeName = e => {
    this.setState({name: e});
  };
  onchangeDob = e => {
    this.setState({Dob: e});
  };
  onchangeBio = e => {
    this.setState({bio: e});
  };

  oncahngeGraduation = e => {
    this.setState({graduation: e});
  };

  save = () => {
    const {user, userDetails} = this.state;
    console.log(userDetails);
    var bio;
    var graduation;
    var image;
    var name;
    if (this.state.bio == '' || this.state.bio == ' ') {
      bio = this.state.userDetails.bio;
    } else {
      bio = this.state.bio;
    }
    if (this.state.graduation == null) {
      graduation = this.state.userDetails.graduation;
    } else {
      graduation = this.state.graduation;
    }
    if (this.state.profileImg == null) {
      image = null;
    } else {
      image = this.state.profileImg;
    }
    if (name == '' || name == ' ') {
      name = this.state.user.name;
    } else {
      name = this.state.name;
    }
    var payload = {
      id: this.state.user.id,
      bio: bio,
      graduation: graduation,
      image: image,
      name: name,
    };
    console.log(payload, 'payyyyyyyyyyyyyyy');
    var token = user.access_token;
    console.log(token);
    var datawithtoken = {token: token, payload: payload};
    this.props.Edit_profile(datawithtoken);
    // this.props.navigation.navigate('dashborad')
  };
  renderInputfield = (
    headerText,
    placeholder,
    ErrTxt,
    Iserr,
    onChangeText,
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
            // editable={false}
            placeholderTextColor="#b4b4b4"
            // secureTextEntry={rightIcon ? this.state.showpassword : false}
            placeholder={placeholder}
            // value={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
        </View>
        {Iserr && (
          <View>
            <Text style={{color: 'red'}}>**{ErrTxt}</Text>
          </View>
        )}
      </View>
    );
  };
  renderStartDatepicker = dob => {
    return (
      <DatePicker
        style={{width: Metrics.ratio(200)}}
        date={this.state.Dob}
        mode="date"
        placeholder={dob}
        format="MM-DD-YYYY"
        minDate="01-05-1950"
        maxDate={moment(new Date()).format('MM-DD-YYYY')}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        style={{
          width: Metrics.screenWidth * 0.9,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#b4b4b4',
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
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
          },
          dateText: {
            // textAlign:"left",
            position: 'absolute',
            left: Metrics.ratio(0),
            color: '#b4b4b4',
          },
          dateInput: {borderColor: 'transparent'},
          placeholderText: {
            fontSize: Metrics.ratio(14),
            fontFamily: Fonts.type.regular,
            textAlign: 'left',
            position: 'absolute',
            left: Metrics.ratio(0),
            color: '#b4b4b4',
            marginRight: Metrics.ratio(10),
            // backgroundColor: "green"
          },
        }}
        onDateChange={date => {
          this.onchangeDob(date);
        }}
      />
    );
  };
  renderNumberInputfield = (
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
        {Iserr && (
          <View>
            <Text style={{color: 'red'}}>*{ErrTxt}</Text>
          </View>
        )}
      </View>
    );
  };
  renderInputArea = (
    headerText,
    placeholder,
    ErrTxt,
    Iserr,
    onChangeText,
    image,
  ) => {
    return (
      <View style={styles.inputFieldView}>
        <Text style={styles.inputareaHeaderText}>{headerText}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: Metrics.ratio(5),
            width: Metrics.screenWidth * 0.9,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#b4b4b4',
            marginBottom: Metrics.ratio(10),
          }}>
          <TextInput
            style={styles.inputareaField}
            numberOfLines={4}
            placeholderTextColor="#b4b4b4"
            // secureTextEntry={rightIcon ? this.state.showpassword : false}
            placeholder={placeholder}
            onChangeText={text => {
              onChangeText(text);
            }}
          />
        </View>
        {Iserr && (
          <View>
            <Text style={{color: 'red'}}>**{ErrTxt}</Text>
          </View>
        )}
      </View>
    );
  };
  renderUpdateProfile = () => {
    const {user, userDetails, profileImg} = this.state;

    return (
      <View>
        <View style={styles.Profilecard}>
          <View>
            <View style={styles.ProfileImgContainer}>
              {profileImg ? (
                <Image
                  source={{uri: profileImg.uri}}
                  style={styles.profileImg}
                />
              ) : (
                <Image
                  source={{uri: userDetails.image_url}}
                  style={styles.profileImg}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  this.openCamera(0);
                }}
                style={{
                  position: 'absolute',
                  backgroundColor: '#f3f5f6',
                  padding: Metrics.ratio(10),
                  left: Metrics.ratio(100),
                  top: Metrics.ratio(80),
                  borderRadius: Metrics.ratio(50),
                }}>
                <Image source={Images.Camera} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={(styles.profileBody, {marginTop: Metrics.ratio(80)})}>
            {this.renderInputfield(
              'NAME',
              userDetails.first_name,
              'Email Required',
              false,
              this.onchangeName,
              // Images.emailIcon
            )}
            {this.renderInputArea(
              'BIO',
              userDetails.bio,
              'Required no of bags',
              false,
              this.onchangeBio,
            )}
            {this.renderNumberInputfield(
              'GRADUATION YEAR',
              userDetails.graduation,
              'mobile No Required',
              false,
              this.oncahngeGraduation,
              // Images.mobileNumber
            )}
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: Metrics.ratio(10),
                  marginBottom: Metrics.ratio(5),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: Metrics.ratio(14),
                    fontFamily: Fonts.type.demibold,
                  }}>
                  DATE OF BIRTH
                </Text>
                {this.renderStartDatepicker(userDetails.dob)}
                {/* {this.state.error.dobErr && <View><Text style={{ color: 'red' }} >*You are not allowed to register without valid date of birth</Text></View>} */}
              </View>
            </View>
          </View>
          <View style={styles.BioBody}></View>
          <View
            style={{
              width: Metrics.screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.submitButtonView}
              onPress={() => {
                this.save();
              }}>
              <Text
                style={{
                  fontSize: Metrics.ratio(13),
                  color: 'black',
                  fontFamily: Fonts.type.demibold,
                }}>
                Save
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButtonView}
              onPress={() => {
                this.setState({showProfile: true, showUpdateProfile: false});
              }}>
              <Text
                style={{
                  fontSize: Metrics.ratio(13),
                  color: 'black',
                  fontFamily: Fonts.type.demibold,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  renderProfile = () => {
    const {user, userDetails} = this.state;

    // console.log(userDetails)
    return (
      <View>
        <View style={styles.Profilecard}>
          <View style={styles.ProfileImgContainer}>
            {userDetails && userDetails.image_url && (
              <Image
                source={{uri: userDetails.image_url}}
                style={styles.profileImg}
              />
            )}
          </View>
          <View style={styles.UserName}>
            <Text style={styles.UserNameTxt}>
              {userDetails && userDetails.first_name && userDetails.first_name}
            </Text>
            <StarRating
              disabled={false}
              maxStars={5}
              starSize={20}
              rating={this.state.starCount}
              fullStarColor={'#fec057'}
              selectedStar={rating => this.onStarRatingPress(rating)}
              containerStyle={{
                paddingTop: 5,
                marginTop: Metrics.ratio(5),
                width: Metrics.screenWidth * 0.35,
                marginLeft: Metrics.ratio(5),
              }}
              starStyle={{
                paddingLeft: Metrics.ratio(1) * 0.05,
                paddingRight: Metrics.ratio(0),
              }}
            />
          </View>
          <View style={styles.profileBody}>
            <View style={styles.bodyTxt}>
              <Text style={styles.bodyHeading}>Email</Text>
              <Text style={styles.bodyFree}> : {user && user.email}</Text>
            </View>
            <View style={styles.bodyTxt}>
              <Text style={styles.bodyHeading}>Graduating Year</Text>
              {userDetails && userDetails.graduation !== null && (
                <Text style={styles.bodyFree}>
                  {' '}
                  :{' '}
                  {userDetails &&
                    userDetails.graduation &&
                    userDetails.graduation}
                </Text>
              )}
              {userDetails && userDetails.graduation && (
                <Text style={styles.bodyFree}> :</Text>
              )}
            </View>
            <View style={styles.bodyTxt}>
              <Text style={styles.bodyHeading}>Date Of Birth</Text>
              {userDetails && userDetails.dob && (
                <Text style={styles.bodyFree}> : {userDetails.dob}</Text>
              )}
              {userDetails && userDetails.dob && (
                <Text style={styles.bodyFree}> : </Text>
              )}
            </View>
          </View>
          <View style={styles.BioBody}>
            <View style={styles.BioTxt}>
              <Text style={styles.bodyHeading}>Bio</Text>
              {/* {!userDetails.bio && <Text style={styles.TxtBio}></Text>} */}
              {userDetails && userDetails.bio && (
                <Text style={styles.TxtBio}>{userDetails.bio}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              width: Metrics.screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.submitButtonView}
              onPress={() => {
                this.setState({showProfile: false, showUpdateProfile: true});
              }}>
              <Text
                style={{
                  fontSize: Metrics.ratio(13),
                  color: 'black',
                  fontFamily: Fonts.type.demibold,
                }}>
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          headerText={'BRAINWASH PROFILE'}
          leftIcon={Images.LeftArrow}
          headerIconStyle={{marginLeft: Metrics.ratio(15)}}
          headerTextStyle={{marginLeft: Metrics.ratio(20)}}
          leftBtnPress={() => this.props.navigation.navigate('dashboard')}
        />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{marginBottom: Metrics.ratio(80)}}>
            {this.state.showProfile && this.renderProfile()}
            {this.state.showUpdateProfile && this.renderUpdateProfile()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  profile: state,
  editProfile: state.editProfile,
});

const actions = {
  updateUser,
  removeUser,
  Edit_profile,
};

export default connect(
  mapStateToProps,
  actions,
)(ProfileScreeen);

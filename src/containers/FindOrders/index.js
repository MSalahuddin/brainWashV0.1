// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView,BackHandler } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import { request as get_order_request } from '../../actions/getOrders';
import { request as Accept_order_request } from '../../actions/acceptJob';
import StarRating from 'react-native-star-rating';
import Geolocation from '@react-native-community/geolocation';
import SpinnerLoader from '../../components/spinner';
import { Actions } from 'react-native-router-flux';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

class FindOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount:5,
      Pendingorders:[{}],
      currentLocation:null,
      isloading:false,
      order:null,
      scrollUp:false,
    };
  }
  componentDidMount() {
    console.log('add event listner');
    // geoloca
    Platform.OS !== 'ios' && Geolocation.setRNConfiguration();
    // navigator.geolocation = require('@react-native-community/geolocation');
    Platform.OS === 'ios' &&
      Geolocation.setRNConfiguration({
        skipPermissionRequests: true,
        authorizationLevel: 'always',
      });
    Platform.OS === 'ios' && Geolocation.requestAuthorization();
    this.setInitialCoordinates();

    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    if (Platform.OS === 'ios') {
      this.requestLocationPermission();
    }
    
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.accept_order,"getooooooooooooooooooooooooooo")
    // console.log(nextProps.accept_order,"acccepted");
    if (nextProps.order) {
      if (
        !nextProps.order.failure &&
        !nextProps.order.isFetching &&
        nextProps.order.data.data &&
        nextProps.order.data.success === true 
      ) {
        console.log(nextProps.order.data)
        this.setState({isloading: false,order: nextProps.order.data.data});
        
      }
      else if (nextProps.order.failure && !nextProps.order.isFetching) {
        this.setState({isloading: false});
      }
    }

    if (nextProps.accept_order) {
      if (
        !nextProps.accept_order.failure &&
        !nextProps.accept_order.isFetching &&
        nextProps.accept_order.data.success ==true
      ) {
        console.log(nextProps.order.data)
        this.setState({isloading: false});
        // 
      }
      else if (nextProps.order.failure && !nextProps.order.isFetching) {
        // this.setState({isloading: false});
      }
    }
  }
  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  renderLoaderSpinner = () => {
    const {scrollUp} = this.state;
    return <View style={{height:Metrics.screenHeight *0.10,justifyContent:"center",alignItems:"center"}}>
      <Text style={{textAlign:"center",marginTop:Metrics.ratio(10)}}>Please wait ..........</Text>
      <Image style={{width:50,height:50}} source={Images.loader} />
    </View>;
  };
componentWillMount(){
  this.setState({isloading:true});
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa",this.state.user,this.state.currentLocation)

}
  async requestLocationPermission() {
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
              // …
              console.log(result, 'The permission is granteddddddd');
            });
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error, 'permissionError');
      });
  }
  setInitialCoordinates = () => {
    Geolocation.getCurrentPosition(async info => {
      console.log(info.coords.latitude, info.coords.longitude)
     console.log("user",this.props.user)
     var data = {
      access_token:this.props.user.user.access_token,
      latitude:info.coords.latitude,
      longitude:info.coords.longitude,
     }
     this.props.get_order_request(data)
    //  console.log("data",data)
      
    });
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  acceptOrder = (e)=>{
// console.log(e)
// console.log(this.props.user)
var data = {
 access_token: this.props.user.user.access_token,
  user_id: this.props.user.user.id,
  order_id: e.id
}
this.props.Accept_order_request(data)
this.setState({isloading:true})
setTimeout(() => {
  this.setInitialCoordinates()
}, 3000);
console.log(data)

  }
  renderOrder = (order) => {
    return (
      <View style={styles.statuscard}>
        <View style={styles.statusImg}>
          {order.user.details.image_url && <Image source={{uri:order.user.details.image_url}} style={styles.profileImg} />}
          {!order.user.details.image_url && <Image source={Images.profilePicture} style={styles.profileImg} />}
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
            />
             <Text style={styles.starTxt}>(5 stars)</Text>
          </View>

          <View style={styles.amount}>
            {order.details && order.details.price && (<Text style={
              {
                fontFamily: Fonts.type.demibold,
                fontSize: Metrics.ratio(18),
                color: 'black'
              }
            }>${order.details.price}</Text>)}
          </View>
          {/* <Text style={styles.userName}>JOHN DOE</Text> */}
          {/* <Text style={styles.userEmail}>doe@edu.edu</Text> */}
        </View>
       
        <View style={styles.statusBody}>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>No of bags</Text>
            <Text style={styles.bodyFree}></Text>
            {order.details && order.details.no_bags &&(<Text style={styles.bodyProp}> :{order.details.no_bags}</Text>)}
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Student Using Own Detergents</Text>
            <Text style={styles.bodyFree}></Text>
            {order.details && order.details.detergent === true &&(<Text style={styles.bodyProp}> : Yes</Text>)}
            {order.details && order.details.detergent === false &&(<Text style={styles.bodyProp}> : No</Text>)}
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Folded</Text>
            <Text style={styles.bodyFree}>(free)</Text>
            {order.details && order.details.folded === true &&(<Text style={styles.bodyProp}> : Yes</Text>)}
            {order.details && order.details.folded === false &&(<Text style={styles.bodyProp}> : No</Text>)}
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Hung</Text>
            <Text style={styles.bodyFree}>(free)</Text>
            {order.details && order.details.hung === true &&(<Text style={styles.bodyProp}> : Yes</Text>)}
            {order.details && order.details.hung === false &&(<Text style={styles.bodyProp}> : No</Text>)}
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Special Instruction</Text>
            <Text style={styles.bodyFree}></Text>
           {order.details && order.details.instruction  &&( <Text style={styles.bodyProp}> :{order.details.instruction}</Text>)}
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Distance</Text>
            <Text style={styles.bodyFree}></Text>
            <Text style={styles.bodyProp}> : 3.2 miles</Text>
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Pick Up Location</Text>
            <Text style={styles.bodyProp}> : </Text>
            <TouchableOpacity onPress={()=>{
              Actions.pickupScreen({
                latitude:order.up_latitude,
                longitude:order.up_longitude,
                header:"PICK UP LOCATION" 
             
              });
              // this.props.navigation.navigate('pickupScreen')
              }} ><Text style={styles.bodyFree} >(Click Here)</Text></TouchableOpacity>
          </View>
          <View style={styles.bodyTxt}>
            <Text style={styles.bodyHeading}>Drop Off Location</Text>
            <Text style={styles.bodyProp}> : </Text>
            <TouchableOpacity onPress={()=>{
              Actions.pickupScreen({
                latitude:order.down_latitude,
                longitude:order.down_longitude,
                header:"DROP OFF LOCATION"  
               
              });
            }} ><Text style={styles.bodyFree} >(Click Here)</Text></TouchableOpacity>
          </View>
          <View style={{ alignContent: "center", alignItems: "center" }}>
            <TouchableOpacity style={styles.submitButtonView}
              onPress={() => {this.acceptOrder(order) }}
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
    const {order} =this.state
    console.log(order)
    return (
      <View style={styles.container}>
        <Header
          headerText={"FIND A WASH"}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() => { 
            Actions.pop()
           }}

        />
        {this.state.scrollUp && <View>
          {this.renderLoaderSpinner()}
        </View>}
        <ScrollView
        
        onScrollBeginDrag ={()=>{
          this.setInitialCoordinates()
          this.setState({
            scrollUp:true
          })
          setTimeout(() => {
            this.setState({
              scrollUp:false
            })
          }, 5000);
        }} style={{ marginBottom: Metrics.ratio(25) }}>
          <View>
            {/* {o this.renderOrder()} */}
            {order && order.map(order => this.renderOrder(order))}
           

          </View>
        </ScrollView>
        {this.renderOverlaySpinner()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userReducer.user,
  order:state.getorder,
  accept_order:state.acceptorder
});

const actions = {
  get_order_request,
  Accept_order_request
};

export default connect(
  mapStateToProps,
  actions
)(FindOrderScreen);

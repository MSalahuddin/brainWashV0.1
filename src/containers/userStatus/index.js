// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image,ScrollView } from "react-native";
import styles from "./styles";
import { Header } from "../../components";
import { Fonts, Metrics, Images } from "../../theme";
import DatePicker from "react-native-datepicker";
import {Actions} from 'react-native-router-flux';
import {request as get_wash_history} from '../../actions/WashHistoryAction';
import moment from 'moment';


class UserStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.washHistory) {
    console.log("if se pppppppppppppppp",nextProps.washHistory);
      if (
        !nextProps.washHistory.failure &&
        !nextProps.washHistory.isFetching &&
        nextProps.washHistory.data.data &&
        nextProps.washHistory.data.success === true
      ) {
        console.log("if se bbbbbbbbbbbbbbbbbbbbbbb",nextProps.washHistory.data)
        this.setState({orders: nextProps.washHistory.data.data});
        this.setState({isloading: false});
      }
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    const {user} = this.props;
    console.log(user)
    const data = {access_token: user.user.access_token};
    this.props.get_wash_history(data);
  };
  renderOrder = order => {
    console.log(order)
  return(
    <View style={styles.statuscard}>
      <View style={styles.statusHead}>
        <Text style={styles.statusHeadTxt}>Order Status</Text>
      </View>
      <View style={styles.statusImg}>
     {order && order.user.details && order.user.details.image_url && ( <Image source={{uri:order.user.details.image_url}} style={styles.profileImg}/>)}
        <View style={styles.userDetail}>
          <Text style={styles.userName}>{order.user.name}</Text>
          <Text style={styles.userEmail}>{order.user.email}</Text>
        </View>
      </View>
      <View style={styles.statusBody}>
      {order && order.details && order.details.no_bags && ( <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>No of bags</Text>
          <Text style={styles.bodyFree}></Text>
         <Text style={styles.bodyProp}> :{order.details.no_bags}</Text>
        </View>)}
        {order && order.details && order.details.detergent && ( <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Student Using Own Detergents</Text>
          <Text style={styles.bodyFree}></Text>
          {order.details.detergent == 0 &&<Text style={styles.bodyProp}> : no</Text>}
          {order.details.detergent == 1 &&<Text style={styles.bodyProp}> : yes</Text>}
        </View>)}
        {order && order.details && order.details.folded && (  <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Folded</Text>
          <Text style={styles.bodyFree}>(free)</Text>
          {order.details.folded == 0 &&<Text style={styles.bodyProp}> : no</Text>}
          {order.details.folded == 1 &&<Text style={styles.bodyProp}> : yes</Text>}
        </View>)}
        {order && order.details && order.details.hung && (<View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Hung</Text>
          <Text style={styles.bodyFree}>(free)</Text>
          {order.details.hung == 0 &&<Text style={styles.bodyProp}> : no</Text>}
          {order.details.hung == 1 &&<Text style={styles.bodyProp}> : yes</Text>}
        </View>)}
      
      {order && order.details && order.details.instruction && (<View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Special Instructions</Text>
          <Text style={styles.bodyFree}></Text>
          <Text style={styles.bodyProp}> :{order.details.instruction}</Text>
        </View>)}
       <View style={styles.bodyTxt}>
          <Text style={styles.bodyHeading}>Status</Text>
          <Text style={styles.bodyFree}></Text>
         {order.status == 0 && <Text style={styles.bodyProp}> : It's in Dryer</Text>}
        </View>
       </View>
    </View>
  )
}
  render() {
    const {orders} = this.state
    return (
      <View style={styles.container}>
         <Header
          headerText={"LAUNDARY STATUS"}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() => this.props.navigation.navigate("dashboard")}

        />
        <View>
        <ScrollView style={{marginBottom: Metrics.ratio(80)}}>
            {orders && orders.map(order => this.renderOrder(order))}
          </ScrollView>
        </View>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  user: state.userReducer.user,
  washHistory: state.washHistory,
});

const actions = {get_wash_history};

export default connect(
  mapStateToProps,
  actions
)(UserStatusScreen);

// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {Header} from '../../components';
import {Fonts, Metrics, Images} from '../../theme';
import DatePicker from 'react-native-datepicker';
import {Actions} from 'react-native-router-flux';
import {request as get_wash_history} from '../../actions/WashHistoryAction';
import SpinnerLoader from '../../components/spinner';
import moment from 'moment';
class WasherhistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      isloading:false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,"saaaaaaaaaaaaaaaaaaaaaaaa")
    if (nextProps.washHistory) {
      if (
        !nextProps.washHistory.failure &&
        !nextProps.washHistory.isFetching &&
        nextProps.washHistory.data.data &&
        nextProps.washHistory.data.success === true
      ) {
        this.setState({orders: nextProps.washHistory.data.data});
        this.setState({isloading: false});
      }
    }
  }

  componentWillMount() {
    this.getData();
  }
  renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };
  getData = () => {
    this.setState({isloading:true});
    const {user} = this.props;
    console.log("uessaassas",user)
    const data = {access_token: user.user.access_token};
    this.props.get_wash_history(data);
  };
  renderOrder = order => {
    console.log(order, 'jjjjjjjjjjjjjjkkkkkkkkkkkkkkkkk');
    return (
      <View style={styles.statuscard}>
        <View style={styles.statusImg}>
          {order &&
            order.user &&
            order.user.details &&
            order.user.details.image_url && (
              <Image
                source={{uri: order.user.details.image_url}}
                style={styles.profileImg}
              />
            )}
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{order.user.name}</Text>
            <Text style={styles.userEmail}>{order.user.email}</Text>
            <Text style={styles.userEmail}>
              {moment(order.created_at).format('DD-MM-YYYY')}
            </Text>
          </View>
          {order && order.details && order.details.price && (
            <View style={styles.amount}>
              <Text
                style={{
                  fontFamily: Fonts.type.demibold,
                  fontSize: Metrics.ratio(18),
                  color: 'black',
                }}>
                {order &&
                  order.details &&
                  order.details.price &&
                  order.details.price}
                $
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  render() {
    const {orders} = this.state;
    console.log(orders, 'ooooooooooooooooooo');
    return (
      <View style={styles.container}>
        <Header
          headerText={'Wash History'}
          leftIcon={Images.LeftArrow}
          leftBtnPress={() => {
            Actions.pop();
          }}
          headerIconStyle={{marginLeft: Metrics.ratio(40)}}
          headerTextStyle={{marginLeft: Metrics.ratio(50)}}
        />
        <View>
          <ScrollView style={{marginBottom: Metrics.ratio(80)}}>
            {orders && orders.map(order => this.renderOrder(order))}
          </ScrollView>
        </View>
        {this.renderOverlaySpinner()}
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
  actions,
)(WasherhistoryScreen);

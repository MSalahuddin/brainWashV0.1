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
import moment from 'moment';
class WasherhistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
    };
  }

  componentWillReceiveProps(nextProps) {
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

  getData = () => {
    const {user} = this.props;
    const data = {access_token: user.user.access_token};
    this.props.get_wash_history(data);
  };
  renderOrder = order => {
    return (
      <View style={styles.statuscard}>
        <View style={styles.statusImg}>
          <Image source={Images.profilePicture} style={styles.profileImg} />
          <View style={styles.userDetail}>
            <Text style={styles.userName}>{order.user.name}</Text>

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
  actions,
)(WasherhistoryScreen);

// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
} from 'react-native';
import styles from './styles';
import { Header } from '../../components';
import { Fonts, Metrics, Images } from '../../theme';

import { Actions } from 'react-native-router-flux';

import SpinnerLoader from '../../components/spinner';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
class pickupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,
            isloading: false,
            location: null
        };
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({
            location: {
                latitude: Number(this.props.latitude),
                longitude: Number(this.props.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillMount() {

    }
    renderOverlaySpinner = () => {
        const { isloading } = this.state;
        return <SpinnerLoader isloading={isloading} />;
    };


    render() {
        const { location } = this.state;
        return (
            <View style={styles.container}>
                <Header
                    headerText={this.props.header}
                    leftIcon={Images.LeftArrow}
                    leftBtnPress={() => {
                        Actions.pop();
                    }}
                    headerIconStyle={{ marginLeft: Metrics.ratio(40) }}
                    headerTextStyle={{ marginLeft: Metrics.ratio(50) }}
                />
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    height: Metrics.screenHeight,
                    width: Metrics.screenWidth,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>

                    {location != null && <MapView

                        showsMyLocationButton={false}
                        toolbarEnabled={false}
                        showsUserLocation={true}
                        // mapType={Platform.OS == "android" ? "none" : "standard"}
                        //   onRegionChangeComplete={e => {
                        //     this.onRegionChangeComplete(e);
                        //   }}

                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            ...StyleSheet.absoluteFillObject,
                        }}
                        region={{
                            latitude: Number(this.props.latitude),
                            longitude: Number(this.props.longitude),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>

                        <Marker
                            coordinate={location}
                        // title={marker.title}
                        // description={marker.description}
                        />

                    </MapView>}

                </View>
                {this.renderOverlaySpinner()}
            </View>
        );
    }
}

const mapStateToProps = state => ({

});

const actions = {};

export default connect(
    mapStateToProps,
    actions,
)(pickupScreen);

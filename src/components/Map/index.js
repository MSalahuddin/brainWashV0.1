// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {View, Keyboard, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {LocationHelper} from '../../helpers';

import styles from './styles';
import {Metrics, Colors, Images} from '../../theme';

export default class MapDisplayField extends React.Component {
  static propTypes = {
    locationCoords: PropTypes.object,
    markerTitle: PropTypes.string,
    markerDesc: PropTypes.string,
    onMapTap: PropTypes.func,
    containerStyle: PropTypes.object,
    mapStyling: PropTypes.object,
  };

  static defaultProps = {
    locationCoords: {},
    markerTitle: '',
    markerDesc: '',
    onMapTap: undefined,
    containerStyle: {},
    mapStyling: {},
    roundedBottom: false,
  };

  render() {
    const {
      locationCoords,
      markerTitle,
      markerDesc,
      onMapTap,
      containerStyle,
      mapStyling,
      roundedBottom,
    } = this.props;
    // console.log(this.props, "props");
    return (
      <View style={[styles.mapContainer, containerStyle]}>
        <View
          style={{
            marginHorizontal: Metrics.ratio(19),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: Metrics.ratio(50),
          }}>
          <Text type="AvenirNextMedium" size="fourteen" color="dis">
            {'Location'}
          </Text>
          <Text
            onPress={() => onMapTap()}
            type="AvenirNextMedium"
            size="fourteen"
            color="darkStaleBlue">
            {'SUD'}
          </Text>
        </View>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          showsMyLocationButton={false}
          toolbarEnabled={false}
          style={[styles.map, mapStyling]}
          //customMapStyle={mapStyle}
          initialRegion={LocationHelper.getProvidedLocationWithDelta(
            locationCoords,
          )}
          region={LocationHelper.getProvidedLocationWithDelta(locationCoords)}
          onRegionChangeComplete={e => {
            this.props.onRegionChangeComplete(e);
          }}
          zoomEnabled
          scrollEnabled={false}
          provider={PROVIDER_GOOGLE}
          onPress={location => {
            if (onMapTap) {
              onMapTap(location);
            }
          }}>
          <Marker
            coordinate={locationCoords}
            title={markerTitle}
            image={Images.pinLocation}
          />
        </MapView>
        {roundedBottom ? <View style={{height: 4}} /> : null}
      </View>
    );
  }
}

import {Alert, Linking, Platform} from 'react-native';
// import KDBush from 'kdbush';

import Util from '../util';

let location = {
  latitude: 21.5,
  longitude: 39.17,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

class LocationHelper {
  getLocation() {
    return location;
  }

  getLocationAndDelta() {
    return {
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  getProvidedLocationWithDelta = providedLocation => {
    return {
      ...providedLocation,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  };

  setLocation = locationCoords => {
    location = {
      ...locationCoords,
    };
  };

  updateLocation(doAskPermission, callback, errorCallBack) {
    if (Util.isPlatformAndroid()) {
      this.getLocationGeneral(callback, errorCallBack);
    }
  }

  getLocationGeneral = (callback, errorCallBack) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.setLocation(location);

        if (callback) {
          callback(location);
        }

        navigator.geolocation.stopObserving();
      },
      error => {
        if (errorCallBack) {
          errorCallBack();
        } else {
          this.onLocationFailure();
        }
      },
      {
        enableHighAccuracy: Platform.OS != 'android',
        timeout: 2000,
      },
    );
  };

  onLocationFailure = () => {
    Util.showSettingsPopup(
      strings('alertMessages.alert'),
      strings('alertMessages.appLocPermis'),
    );
  };

  stopListener() {
    if (Util.isPlatformAndroid()) {
      LocationServicesDialogBox.stopListener();
    }
  }

  calculateDistance(lat2, lon2) {
    const {latitude: lat1, longitude: lon1} = location;

    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return '-';
    }

    const R = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = Math.round(R * c);

    return `${d} ${strings('shopDetail.km')}`;
  }

  openGoogleMapsApplication = (lat, lng, label = '') => {
    if (Util.isPlatformAndroid()) {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${lat},${lng}`;

      const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`,
      });

      Linking.openURL(url);
    } else {
      Linking.openURL(
        'https://www.google.com/maps/@' + lat + ',' + lng + ',6z',
      );
    }
  };

  openDirectionsApplication = (lat, lng) => {
    Platform.select({
      ios: () => {
        // Linking.openURL("http://maps.apple.com/maps?daddr=" + lat + "," + lng);
        Linking.openURL('http://maps.google.com/maps?daddr=' + lat + ',' + lng);
      },
      android: () => {
        Linking.openURL('http://maps.google.com/maps?daddr=' + lat + ',' + lng);
      },
    })();
  };

  // calculateSearchIndex = dataset => {
  //   if (dataset && Array.isArray(dataset) && dataset.length > 0) {
  //     const index = new KDBush(
  //       dataset,
  //       p => p.location.longitude,
  //       p => p.location.latitude,
  //     );

  //     return index;
  //   }

  //   return undefined;
  // };

  // getNearest = async (index, lat, long, radius, category, onSpot = false) => {
  //   if (onSpot === true) {
  //     return await geokdbush.around(
  //       index,
  //       long,
  //       lat,
  //       1000,
  //       radius,
  //       thisRec =>
  //         thisRec.categories.includes(category) && thisRec.onSpot === onSpot,
  //     );
  //   } else {
  //     return await geokdbush.around(index, long, lat, 1000, radius, thisRec =>
  //       thisRec.categories.includes(category),
  //     );
  //   }
  // };
}

export default new LocationHelper();

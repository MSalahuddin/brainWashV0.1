import {Platform, Share, Linking, Alert, ToastAndroid} from 'react-native';

let location = {
  latitude: 24.8690857,
  longitude: 67.0856047,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

class Util {
  isPlatformAndroid = () => Platform.OS === 'android';

  getLocalLocationObject(coords) {
    if (coords) {
      return {
        latitude: coords.lat || coords.latitude || 0,
        longitude:
          coords.lon || coords.long || coords.lng || coords.longitude || 0,
      };
    }

    return {latitude: 0, longitude: 0};
  }
}

export default new Util();

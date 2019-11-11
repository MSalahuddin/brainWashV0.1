// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: Colors.rowColor,
    marginHorizontal: Metrics.ratio(19),
    marginTop: Metrics.ratio(24),
    borderRadius: Metrics.ratio(5),
  },
  map: {
    flex: 1,
    height: Metrics.ratio(150),
  },
});

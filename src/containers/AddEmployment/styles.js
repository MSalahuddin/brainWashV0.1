// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: "#f3f5f6" //#0f5997
  },
  inputFieldView: {
    width: Metrics.screenWidth * 0.9,
    marginHorizontal: Metrics.screenWidth * 0.025
  },
  inputFieldHeaderText: {
    color: "black",
    fontSize: Metrics.ratio(10),
    fontFamily: Fonts.type.demibold
  },
  inputField: {
    width: Metrics.screenWidth * 0.8,
    paddingBottom: Metrics.ratio(-10),
    fontSize: Metrics.ratio(16),
    marginLeft: Metrics.ratio(-10),
    fontFamily: Fonts.type.regular,
    color: "black"
  }
});

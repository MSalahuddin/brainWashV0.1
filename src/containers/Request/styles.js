// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: "#f3f5f6" //#0f5997
  },
  headerView: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.1,
    flexDirection: "row",
    backgroundColor: "#0f5997"
  },
  headerTextView: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontSize: Metrics.ratio(17),
    // marginLeft: Metrics.ratio(140),
    fontFamily: "AvenirNext-DemiBold"
  },
  pendingRequestContainer: {
    width: Metrics.screenWidth * 0.95,
    borderRadius: Metrics.ratio(10),
    marginVertical: Metrics.ratio(10),
    backgroundColor: "white",
    borderWidth: Metrics.ratio(1),
    borderColor: "#0f5997",
    elevation: 4
  },
  pastRequestContainer: {
    width: Metrics.screenWidth * 0.95,
    borderRadius: Metrics.ratio(10),
    marginVertical: Metrics.ratio(10),
    backgroundColor: "white",
    elevation: 4
  },
  pendingRequestItemSeprator: {
    width: Metrics.screenWidth * 0.9,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#b4b4b4",
    marginVertical: Metrics.ratio(5),
    marginHorizontal: Metrics.screenWidth * 0.025
  }
});

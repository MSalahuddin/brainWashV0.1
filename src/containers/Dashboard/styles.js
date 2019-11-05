// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  mainContainer: { opacity: 0.97 },

  headerView: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.1,
    flexDirection: "row"
  },
  headerTextView: {
    width: Metrics.screenWidth * 0.85,
    height: Metrics.screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontSize: Metrics.ratio(15),
    marginLeft: Metrics.screenWidth * 0.11,
    fontFamily: Fonts.type.demibold
  },
  headerIconView: {
    width: Metrics.screenWidth * 0.15,
    height: Metrics.screenHeight * 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyView: {
    width: Metrics.screenWidth,
    marginTop: Metrics.screenHeight * 0.06,
    height: Metrics.screenHeight * 0.72,
    backgroundColor: "transparent"
  },
  footerView: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight * 0.1,
    backgroundColor: "#0f5997"
  },
  profileNameView: {
    width: Metrics.screenWidth,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrics.ratio(15)
  },
  profileNameText: {
    fontSize: Metrics.ratio(25),
    color: "black",
    fontFamily: Fonts.type.demibold,
    marginTop: Metrics.ratio(40)
  },
  profilelocationText: {
    fontSize: Metrics.ratio(12),
    fontFamily: Fonts.type.regular,
    color: "black"
  },
  experienceListView: {
    width: Metrics.screenWidth * 0.95,
    marginLeft: Metrics.screenWidth * 0.025,
    borderRadius: Metrics.ratio(10),
    marginTop: Metrics.ratio(10),
    backgroundColor: "white",
    elevation: 8
  },
  experienceItemView: {
    flexDirection: "row"
  },
  experienceCompanyView: {
    flexDirection: "row",
    marginTop: Metrics.ratio(13)
  },
  experienceCompanyText: {
    fontSize: Metrics.ratio(16),
    color: "black",
    fontFamily: Fonts.type.demibold
  },
  experienceListSeperator: {
    width: Metrics.screenWidth * 0.9,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#b4b4b4",
    marginVertical: Metrics.ratio(8),
    marginHorizontal: Metrics.screenWidth * 0.025
  },
  educationListView: {
    width: Metrics.screenWidth * 0.95,
    marginLeft: Metrics.screenWidth * 0.025,
    borderRadius: Metrics.ratio(10),
    marginTop: Metrics.ratio(10),
    marginBottom: Metrics.ratio(10),
    backgroundColor: "white",
    elevation: 8
  }
});

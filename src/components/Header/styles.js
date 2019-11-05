// @flow
import { StyleSheet, Platform } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 8,
    backgroundColor: "#89f4ff",
    height: Metrics.screenHeight * 0.08,
    flexDirection: "row"
  },
  menuImage: {
    width: Metrics.ratio(25),
    height: Metrics.ratio(25)
  },
  TouchableMenu: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(60)

    // justifyContent: "center",
    // alignItems: "center"
  },

  headerText: {
    color: "black",
    fontSize: Metrics.ratio(17),
    // marginLeft: Metrics.ratio(140),
    fontFamily: "AvenirNext-DemiBold",
    position:"absolute",
    left:Metrics.ratio(60),
    width: Metrics.screenWidth - Metrics.doubleBaseMargin,
    // textAlign: "center",
    marginTop: Metrics.ratio(20),
    marginLeft:Metrics.ratio(10)

  },
  rightText: {
    color: "white",
    fontFamily: Fonts.type.regular,
    fontSize: Metrics.ratio(14)
  }
});

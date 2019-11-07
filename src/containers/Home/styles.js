// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: "#f3f5f6" //#0f5997
  },
  header: {
    width: Metrics.screenWidth,
    height: Metrics.ratio(200),
    // backgroundColor:"pink"
  },
  headerbgimage: {
    width: Metrics.screenWidth,
    // height:Metrics.ratio(200),
  },
  boxImage: {},
  boxTextcontainer:{},
  boxImgcontainer:{},
  boxText: {
    color: "black",
    fontWeight: 'bold',
    marginTop: Metrics.ratio(5),
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.demibold,
  },
  boxleft: {
    width: '90%',
    height: Metrics.ratio(140),
    borderBottomWidth:2,
    borderBottomColor: "#b4b4b4",
    justifyContent: "center",
    alignItems: "center"
  },
  boxleftEnd: {
    width: '90%',
    height: Metrics.ratio(140),
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: "#b4b4b4",
    justifyContent: "center",
    alignItems: "center"
  },
  boxright: {
    width: '90%',
    marginLeft: Metrics.ratio(18),
    height: Metrics.ratio(140),
    borderBottomWidth: 2,
    borderBottomColor: "#b4b4b4",
    justifyContent: "center",
    alignItems: "center"
  },
  boxrightEnd: {
    width: '90%',
    marginLeft: Metrics.ratio(18),
    height: Metrics.ratio(140),
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: "#b4b4b4",
    justifyContent: "center",
    alignItems: "center"
  },
  boxlistright: {
    width: Metrics.ratio(170),
    marginRight: Metrics.ratio(10)
  },
  boxlistleft: {
    width: Metrics.ratio(170),
    marginLeft: Metrics.ratio(10),
    borderRightWidth: 2,
    borderRightColor: "#b4b4b4",
  },
  logoContainer: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: Metrics.ratio(250),
    height: Metrics.ratio(90),
    borderRadius: Metrics.ratio(10),
   
   

  },
  menuButton: {
    flexDirection: "row",
    marginLeft: Metrics.ratio(10),
  },
  menuIcon: {
    marginLeft: Metrics.ratio(10),
    marginTop: Metrics.ratio(10),
  },
  customerButtonView: {
    width: Metrics.screenWidth * 0.9,
    height: Metrics.ratio(45),
    marginLeft: Metrics.screenWidth * 0.025,
    marginTop: Metrics.ratio(20),
    backgroundColor: "#89f3ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Metrics.ratio(30),
    flexDirection: "row",
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  }
});

// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute"
  },
  coverImage: {
    //width: Metrics.image.coverWidth,
    //height: Metrics.screenHeight - 500
  },
  listView: {
    height: Metrics.ratio(32),
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Metrics.ratio(15),
    backgroundColor: "transparent",
    shadowColor: Colors.ash_grey,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 2
  },
  listTitle: {
    marginLeft: Metrics.smallMargin,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.black,
    fontSize: Metrics.ratio(14)
  },
  ImageRight: {
    width: Metrics.image.tiny,
    height: Metrics.image.tiny,
    marginRight: Metrics.ratio(20)
  },
  ImageLeft: {
    width: Metrics.image.small,
    height: Metrics.image.small,
    marginLeft: Metrics.ratio(20)
  },
  notificationListConatiner: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Metrics.ratio(22),
    backgroundColor: "#fff",
    flex: 1,
    //        borderBottomWidth : Metrics.ratio(1),
    // borderBottomColor : Colors.ash_grey,
    shadowColor: Colors.ash_grey,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 0,

    elevation: 2
  },
  lastRow: { marginBottom: Metrics.ratio(20) },
  rowContainer: {
    flex: 1,
    marginHorizontal: Metrics.ratio(5),
    paddingBottom: Metrics.baseMargin
  },
  profileView: {
    marginTop: Metrics.ratio(5),
    borderTopColor: Colors.ash_grey,
    shadowColor: Colors.ash_grey,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.6,
    shadowRadius: 0,

    elevation: 4
  },
  socialIcons: {
    width: Metrics.image.medium,
    height: Metrics.image.medium,
    resizeMode: "contain",
    marginHorizontal: 10
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Metrics.ratio(200),
    flex: 1
    // marginLeft: Metrics.ratio(50),
    // height:70,
    // backgroundColor:'pink'
  },
  footer: {
    height: Metrics.baseMargin
  },
  appVer: {
    paddingVertical: Metrics.ratio(2)
  },
  appVerView: {
    flex: 1,
    width: Metrics.screenWidth - Metrics.ratio(80),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    paddingVertical: Metrics.ratio(4)
    // backgroundColor: "green",
  },
  serverURLParent: {},
  userBalanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: Metrics.ratio(30),
    backgroundColor: Colors.white,
    marginVertical: Metrics.ratio(2),
    marginLeft: Metrics.smallMargin,
    borderRadius: Metrics.ratio(15)
  },
  headerContainer: {
    // justifyContent: "space-around",
    flexDirection: "row",
    marginTop: Metrics.ratio(50)
  },
  thumbnailContainer: {
    marginHorizontal: Metrics.ratio(16)
  },
  profileImage: {
    width: Metrics.ratio(70),
    height: Metrics.ratio(70)
  },
  penIconCont: {
    // backgroundColor: Colors.primary,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: Metrics.ratio(28) / 2,
    width: Metrics.ratio(28),
    height: Metrics.ratio(28),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  penIcon: {
    width: Metrics.ratio(14),
    height: Metrics.ratio(14)
  },
  languageBtnContainer: {
    flexDirection: "row",
    marginVertical: Metrics.ratio(20),
    marginHorizontal: Metrics.screenWidth * 0.04,
    width: Metrics.screenWidth * 0.6,
    height: Metrics.ratio(40),
    borderWidth: 1,
    borderColor: Colors.platinum,
    borderRadius: Metrics.ratio(5),
    backgroundColor: Colors.lightgray,
    overflow: "hidden",
    elevation: 4
  },
  languageBtnDeactive: {
    width: Metrics.screenWidth * 0.3,
    height: Metrics.ratio(38),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  languageBtnActive: {
    width: Metrics.screenWidth * 0.3,
    height: Metrics.ratio(38),
    backgroundColor: Colors.darkStaleBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Metrics.ratio(5),
    elevation: 4
  }
});

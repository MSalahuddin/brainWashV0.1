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
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.demibold
  },
  inputareaHeaderText: {
    color: "black",
    fontSize: Metrics.ratio(14),
    fontFamily: Fonts.type.demibold,
    marginBottom:Metrics.ratio(10)
  },
  inputField: {
    width: Metrics.screenWidth * 0.8,
    paddingBottom: Metrics.ratio(-10),
    fontSize: Metrics.ratio(16),
    marginLeft: Metrics.ratio(0),
    fontFamily: Fonts.type.regular,
    color: "black"
  },
  inputareaField: {
    width: Metrics.screenWidth * 0.8,
    // paddingBottom: Metrics.ratio(-10),
    marginTop:Metrics.ratio(10),
    fontSize: Metrics.ratio(16),
    marginLeft: Metrics.ratio(0),
    fontFamily: Fonts.type.regular,
    color: "black"
  },
  radioGroup:{
    flexDirection: "row",
  },
  radioOptions:{
    // flexDirection:"col",
    color:"#b4b4b4",
    borderColor:"#b4b4b4",
  },
  headerText: {
    color: "black",
    fontSize: Metrics.ratio(15),
    fontFamily: Fonts.type.demibold,
    
  },
  submitButtonView: {
    width: Metrics.screenWidth * 0.9,
    height: Metrics.ratio(45),
    marginLeft: Metrics.screenWidth * 0.025,
    position:'absolute',
    bottom:Metrics.ratio(5),
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
  },
  
  submitButton: {
    width: Metrics.screenWidth * 0.9,
    height: Metrics.ratio(45),
    marginLeft: Metrics.screenWidth * 0.025,
    // position:'absolute',
    // bottom:Metrics.ratio(5),
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
  },
 
  touchable: {
    width: '100%',
    // height: 40,
    // padding: 10,
    // backgroundColor: '#f5821f',
    // marginTop: 30,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
  },
  largeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    // marginTop: 10,
  }, 

});

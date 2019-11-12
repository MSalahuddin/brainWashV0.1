// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: "#f3f5f6" //#0f5997
  },
statuscard:{
  width: Metrics.screenWidth * 0.95,
  marginLeft: Metrics.screenWidth * 0.025,
  borderRadius: Metrics.ratio(10),
  marginTop: Metrics.ratio(10),
  marginBottom: Metrics.ratio(10),
  paddingVertical: Metrics.ratio(20),
  backgroundColor: "white",
  elevation: 8,
  shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  flexDirection:'column'
},
statusHead:{
  // justifyContent:"center",
  alignItems:"center",
  borderBottomWidth:2,
  borderBottomColor:'#b4b4b4',
  // flex:1,
},
statusHeadTxt:{
  fontFamily: Fonts.type.demibold,
  fontSize:Metrics.ratio(18),
  color:'black'
},
statusImg:{
  marginLeft:Metrics.ratio(10),
  marginTop:Metrics.ratio(10),
  flexDirection:'row'
  // flex:1,
},
statusBody:{
  // flex:1,
  marginTop:Metrics.ratio(10),
  marginLeft:Metrics.ratio(10)
},
bodyTxt:{
 flexDirection:"row",
 marginTop:Metrics.ratio(5) 
},
bodyFree:{
  fontFamily: Fonts.type.demibold,
  fontSize:Metrics.ratio(14),
  color:'#b4b4b4',
},
bodyProp:{
  fontFamily: Fonts.type.regular,
  fontSize:Metrics.ratio(14),
  color:'black',
},
bodyHeading:{
  fontFamily: Fonts.type.demibold,
  fontSize:Metrics.ratio(14),
  color:'black',
},

profileImg:{
  width:Metrics.ratio(60),
  height:Metrics.ratio(60),
  // flex:1

},
userDetail:{
  position:'absolute',
  left:Metrics.ratio(70),
  top:Metrics.ratio(10)
},
userName:{
  fontFamily: Fonts.type.demibold,
  fontSize:Metrics.ratio(16),
  color:'black'
},
userEmail:{
  color:'#b4b4b4'

}
});

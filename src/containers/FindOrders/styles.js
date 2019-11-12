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
profileImg:{
  width:Metrics.ratio(60),
  height:Metrics.ratio(60),
  // flex:1

},
statusImg:{
  marginLeft:Metrics.ratio(10),
  marginRight:Metrics.ratio(10),
  // marginTop:Metrics.ratio(2),
  // backgroundColor:'#b4b4b4',
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

stars:{
  // backgroundColor:'black',
  marginLeft:Metrics.ratio(10),
  // width:Metrics.ratio(60),
  // height:Metrics.ratio(60),
  // flex:1

},
userDetail:{
  // position:'absolute',
  left:Metrics.ratio(120),
  top:Metrics.ratio(10)
},
userName:{
  fontFamily: Fonts.type.demibold,
  fontSize:Metrics.ratio(16),
  color:'black'
},
userEmail:{
  color:'#b4b4b4'

},

starTxt:{
  color:'#b4b4b4'

},
amount:{
 
  backgroundColor:'#ffc057',
  paddingHorizontal:Metrics.ratio(15),
  paddingVertical:Metrics.ratio(30),
  width:Metrics.ratio(90),
  marginLeft:Metrics.ratio(60),
  // paddingBottom:Metrics.ratio(20),
  borderRadius:Metrics.ratio(55)
  
},
submitButtonView: {
  width: Metrics.screenWidth * 0.4,
  height: Metrics.ratio(45),
  // marginLeft: Metrics.screenWidth * 0.025,
  marginTop: Metrics.ratio(20),
  backgroundColor: "#89f3ff",
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: Metrics.ratio(30),
  // flexDirection: "row",
  elevation: 4
}
});

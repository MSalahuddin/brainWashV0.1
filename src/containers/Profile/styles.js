// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics ,Fonts} from "../../theme";

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: "#f3f5f6" //#0f5997
  },
  Profilecard:{
    width: Metrics.screenWidth * 0.95,
    marginLeft: Metrics.screenWidth * 0.025,
    borderRadius: Metrics.ratio(10),
    marginTop: Metrics.ratio(120),
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
  ProfileImgContainer:{

  },
  profileImg:{
    width:Metrics.ratio(130),
    height:Metrics.ratio(130),
    borderColor:'#b4b4b4',
    borderWidth:1,
    borderRadius:Metrics.ratio(100),
    position:"absolute",
    top:Metrics.ratio(-85),
    left:Metrics.ratio(100)
  },
  UserName:{
    marginTop:Metrics.ratio(60),
    alignContent:'center',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  UserNameTxt:{
    fontFamily: Fonts.type.demibold,
    fontSize:Metrics.ratio(14),
    color:'black',
  },
  profileBody:{
    // flex:1,
    marginTop:Metrics.ratio(10),
    marginLeft:Metrics.ratio(10)
  },
  bodyTxt:{
   flexDirection:"row",
   marginTop:Metrics.ratio(15),
   marginLeft:Metrics.ratio(10) 
  },
  BioBody:{
    // flex:1,
    marginTop:Metrics.ratio(10),
    marginLeft:Metrics.ratio(10)
  },
  BioTxt:{
    
    marginTop:Metrics.ratio(15),
    marginLeft:Metrics.ratio(10) 
   },
  bodyFree:{
    fontFamily: Fonts.type.demibold,
    fontSize:Metrics.ratio(14),
    color:'#b4b4b4',
  },
  TxtBio:{
    fontFamily: Fonts.type.demibold,
    fontSize:Metrics.ratio(14),
    color:'#b4b4b4',
    borderWidth:1,
    borderColor:'#b4b4b4',
    paddingLeft:5,
    paddingTop:5,
    paddingRight:5,
    marginRight:Metrics.ratio(10),
    width:Metrics.screenWidth *0.85
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

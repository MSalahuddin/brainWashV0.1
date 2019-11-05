// @flow
import React from "react";

import { Image,Text, View ,TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import {
  Stack,
  Scene,
  Actions,
  ActionConst,
  Drawer
} from "react-native-router-flux";
import Sidebar from "../../containers/Sidebar";
import { TabButtonLeft, Header } from "../../components";
import { Images, Metrics, Colors, Fonts } from "../../theme";
import styles from "../styles";
import HomeScreen from "../../containers/Home";
const CustomHeader = () => {
  return (
    <View>
    <Header
      headerText={"Dashboard"}
      leftIcon={Images.menuIcon}
      leftBtnPress={() => {
        this.props.navigation.openDrawer();
      }}
    />
    <TouchableOpacity onPress={()=>{}}>
      <Text>Logout</Text>
    </TouchableOpacity>
    </View>
  );
};

class DrawerMenu {
  getDrawerMenu() {
    return (
      <Drawer
        drawer
        menuPosition={"left"}
        hideNavBar
        type={ActionConst.RESET}
        key="dashboard"
        contentComponent={Sidebar}
        renderLeftButton={() => (
          <TabButtonLeft
            imagesArray={["rightArrow"]}
            actions={[Actions.drawerOpen]}
          />
        )}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={ratio => {
          return {
            mainOverlay: {
              opacity: ratio === 0 ? 0 : 0.3,
              backgroundColor: "#000"
            }
          };
        }}
        drawerWidth={Metrics.screenWidth * 0.72}
      >
        <Scene hideNavBar>
          <Stack key="root">
            <Scene
              hideNavBar
              headerStyle={styles.header}
              titleStyle={[styles.title, { width: Metrics.screenWidth }]}
              tintColor="white"
              title={"HomeScreen"}
              key="homeScreen"
              component={HomeScreen}
              renderLeftButton={
                () => { }
                //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
              }
            />
           
          </Stack>
        </Scene>
  
      </Drawer>
    );
  }
}

export default new DrawerMenu();

import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { Metrics } from "../../theme";
import Icon from "react-native-vector-icons/FontAwesome";

export default class CustomTabBar extends React.Component {
  render() {
    const { state } = this.props.navigation;
    const activeTabIndex = state.index;

    return (
      <View
        style={{
          backgroundColor: "#0f5997", //#0f5997
          flexDirection: "row"
        }}
      >
        {state.routes.map((element, index) => {
          console.log(element, "jjjjjjjjjjjjjjjjjjj");
          return (
            <TouchableOpacity
              style={[
                {
                  height: Metrics.screenHeight * 0.09,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                },
                index === activeTabIndex && {
                  backgroundColor: "#276AA2"
                }
              ]}
              key={element.key}
              onPress={() => Actions[element.key]()}
            >
              <Image
                style={{ width: Metrics.ratio(20), height: Metrics.ratio(20) }}
                source={
                  element &&
                  element.routes &&
                  element.routes[0] &&
                  element.routes[0].params.icon
                }
              />
              <Text
                style={{
                  fontSize: Metrics.ratio(10),
                  color: "white",
                  fontFamily: "Raleway-Regular",
                  marginVertical: Metrics.ratio(5)
                }}
              >
                {element.key.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

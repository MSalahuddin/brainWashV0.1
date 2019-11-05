// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import styles from "./styles";
import { Metrics, Images } from "../../theme";
import Icon from "react-native-vector-icons/FontAwesome";

class RequestScreen extends Component {
  renderPendngRequestFirstItem = () => {
    return (
      <View
        style={{
          marginVertical: Metrics.ratio(10)
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: Metrics.screenWidth * 0.75
            }}
          >
            <Text
              style={{
                fontSize: Metrics.ratio(16),
                color: "#0f5997",
                fontFamily: "AvenirNext-DemiBold",
                marginTop: Metrics.ratio(8),
                marginLeft: Metrics.ratio(8)
              }}
            >
              Delighted Design
            </Text>
            <Text
              style={{
                fontSize: Metrics.ratio(14),
                color: "black",
                fontFamily: "AvenirNext-Regular",
                marginTop: Metrics.ratio(10),
                marginLeft: Metrics.ratio(3)
              }}
            >
              wants to access your
            </Text>
          </View>
          <Icon
            style={{
              marginRight: Metrics.ratio(8),
              marginTop: Metrics.ratio(10)
            }}
            size={25}
            color="grey"
            name={"chevron-right"}
          />
        </View>
        <Text
          style={{
            fontSize: Metrics.ratio(14),
            color: "black",
            fontFamily: "AvenirNext-Regular",
            marginTop: Metrics.ratio(-5),
            marginLeft: Metrics.ratio(10)
          }}
        >
          profile.
        </Text>
        <Text
          style={{
            fontSize: Metrics.ratio(14),
            color: "#b4b4b4",
            fontFamily: "AvenirNext-Regular",
            marginTop: Metrics.ratio(3),
            marginLeft: Metrics.ratio(10)
          }}
        >
          just now
        </Text>
      </View>
    );
  };

  renderPendngRequestSecondItem = () => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: Metrics.screenWidth * 0.75
            }}
          >
            <Text
              style={{
                fontSize: Metrics.ratio(16),
                color: "#0f5997",
                fontFamily: "AvenirNext-DemiBold",
                marginTop: Metrics.ratio(8),
                marginLeft: Metrics.ratio(8)
              }}
            >
              Delta
            </Text>
            <Text
              style={{
                fontSize: Metrics.ratio(14),
                color: "black",
                fontFamily: "AvenirNext-Regular",
                marginTop: Metrics.ratio(10),
                marginLeft: Metrics.ratio(3)
              }}
            >
              wants to access your Profile
            </Text>
          </View>
          <Icon
            style={{
              marginRight: Metrics.ratio(8),
              marginTop: Metrics.ratio(10)
            }}
            size={25}
            color="grey"
            name={"chevron-right"}
          />
        </View>
        <Text
          style={{
            fontSize: Metrics.ratio(14),
            color: "#b4b4b4",
            fontFamily: "AvenirNext-Regular",
            marginLeft: Metrics.ratio(10),
            marginBottom: Metrics.ratio(10)
          }}
        >
          1 day ago
        </Text>
      </View>
    );
  };

  renderPendingRequest = () => {
    return (
      <View>
        <Text
          style={{
            marginTop: Metrics.ratio(10),
            color: "#b4b5b5",
            fontFamily: "AvenirNext-DemiBold"
          }}
        >
          Pending Requests:
        </Text>
        <View style={styles.pendingRequestContainer}>
          {this.renderPendngRequestFirstItem()}
          <View style={styles.pendingRequestItemSeprator}></View>
          {this.renderPendngRequestSecondItem()}
        </View>
      </View>
    );
  };

  renderPastItem = index => {
    return (
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            width: Metrics.screenWidth * 0.75
          }}
        >
          <Text
            style={{
              fontSize: Metrics.ratio(16),
              color: "#0f5997",
              fontFamily: "AvenirNext-DemiBold",
              marginTop: Metrics.ratio(8),
              marginLeft: Metrics.ratio(8)
            }}
          >
            {index === 2 ? "Derita" : "Honeywell"}
          </Text>
          <Text
            style={{
              fontSize: Metrics.ratio(14),
              color: "black",
              fontFamily: "AvenirNext-Regular",
              marginTop: Metrics.ratio(10),
              marginLeft: Metrics.ratio(3)
            }}
          >
            requested to access your profile.
          </Text>
        </View>
        <Text
          style={{
            fontSize: Metrics.ratio(14),
            color: "#b4b4b4",
            fontFamily: "AvenirNext-Regular",
            marginLeft: Metrics.ratio(10)
          }}
        >
          {index === 2 ? "1 week ago" : "3 day ago"}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: Metrics.ratio(10),
            marginVertical: Metrics.ratio(10)
          }}
        >
          <View
            style={[
              {
                width: Metrics.ratio(20),
                height: Metrics.ratio(20),
                borderRadius: 100,
                borderWidth: Metrics.ratio(1),
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#44a70e"
              },
              index === 2 && { borderColor: "#e1575e" }
            ]}
          >
            <Image
              style={{ width: Metrics.ratio(8), height: Metrics.ratio(8) }}
              source={index === 2 ? Images.crossIcon : Images.tickIcon}
            />
          </View>
          {/*  */}
          <Text
            style={[
              {
                fontSize: Metrics.ratio(14),
                color: "#44a70e",
                fontFamily: "AvenirNext-Regular",
                marginLeft: Metrics.ratio(10)
              },
              index === 2 && { color: "#e1575e" }
            ]}
          >
            {index === 2
              ? "You denied this request"
              : "You approved this request"}
          </Text>
        </View>
      </View>
    );
  };

  renderPassRequestSeprator = () => {
    return <View style={styles.pendingRequestItemSeprator}></View>;
  };

  renderPastRequest = () => {
    return (
      <View>
        <Text
          style={{
            marginTop: Metrics.ratio(10),
            color: "#b4b5b5",
            fontFamily: "AvenirNext-DemiBold"
          }}
        >
          Past Requests:
        </Text>
        <View style={styles.pastRequestContainer}>
          {this.renderPastItem()}
          {this.renderPassRequestSeprator()}
          {this.renderPastItem(2)}
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerTextView}>
            <Text style={styles.headerText}>REQUEST</Text>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              marginBottom: Metrics.screenHeight * 0.14,
              width: Metrics.screenWidth * 0.95,
              marginHorizontal: Metrics.screenWidth * 0.025
            }}
          >
            {this.renderPendingRequest()}
            {this.renderPastRequest()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(RequestScreen);
